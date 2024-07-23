const path = require('path');
const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const handlebars = require('express-handlebars');

const route = require('./routes/index.jsx');
const db = require('./config/db/index.jsx');

// Connect to database
db.connect();

const app = express();
const port = 3009;

// Use static folder
app.use(express.static(path.join(__dirname, 'public')));

app.use(
    express.urlencoded({
        extended: true,
    })
);
app.use(express.json());

app.use(methodOverride('_method'));


// Middleware
app.get('/middleware',
    function  (req, res ,next) {
        if (['vethuong', 'vevip'].includes(req.query.ve)) {
            req.face = 'Gach gach gach'
            return next()
        }
        res.status(403).json({
            message: 'Acces denied'
        })
    },
     function(req, res, next) {
        res.json({
            message: 'Successfully',
            face: req.face
        })
    }
)

// XMLHttpRequest,  fetch , axios,...

// HTTP Logger
// app.use(morgan('combined'))

// Template Engine
app.engine(
    'hbs',
    handlebars.engine({
        extname: '.hbs',
        helpers: {
            sum: (a, b) => a + b,
        },
    })
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

// route init
route(app);

app.listen(port, () => {
    console.log(`App listening on port http://localhost:${port}`);
});
