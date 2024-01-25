const express = require('express');
const dotenv = require('dotenv');
dotenv.config('./.env');
const app = express();
const router = require('./routes/user_routes.js');
const BlogRouter = require('./routes/blog_routes.js');

app.use(express.json());

app.use('/api/user', router)
app.use('/api/blog', BlogRouter)

// app.use('/', (req, res) => {
//     res.send('hello world');
// })
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
