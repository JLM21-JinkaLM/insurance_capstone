const express = require("express");
const dotenv = require('dotenv').config()
const connectToDB = require('./config/databse')
const PORT = process.env.PORT || 5000
const cors = require('cors')
const app = express();
app.use(cors());
app.use(express.json())

app.use("/api/users", require("./router/authRoutes"));
app.use("/api/policies", require("./router/policyRoutes"));
app.use("/api/claims", require("./router/claimRoutes"));
app.use("/api/treaties", require("./router/treatyRoutes"));
app.use("/api/reinsurers", require("./router/reinsurerRoutes"));
app.use("/api/dashboard", require("./router/dashboardRoutes"));
app.use("/api/risk-allocation",require("./router/riskAllocationRoutes"));

app.get("/", (req, res) => {
  res.send("Server running");
});

app.listen(PORT,()=>{
    console.log("server is running")
})

connectToDB()