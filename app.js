const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const config = require('./utils/config');

const port = process.env.PORT || 8080;

//middlewares
const app = express();

app.use(bodyParser.json());


app.use(cors());

//routes
const personasRoutes = require('./routes/personas');


//Request a token
app.get('/api/token', (req, res) => {
    const payload = {
        name: 'Edgardo',
        scopes: ["personas:create"]
    };
    const token = jwt.sign(payload, config.JWT_SECRET);
    res.send(token);
})

app.use('/api', personasRoutes);

app.get('/', (req, res) => {
    res.send("Api Node");
});


app.listen(port);