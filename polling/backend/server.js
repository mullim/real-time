import express from "express";
import bodyParser from "body-parser";
import nanobuffer from "nanobuffer";
import morgan from "morgan";

// set up a limited array
const msg = new nanobuffer(50);
const getMsgs = () => Array.from(msg).reverse();

// seed the server with at least one message
msg.push({
  user: "mike",
  text: "hi there",
  time: Date.now(),
});

// get express ready to run
const app = express();
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(express.static("frontend"));

app.get("/poll", function (req, res) {
  // Send messages
  res.json({
    msg: getMsgs(),
  });
});

app.post("/poll", function (req, res) {
  // get message from request body
  const { user, text } = req.body;

  // push the message into the message array
  msg.push({ user, text, time: Date.now() });

  // respond with "ok" status
  res.json({
    status: "ok",
  });
});

// start the server
const port = process.env.PORT || 3000;
app.listen(port);
console.log(`listening on http://localhost:${port}`);
