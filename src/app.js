const express = require('express');
const app = express();
const cors = require('cors');

const fs = require('fs');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./docs/swagger.json');

const dotenv = require('dotenv').config();
const PORT = process.env.PORT || 3000;

const router = require('./routes/router');

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors())

app.get('/swagger.json', (req, res) => {
    const { protocol, headers } = req;

    // read swagger.json file
    const swaggerTemplate = JSON.parse(fs.readFileSync('./src/docs/swagger.json', 'utf8'));

    // add dynamic server
    swaggerTemplate.servers = [
    {
        url: `${protocol}://${req.get('host')}`,
        description: "Current server"
    }
    ];

    res.json(swaggerTemplate);
});

// serve swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(null, { 
    swaggerOptions: {
        url: '/swagger.json' // Swagger JSON endpoint
    }
}));

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