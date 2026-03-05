const express = require("express");
const app = express();
const port = 3002;

const morgan = require("morgan");
const cors = require("cors");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const https = require("https");
const { MongoClient, ObjectId } = require("mongodb");
const session = require("express-session");
const cookieParser = require("cookie-parser");

app.use(morgan("combined"));
app.use(cors({
  origin: "http://localhost:4200",
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
  secret: "shopping-cart-secret",
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 30 }
}));

const client = new MongoClient("mongodb://127.0.0.1:27017");
let database;

async function startServer() {
  await client.connect();
  database = client.db("FashionData");
  app.listen(port);
}

startServer();

const Products = () => database.collection("products");
const Users = () => database.collection("users");
const Carts = () => database.collection("carts");
const Payments = () => database.collection("payments");

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: "Missing fields" });
  }
  const exist = await Users().findOne({ username });
  if (exist) {
    return res.status(400).json({ message: "User exists" });
  }
  const hash = await bcrypt.hash(password, 10);
  await Users().insertOne({
    username,
    password: hash,
    createdAt: new Date()
  });
  res.json({ message: "Register success" });
});

app.post("/auth/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await Users().findOne({ username });
  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return res.status(400).json({ message: "Wrong password" });
  }
  req.session.username = username;
  res.json({ message: "Login success" });
});

app.get("/products", async (req, res) => {
  const data = await Products().find({}).sort({ createdAt: -1 }).toArray();
  res.json(data);
});

app.post("/products", async (req, res) => {
  const { name, description, price, image } = req.body;
  if (!name || !price) {
    return res.status(400).json({ message: "Missing fields" });
  }
  const result = await Products().insertOne({
    name,
    description,
    price,
    image,
    createdAt: new Date()
  });
  res.status(201).json(result);
});

app.post("/cart/add", async (req, res) => {
  const { productId } = req.body;
  if (!productId) {
    return res.status(400).json({ message: "Missing productId" });
  }
  const product = await Products().findOne({ _id: new ObjectId(productId) });
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }
  const username = req.session.username || "guest";
  let cart = await Carts().findOne({ username });
  if (!cart) {
    cart = {
      username,
      items: [],
      updatedAt: new Date()
    };
    await Carts().insertOne(cart);
  }
  const index = cart.items.findIndex(
    i => i.productId.toString() === productId
  );
  if (index > -1) {
    cart.items[index].quantity += 1;
  } else {
    cart.items.push({
      productId: product._id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1
    });
  }
  await Carts().updateOne(
    { username },
    { $set: { items: cart.items, updatedAt: new Date() } }
  );
  res.json(cart.items);
});

app.get("/cart", async (req, res) => {
  const username = req.session.username || "guest";
  const cart = await Carts().findOne({ username });
  res.json(cart ? cart.items : []);
});

app.post("/cart/remove", async (req, res) => {
  const { productId } = req.body;
  const username = req.session.username || "guest";
  const cart = await Carts().findOne({ username });
  if (!cart) return res.json([]);
  const items = cart.items.filter(
    i => i.productId.toString() !== productId
  );
  await Carts().updateOne(
    { username },
    { $set: { items, updatedAt: new Date() } }
  );
  res.json(items);
});

app.post("/cart/clear", async (req, res) => {
  const username = req.session.username || "guest";
  await Carts().updateOne(
    { username },
    { $set: { items: [], updatedAt: new Date() } }
  );
  res.json({ message: "Cart cleared" });
});

const partnerCode = "MOMO";
const accessKey = "F8BBA842ECF85";
const secretKey = "K951B6PE1waDMi640xX08PD3vg6EkVlz";

app.post("/payment/momo", async (req, res) => {
  const { amount } = req.body;
  if (!amount) {
    return res.status(400).json({ message: "Missing amount" });
  }
  const requestId = partnerCode + Date.now();
  const orderId = requestId;
  const orderInfo = "Thanh toan don hang";
  const redirectUrl = "http://localhost:4200/payment-success";
  const ipnUrl = "http://localhost:3002/payment/ipn";
  const requestType = "captureWallet";
  const extraData = "";

  await Payments().insertOne({
    orderId,
    amount,
    status: "pending",
    createdAt: new Date()
  });

  const rawSignature =
    `accessKey=${accessKey}` +
    `&amount=${amount}` +
    `&extraData=${extraData}` +
    `&ipnUrl=${ipnUrl}` +
    `&orderId=${orderId}` +
    `&orderInfo=${orderInfo}` +
    `&partnerCode=${partnerCode}` +
    `&redirectUrl=${redirectUrl}` +
    `&requestId=${requestId}` +
    `&requestType=${requestType}`;

  const signature = crypto
    .createHmac("sha256", secretKey)
    .update(rawSignature)
    .digest("hex");

  const body = JSON.stringify({
    partnerCode,
    accessKey,
    requestId,
    amount,
    orderId,
    orderInfo,
    redirectUrl,
    ipnUrl,
    extraData,
    requestType,
    signature,
    lang: "vi"
  });

  const options = {
    hostname: "test-payment.momo.vn",
    port: 443,
    path: "/v2/gateway/api/create",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": Buffer.byteLength(body)
    }
  };

  const momoReq = https.request(options, momoRes => {
    let data = "";
    momoRes.on("data", chunk => data += chunk);
    momoRes.on("end", () => res.json(JSON.parse(data)));
  });

  momoReq.on("error", err => {
    res.status(500).json({ error: err.message });
  });

  momoReq.write(body);
  momoReq.end();
});

app.post("/payment/ipn", async (req, res) => {
  const { orderId, resultCode, transId } = req.body;
  await Payments().updateOne(
    { orderId },
    {
      $set: {
        status: resultCode === 0 ? "paid" : "failed",
        transId,
        updatedAt: new Date()
      }
    }
  );
  res.json({ message: "OK" });
});

app.get("/payments", async (req, res) => {
  const data = await Payments().find({}).sort({ createdAt: -1 }).toArray();
  res.json(data);
});
