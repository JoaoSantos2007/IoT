import app from './src/app.js'

import mysqlConfig from './src/config/mysql.js';

const port = process.env.PORT || 3030;
const host = '0.0.0.0'

mysqlConfig.authenticate()
  .then(() => {
    console.log("Connection estabilished with mysql");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

await mysqlConfig.sync()

app.listen(port,host, () => {
    console.log(`Server is working on http://localhost:${port}`)
})