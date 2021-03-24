const museumService = require("../../service/museum.service");
const { sampleMuseums, testTimestamp } = require("../testData/sampleInput.js");

test("getMuseumData", async () => {
  const result = await museumService.getMuseumData();
  expect(result.status).toEqual(200);
});

test("filterDataByDate - Date - July 2014, Ignore - 'avila_adobe'", () => {
  expectedObject = {
    attendance: {
      month: "July",
      year: 2014,
      ignored: {
        museum: "avila_adobe",
        visitors: 32378,
      },
      total: 14667,
      highest: {
        visitors: 13490,
        museum: "america_tropical_interpretive_center",
      },
      lowest: {
        visitors: 120,
        museum: "hellman_quon",
      },
    },
  };
  new Date(new Date(1404198000000).setUTCHours(0, 0, 0, 0));
  const data = museumService.filterDataByDate(
    testTimestamp,
    "avila_adobe",
    sampleMuseums
  );
  expect(data).toMatchObject(expectedObject);
});

test("filterDataByDate - Date - July 2014", () => {
  expectedObject = {
    attendance: {
      month: "July",
      year: 2014,
      total: 47045,
      highest: {
        visitors: 32378,
        museum: "avila_adobe",
      },
      lowest: {
        visitors: 120,
        museum: "hellman_quon",
      },
    },
  };
  const data = museumService.filterDataByDate(testTimestamp, "", sampleMuseums);
  expect(data).toMatchObject(expectedObject);
});

test("filterDataByDate - Date - July 2014", () => {
  expectedObject = {
    attendance: {
      month: "July",
      year: 2014,
      total: 47045,
      highest: {
        visitors: 32378,
        museum: "avila_adobe",
      },
      lowest: {
        visitors: 120,
        museum: "hellman_quon",
      },
    },
  };
  const data = museumService.filterDataByDate(
    testTimestamp,
    "123",
    sampleMuseums
  );
  expect(data).toMatchObject(expectedObject);
});
