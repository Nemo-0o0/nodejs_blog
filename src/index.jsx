const path = require('path');
const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const handlebars = require('express-handlebars');

const SortMiddleware = require('./app/middlewares/SortMiddleware.js')

const route = require('./routes/index.jsx');
const db = require('./config/db/index.jsx');
const { accessSync } = require('fs');

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

// Custom middleware
app.use(SortMiddleware)



// app.use(bacbaove)
// Middleware
    // function bacbaove (req, res ,next) {
    //     if (['vethuong', 'vevip'].includes(req.query.ve)) {
    //         req.face = 'Gach gach gach'
    //         return next()
    //     }
    //     res.status(403).json({
    //         message: 'Acces denied'
    //     })
    // }




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
            sortable: (field, sort) => {
                const sortType = field === sort.column ? sort.type : 'default'
 
                const icons = {
                    default: 'fa-solid fa-up-down',
                    asc: 'fa-solid fa-arrow-down-short-wide',
                    desc: 'fa-solid fa-arrow-down-wide-short',
                }
                const types = {
                    default: 'desc',
                    asc:'desc',
                    desc:'asc',
                }

                const icon = icons[sortType]
                const type = types[sortType]

                return `<a href="?_sort&column=${field}&type=${type}">
                                    <i class="${icon}"></i>
                                </a>`
            },
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
