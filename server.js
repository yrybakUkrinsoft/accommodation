const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const ApiRouter = require('./lib/routes/api/route');

const port = process.env.PORT || 4000;

const mockData = require('./mock/reviews.json');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.set('mock', mockData);

app.get('/', (req, res) => {
    return res.sendFile(path.join(__dirname, '../public/dist/index.html'))
})
app.use('/api', ApiRouter);

app.listen(port, () => console.log('Listen on port: ' + port));