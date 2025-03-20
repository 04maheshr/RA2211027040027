const express1 = require("express");
require("dotenv").config();

const app1 = express1();
const PORT = process.env.PORT

app1.use(express1.json());

app1.get("/", (req, res) => {
    res.send("Hello, Express!");
});

app1.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
