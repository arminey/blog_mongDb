const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')

const articlesRoutes = require('./routes/articles');
const usersRoutes = require('./routes/users');
const categoriesRoutes = require('./routes/categories');


const PORT = 5000;

const app = express();
app.use(bodyParser.json());
app.use(cors());


app.use('/api/articles', articlesRoutes);

app.use('/api/users', usersRoutes);

app.use('/api/categories', categoriesRoutes);


app.listen(PORT, () => console.info(`Server runs on ${PORT} port.`));