// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", (req, res) => {
  res.json({ greeting: "hello API" });
});

// optain route input date
app.get("/api/1451001600000", (req, res) => {
  // using the specified parameter 
  let date = new Date(1451001600000);
  res.json({ unix: date.getTime(), utc: date.toUTCString() });
});

// optain input date API
app.get("/api/:date?", (req, res) => {
  // using route parameter input of 'date'
  const reqDate = new Date(req.params.date);
  const input = req.params.date;

  if (input == null) {
    res.json({ unix: new Date().getTime(), utc: new Date().toUTCString() });
  } 
  
  if (reqDate == "Invalid Date") {
    res.json({ error: "Invalid Date" });
  }

  res.json({
    unix: reqDate.getTime(),
    utc: reqDate.toUTCString(),
  });
  // The getTime() method of Date instances returns the number of milliseconds for this date
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getTime
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
