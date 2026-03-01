require("dotenv").config();
const connectDB = require("./config/db");

const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);


const app = require("./app");

connectDB();

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
