const express = require("express");
const app = express();
require("./db/conn");
app.use(express.json());
//require("../model/register");
app.use(require('./router/auth'));
app.listen(8000, () => {
    console.log(`Listening to the port no 8000`);
})
