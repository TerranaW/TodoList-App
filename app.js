const express = require('express');
const cors = require('cors')
const app = express();
const PORT = process.env.PORT || 3000;

const allRoutes = require("./routes");
const db = require("./db");

db.then(() => {
    console.log("connected to db")
}).catch(() => {
    console.log("error connecting to db")
});

app.use(cors());
app.use(express.json());
app.use(allRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
