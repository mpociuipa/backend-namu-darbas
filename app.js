const express = require('express');
const serviceRouter = require('./routes/serviceRoutes');
const userRoutes = require('./routes/userRoutes');
const repairmanRoutes = require("./routes/repairmanRoutes");

const app = express();
app.use(express.json());

// app.use((req,res,next)=>{
//     console.log('Hello from middleware');
//     next();
// })





//main route

app.use('/api/v1/services', serviceRouter);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/repairmans', repairmanRoutes);

module.exports = app;
//http://localhost:3000/api/v1/hotels