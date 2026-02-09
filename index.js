const express = require("express");
const app = express();
const port = 3000;

const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const multer = require("multer");

app.use(morgan("combined"));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.send("Welcome to K234111E RESTful API");
});

let books = [
  {
    BookId: "b1",
    BookName: "Sherlock Holmes",
    Price: 120,
    Description: "Tuyển tập trinh thám kinh điển với thám tử Sherlock Holmes.",
    Image: "sherlock.jpg",
    UpdateDate: "25/10/2014 12:00:00",
    Quantity: 120,
    CDCode: 7,
    PublisherCode: 1
  },
  {
    BookId: "b2",
    BookName: "Doraemon",
    Price: 80,
    Description: "Truyện tranh thiếu nhi nổi tiếng về chú mèo máy Doraemon.",
    Image: "doraemon.jpg",
    UpdateDate: "23/10/2013 12:00:00",
    Quantity: 25,
    CDCode: 3,
    PublisherCode: 2
  },
  {
    BookId: "b3",
    BookName: "Conan",
    Price: 100,
    Description: "Thám tử Conan phá giải những vụ án bí ẩn và gay cấn.",
    Image: "conan.jpg",
    UpdateDate: "15/09/2014 12:00:00",
    Quantity: 240,
    CDCode: 8,
    PublisherCode: 4
  },
  {
    BookId: "b4",
    BookName: "Sự im lặng của bầy cừu",
    Price: 150,
    Description: "Tiểu thuyết trinh thám tâm lý với nội dung căng thẳng.",
    Image: "baycuu.jpg",
    UpdateDate: "20/08/2015 12:00:00",
    Quantity: 60,
    CDCode: 5,
    PublisherCode: 3
  },
  {
    BookId: "b5",
    BookName: "Harry Potter",
    Price: 200,
    Description: "Bộ tiểu thuyết giả tưởng nổi tiếng về thế giới phù thủy.",
    Image: "harry.jpg",
    UpdateDate: "01/01/2016 12:00:00",
    Quantity: 180,
    CDCode: 9,
    PublisherCode: 6
  }
];



app.get("/books", (req, res) => {
  res.json(books);
});

app.get("/books/:id", (req, res) => {
  const id = req.params.id;
  const book = books.find(b => b.BookId === id);
  res.json(book);
});

app.post("/books", (req, res) => {
  books.push(req.body);
  res.json(books);
});

app.put("/books/:id", (req, res) => {
  const id = req.params.id;
  books = books.map(b =>
    b.BookId === id ? req.body : b
  );
  res.json(books);
});

app.delete("/books/:id", (req, res) => {
  const id = req.params.id;
  books = books.filter(b => b.BookId !== id);
  res.json(books);
});


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage });

app.post("/upload", upload.single("image"), (req, res) => {
  res.json({
    success: true,
    filename: req.file.originalname
  });
});

app.listen(port, () => {
  console.log(`K234111E server running at http://localhost:${port}`);
});
