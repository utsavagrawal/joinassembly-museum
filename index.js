var express = require("express");
var bodyParser = require("body-parser");
var app = express();
const museumService = require("./service/museum.service");
const validationService = require("./service/validation.service");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/api/visitors", async (req, res) => {
  try {
    //validations
    validationService.validateInput(req.query);
    const timestamp = new Date(
      new Date(parseInt(req.query.date)).setUTCHours(0, 0, 0, 0)
    );
    const ignoreMuseum = req.query.ignore;

    //get data
    const jsonResp = await museumService.getMuseumData();
    const returnObject = await museumService.filterDataByDate(
      timestamp,
      ignoreMuseum,
      jsonResp.data
    );
    res.send({ error: 0, msg: "Success", data: returnObject });
  } catch (error) {
    console.log("error");
    console.log(error);
    if (error.errorCode) {
      res.send({
        errorCode: error.errorCode,
        msg: error.msg,
        data: error.data,
      });
    } else {
      res.send({ errorCode: 500, msg: "Internal Server Error", data: error });
    }
  }
});

app.listen(2000, () => {
  console.log(`Example app listening at http://localhost:2000`);
});
