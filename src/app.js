const express = require('express');
const app = express();

const dotenv = require('dotenv').config();
const PORT = process.env.PORT;

const router = require('./routes/router');

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(router);

app.use(function(req, res, next) {
    return res.status(404).json({
        status: 'error',
        message: 'Not found'
    })
})

app.use((err, req, res, next) => {
    console.error(err.stack)

    res.status(500).json({
        status: 'error',
        message: 'Internal server error'
    })
})

app.listen(PORT, () => {
    console.log(`Listening to ${PORT}`)
})