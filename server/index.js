const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const validateUser = require("./middleware/validateUser");

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(cookieParser());

const allowedOrigins = [
  "http://localhost:5173",
  "https://pern-todo-app-bice.vercel.app/",
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
};

app.use(cors(corsOptions));

app.use("/auth", require("./routes/jwtAuth"));
app.use("/todos", validateUser, require("./routes/todos"));

app.get("/", (req, res) => {
  res.send("OK");
});

app.listen(PORT, () => {
  console.log(`App running and listening on ${PORT}`);
});
