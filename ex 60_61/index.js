const express = require("express");
const app = express();
const port = 3002;

const morgan = require("morgan");
const cors = require("cors");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const https = require("https");
const { MongoClient, ObjectId } = require("mongodb");

app.use(morgan("combined"));
app.use(cors({
  origin: "http://localhost:4200",
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const client = new MongoClient("mongodb://127.0.0.1:27017");
let database;

async function startServer() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");

    database = client.db("FashionData");

    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });

  } catch (err) {
    console.error("Database connection failed:", err);
  }
}

startServer();


function getFashionCollection() {
  return database.collection("Fashion");
}

function getPaymentCollection() {
  return database.collection("Payments");
}

function getUserCollection() {
  return database.collection("users");
}


app.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "Missing username or password" });
    }

    const userCollection = getUserCollection();

    const existingUser = await userCollection.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await userCollection.insertOne({
      username,
      password: hashedPassword,
      createdAt: new Date()
    });

    res.json({ message: "Register successful" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/auth/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const userCollection = getUserCollection();
    const user = await userCollection.findOne({ username });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Wrong password" });
    }

    // Save cookie when login success
    res.cookie("username", username, {
      maxAge: 3600000,
      httpOnly: false
    });

    res.cookie("password", password, {
      maxAge: 3600000,
      httpOnly: false
    });

    res.json({ message: "Login successful" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



app.post("/fashions", async (req, res) => {
  try {
    const { style, fashion_subject, fashion_detail, fashion_image } = req.body;

    if (!style || !fashion_subject) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const result = await getFashionCollection().insertOne({
      style,
      fashion_subject,
      fashion_detail,
      fashion_image,
      createdAt: new Date()
    });

    res.status(201).json({
      message: "Fashion created successfully",
      insertedId: result.insertedId
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/fashions", async (req, res) => {
  try {
    const data = await getFashionCollection()
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/fashions/:id", async (req, res) => {
  try {
    const o_id = new ObjectId(req.params.id);
    const result = await getFashionCollection().findOne({ _id: o_id });

    if (!result) {
      return res.status(404).json({ message: "Not found" });
    }

    res.json(result);

  } catch {
    res.status(400).json({ error: "Invalid ID format" });
  }
});

const partnerCode = "MOMO";
const accessKey = "F8BBA842ECF85";
const secretKey = "K951B6PE1waDMi640xX08PD3vg6EkVlz";

app.post("/payment/momo", async (req, res) => {
  try {
    const { amount } = req.body;
    if (!amount) {
      return res.status(400).json({ error: "Amount is required" });
    }

    const requestId = partnerCode + Date.now();
    const orderId = requestId;
    const orderInfo = "Thanh toán đơn hàng";
    const redirectUrl = "http://localhost:4200/payment-success";
    const ipnUrl = "http://localhost:3002/payment/ipn";
    const requestType = "captureWallet";
    const extraData = "";

    await getPaymentCollection().insertOne({
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

    const requestBody = JSON.stringify({
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
        "Content-Length": Buffer.byteLength(requestBody)
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

    momoReq.write(requestBody);
    momoReq.end();

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.post("/payment/ipn", async (req, res) => {
  const { orderId, resultCode, transId } = req.body;

  await getPaymentCollection().updateOne(
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
  const payments = await getPaymentCollection()
    .find({})
    .sort({ createdAt: -1 })
    .toArray();

  res.json(payments);
});

const cookieParser = require("cookie-parser");
app.use(cookieParser());

app.get("/create-cookie", (req, res) => {

  const account = {
    username: "vobichngoc",
    password: "123456"
  };

  res.cookie("username", "vobichngoc");

  res.cookie("account", account);
  res.cookie("infor_limit1", "I am limited Cookie - way 1", {
    expires: new Date(Date.now() + 360000)
  });
  res.cookie("infor_limit2", "I am limited Cookie - way 2", {
    maxAge: 360000
  });

  res.send("Cookies are created");
});

app.get("/read-cookie", (req, res) => {
  res.json({
    username: req.cookies.username || "",
    password: req.cookies.password || ""
  });
});

app.get("/clear-cookie",cors(),(req,res)=>{
res.clearCookie("account")
res.send("[account] Cookie is removed")
})
