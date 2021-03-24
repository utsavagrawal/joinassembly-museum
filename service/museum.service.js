const axios = require("axios");
var _ = require("lodash");

const museumService = {
  getMuseumData: async () => {
    return await axios.get("https://data.lacity.org/resource/trxm-jn3c.json");
  },
  filterDataByDate: (timestamp, ignoreMuseum, dataObj) => {
    const compareDate = timestamp
      .toISOString()
      .slice(0, timestamp.toISOString().length - 1);

    const filterObject = {
      month: compareDate,
    };
    //format data - ideally, only 1 object would be mapped to a timestamp of the exact month
    const monthdata = _.filter(dataObj, filterObject)[0];
    let keyArray = Object.keys(monthdata);
    keyArray.splice(keyArray.indexOf("month"), 1);
    const returnObject = {
      attendance: {
        month: timestamp.toLocaleString("default", { month: "long" }),
        year: timestamp.getFullYear(),
      },
    };

    //find highest, lowest, total, ignored
    let totalVisitors = 0;
    let highest = {
        visitors: parseInt(monthdata[keyArray[0]]),
        museum: keyArray[0],
      },
      lowest = {
        visitors: parseInt(monthdata[keyArray[0]]),
        museum: keyArray[0],
      };

    for (let i = 1; i < keyArray.length; i++) {
      let thisKey = keyArray[i];
      let thisCount = parseInt(monthdata[thisKey]);
      if (ignoreMuseum && thisKey === ignoreMuseum) {
        returnObject.attendance["ignored"] = {
          museum: thisKey,
          visitors: thisCount,
        };
        continue;
      }
      totalVisitors += thisCount;
      if (thisCount > highest.visitors) {
        highest.visitors = thisCount;
        highest.museum = thisKey;
      }
      if (thisCount < lowest.visitors) {
        lowest.visitors = thisCount;
        lowest.museum = thisKey;
      }
    }
    returnObject.attendance.total = totalVisitors;
    returnObject.attendance.highest = highest;
    returnObject.attendance.lowest = lowest;  

    return returnObject;
  }
};

module.exports = museumService