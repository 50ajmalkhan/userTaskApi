const express = require('express');
const app = express();
const env = require('dotenv').config();
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const userRoutes = require("./routes/user")
const taskRoutes = require("./routes/task")
const detailRoutes = require("./routes/details");
const statusRoutes = require("./routes/status");
const cors = require("cors");
app.use(cors())
var swaggerUi = require("swagger-ui-express"),
    swaggerDocument = require("../apiDocumentation.json");

mongoose.connect(
    process.env.MongoURL,
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }
).then(() => {
    console.log('DataBase Connected')
});
app.use(bodyParser.json())
app.use('/userapi', userRoutes);
app.use('/taskapi', taskRoutes);
app.use('/detailapi', detailRoutes);
app.use('/statusapi', statusRoutes);


app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.listen(process.env.PORT, () => {
    console.log(`Server Is Running On Port ${process.env.PORT}`);
}); 