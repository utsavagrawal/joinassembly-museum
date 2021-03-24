# joinassembly-museum
## local setup

Install Dependencies
```bash
npm install
```

Start Application on port 2000

```bash
node index.js
```

Hit the curl/postman request
```bash
curl --location --request GET 'http://localhost:2000/api/visitors?date=1404198000000&ignore=hellman_quon'
```
or a simple browser get request
```bash
http://localhost:2000/api/visitors?date=1404198000000&ignore=hellman_quon
```

To run the unit tests
```bash
npm run test
```

To view the coverage report, open the following in a browser
```bash
{projectRootDir}/tests/coverage/lcov-report/index.html
```

## Error Codes

101 - Required field 'date' not found
Date field is a required field

102 - Invalid Date Format
Date type passed is not a millisecond value as a number

103 - Date cannot be in future
Future Date recieved against which no data will be available