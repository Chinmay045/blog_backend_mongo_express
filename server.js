const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes/user-routes.js');
const blogRouter = require('./routes/blog-routes.js');
const app = express();
app.use(express.json());
app.use('/api/user', router);
app.use('/api/blog', blogRouter);



mongoose.connect('mongodb+srv://chinzsandur07:tEcUOEAgTM8UQ59L@cluster0.7qx7vmf.mongodb.net/?retryWrites=true&w=majority')
    .then(() => app.listen(5000))
    .then(() => console.log("connected at port 5000"))
    .catch((error) => console.log("Db is not connected" + error));

// app.use('/', (req, res, next) => {
//     res.send("Hello world");
// })

