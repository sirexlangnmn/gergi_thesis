/*

http://patorjk.com/software/taag/#p=display&f=ANSI%20Regular&t=Server


███████╗███████╗██████╗ ██╗   ██╗███████╗██████╗
██╔════╝██╔════╝██╔══██╗██║   ██║██╔════╝██╔══██╗
███████╗█████╗  ██████╔╝██║   ██║█████╗  ██████╔╝
╚════██║██╔══╝  ██╔══██╗╚██╗ ██╔╝██╔══╝  ██╔══██╗
███████║███████╗██║  ██║ ╚████╔╝ ███████╗██║  ██║
╚══════╝╚══════╝╚═╝  ╚═╝  ╚═══╝  ╚══════╝╚═╝  ╚═╝ started...

dependencies: {
    compression     : https://www.npmjs.com/package/compression
    cors            : https://www.npmjs.com/package/cors
    dotenv          : https://www.npmjs.com/package/dotenv
    express         : https://www.npmjs.com/package/express
    socket.io       : https://www.npmjs.com/package/socket.io
    swagger         : https://www.npmjs.com/package/swagger-ui-express
    uuid            : https://www.npmjs.com/package/uuid
    yamljs          : https://www.npmjs.com/package/yamljs
    ejs             : https://www.npmjs.com/package/ejs
    mysql           : https://www.npmjs.com/package/mysql
    body-parser     : https://www.npmjs.com/package/body-parser
    bcrypt          : https://www.npmjs.com/package/bcrypt
    express-flash   : https://www.npmjs.com/package/express-flash
    express-session : https://www.npmjs.com/package/express-session
    method-override : https://www.npmjs.com/package/method-override
    nodemon         : https://www.npmjs.com/package/nodemon
    passport        : https://www.npmjs.com/package/passport
    passport-local  : https://www.npmjs.com/package/passport-local
    jsonwebtoken    : https://www.npmjs.com/package/jsonwebtoken
    pdfkit          : https://www.npmjs.com/package/pdfkit
}

*/

'use strict'; // https://www.w3schools.com/js/js_strict.asp

require('dotenv').config();

const { Server } = require('socket.io');
const http = require('http');
const https = require('https');
const compression = require('compression');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
// const cookieSession = require('cookie-session');
const multer = require('multer');
const path = require('path');
const app = express();

app.use(
    cors({
        origin: [
            'http://localhost:3000',
            'https://www.gergi.ph',
            'https://gergi.ph'
        ],
    }),
);

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'https://www.gergi.ph');
    res.setHeader('Access-Control-Allow-Origin', 'https://gergi.ph');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

//app.use(cors()); // Enable All CORS Requests for all origins

app.use(compression()); // Compress all HTTP responses using GZip

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse requests of content-type - application/json
app.use(bodyParser.json());

const session = require('express-session');
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
        cookie: {
            maxAge: 365 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: 'strict',
        },
    }),
);

app.use(function (req, res, next) {
    const corsWhitelist = [
        'http://localhost:3000',
    ];

    if (corsWhitelist.indexOf(req.headers.origin) !== -1) {
        res.header('Access-Control-Allow-Origin', req.headers.origin);
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    }

    res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');

    res.setHeader('X-Frame-Options', 'sameorigin');

    next();
});

const isHttps = false; // must be the same to client.js isHttps
const port = process.env.PORT; // must be the same to client.js signalingServerPort

let io, server, host;

if (isHttps) {
    const fs = require('fs');
    const options = {
        key: fs.readFileSync(path.join(__dirname, '../ssl/key.pem'), 'utf-8'),
        cert: fs.readFileSync(path.join(__dirname, '../ssl/cert.pem'), 'utf-8'),
    };
    server = https.createServer(options, app);
    io = new Server().listen(server);
    host = 'https://' + 'localhost' + ':' + port;
} else {
    server = http.createServer(app);
    io = new Server().listen(server);
    host = 'http://' + 'localhost' + ':' + port;
}

const api_key_secret = process.env.API_KEY_SECRET;

require('../routes/index.js')(app);
require('../routes/upload-file.js')(app);

const pdfService = require('../service/pdf-service');
const pdfServiceForTrader = require('../service/pdf-trader');

const Logger = require('./Logger');
const log = new Logger('server');

// Use all static files from the public folder
app.use(express.static(path.join(__dirname, '../../', 'public')));

// Api parse body data as json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true })); // dati naka comment ito

// Remove trailing slashes in url handle bad requests
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        log.debug('Request Error', {
            header: req.headers,
            body: req.body,
            error: err.message,
        });
        return res.status(400).send({ status: 404, message: err.message }); // Bad request
    }
    if (req.path.substr(-1) === '/' && req.path.length > 1) {
        let query = req.url.slice(req.path.length);
        res.redirect(301, req.path.slice(0, -1) + query);
    } else {
        next();
    }
});

// set the view engine to ejs
app.set('view engine', 'ejs');

// ======================================
// db sequelize sync process [start]
//=======================================
const db = require('../models');

db.sequelize
    .sync()
    .then(() => {
        console.log('Synced db.');
    })
    .catch((err) => {
        console.log('Failed to sync db: ' + err.message);
    });


// =====================================
// db sequelize sync process [end]
//======================================


// to read my references json file
const { readFileSync, writeFile } = require('fs');
const classificationsJson = readFileSync(path.join(__dirname, '../../', 'public/references/classifications.json'));
const organizationsJson = readFileSync(path.join(__dirname, '../../', 'public/references/organizations.json'));


// Utility function to get session data
const getSessionData = (session) => ({
    name: session?.user?.name || '',
    email: session?.user?.email || '',
    user_type: session?.user?.user_type || '',
    organization_id: session?.user?.organization_id || '',
});

app.get(['/'], (req, res) => {
    let sessionData = {
        name: '',
        email: '',
        user_type: '',
        organization_id: '',
    };

    if (req.session && req.session.user) {
        sessionData = {
            name: req.session.user.name || '',
            email: req.session.user.email || '',
            user_type: req.session.user.user_type || '',
            organization_id: req.session.user.organization_id || '',
        };
    }

    res.render(path.join(__dirname, '../../', 'public/view/home/index'), {
        data: sessionData,
    });
});


// Utility function to determine the view path
const getViewPath = (userType) => {
    const views = {
        1: 'public/view/admin/web-scraping/web-scraping',
        2: 'public/view/library/library',
    };
    return path.join(__dirname, '../../', views[userType] || 'public/view/login/login');
};

app.get(['/library'], (req, res) => {
    const sessionData = getSessionData(req.session);
    const userType = parseInt(sessionData.user_type);
    res.render(getViewPath(userType), { data: sessionData });
});


app.get(['/profile'], (req, res) => {
    let sessionData = {
        name: '',
        email: '',
        user_type: '',
        organization_id: '',
    };

    if (req.session && req.session.user) {
        sessionData = {
            name: req.session.user.name || '',
            email: req.session.user.email || '',
            user_type: req.session.user.user_type || '',
            organization_id: req.session.user.organization_id || '',
        };
    }

    res.render(path.join(__dirname, '../../', 'public/view/admin/profile/profile'), {
        data: sessionData,
    });
});

app.get(['/web-scraping'], (req, res) => {
    let sessionData = {
        name: '',
        email: '',
        user_type: '',
        organization_id: '',
    };

    if (req.session && req.session.user) {
        sessionData = {
            name: req.session.user.name || '',
            email: req.session.user.email || '',
            user_type: req.session.user.user_type || '',
            organization_id: req.session.user.organization_id || '',
        };
    }

    res.render(path.join(__dirname, '../../', 'public/view/admin/web-scraping/web-scraping'), {
        data: sessionData,
    });
});

app.get(['/upload-resources'], (req, res) => {
    let sessionData = {
        name: '',
        email: '',
        user_type: '',
        organization_id: '',
    };

    if (req.session && req.session.user) {
        sessionData = {
            name: req.session.user.name || '',
            email: req.session.user.email || '',
            user_type: req.session.user.user_type || '',
            organization_id: req.session.user.organization_id || '',
        };
    }

    res.render(path.join(__dirname, '../../', 'public/view/admin/upload-resources/upload-resources'), {
        data: sessionData,
    });
});


app.get('/contact-us', (req, res) => {
    res.render(path.join(__dirname, '../../', 'public/view/contact_us/contact_us'), {

    });
});

app.get('/about-us', (req, res) => {
    res.render(path.join(__dirname, '../../', 'public/view/about_us/about_us'), {

    });
});







app.get('/registration', (req, res) => {
    let sessionData = {
        name: '',
        email: '',
        user_type: '',
        organization_id: '',
    };

    if (req.session && req.session.user) {
        sessionData = {
            name: req.session.user.name || '',
            email: req.session.user.email || '',
            user_type: req.session.user.user_type || '',
            organization_id: req.session.user.organization_id || '',
        };
    }

    res.render(path.join(__dirname, '../../', 'public/view/registration/registration'), {
        data: sessionData,
    });
});


app.get(['/modal'], (req, res) => {
    let sessionData = {
        name: '',
        email: '',
        user_type: '',
        organization_id: '',
    };

    if (req.session && req.session.user) {
        sessionData = {
            name: req.session.user.name || '',
            email: req.session.user.email || '',
            user_type: req.session.user.user_type || '',
            organization_id: req.session.user.organization_id || '',
        };
    }

    res.render(path.join(__dirname, '../../', 'public/view/modal/modal'), {
        data: sessionData,
    });
});


app.get(['/users'], (req, res) => {
    let sessionData = {
        name: '',
        email: '',
        user_type: '',
        organization_id: '',
    };

    if (req.session && req.session.user) {
        sessionData = {
            name: req.session.user.name || '',
            email: req.session.user.email || '',
            user_type: req.session.user.user_type || '',
            organization_id: req.session.user.organization_id || '',
        };
    }

    res.render(path.join(__dirname, '../../', 'public/view/admin/users/users'), {
        data: sessionData,
    });
});


app.get('/login', (req, res) => {
    let sessionData = {
        name: '',
        email: '',
        user_type: '',
        organization_id: '',
    };

    if (req.session && req.session.user) {
        sessionData = {
            name: req.session.user.name || '',
            email: req.session.user.email || '',
            user_type: req.session.user.user_type || '',
            organization_id: req.session.user.organization_id || '',
        };
    }

    res.render(path.join(__dirname, '../../', 'public/view/login/login'), {
        data: sessionData,
    });
});


// app.get('/library', (req, res) => {
//     let sessionData = {
//         name: '',
//         email: '',
//         user_type: '',
//         organization_id: '',
//     };

//     if (req.session && req.session.user) {
//         sessionData = {
//             name: req.session.user.name || '',
//             email: req.session.user.email || '',
//             user_type: req.session.user.user_type || '',
//             organization_id: req.session.user.organization_id || '',
//         };
//     }

//    if (!req.session || !req.session.user) {
//         res.render(path.join(__dirname, '../../', 'public/view/login/login'));
//     } else if (parseInt(req.session.user.user_type) === 1) {
//         res.render(path.join(__dirname, '../../', 'public/view/admin/admin'), {
//             data: sessionData,
//         });
//     }  else if (parseInt(req.session.user.user_type) === 2) {
//         res.render(path.join(__dirname, '../../', 'public/view/departments/departments'), {
//             data: sessionData,
//         });
//     }
// });


app.get('/courses/:departmentValue', (req, res) => {

    const departmentValue = req.params.departmentValue;

    if (departmentValue) {
        const sessionData = {
            departmentValue: departmentValue,
        };

        res.render(path.join(__dirname, '../../', 'public/view/courses/courses'), {
            data: sessionData,
        });
    } else {
        res.render(path.join(__dirname, '../../', 'public/view/login/login'));
    }
});


app.get('/resources/:courseValue', (req, res) => {

    const courseValue = req.params.courseValue;

    if (courseValue) {
        const sessionData = {
            fullName: req.session.user.name,
            organizationId: req.session.user.organization_id,
            departmentId: req.session.department_id,
            departmentTitle: req.session.department_title,
            courseValue: courseValue,
        };


        res.render(path.join(__dirname, '../../', 'public/view/resources/resources'), {
            data: sessionData,
        });
    } else {
        res.render(path.join(__dirname, '../../', 'public/view/login/login'));
    }
});



app.get('/logout', function (req, res, next) {
    // remove the req.user property and clear the login session
    //req.logout();

    req.session.destroy();

    // destroy session data
    req.session = null;

    // redirect to homepage
    res.redirect('/login');
});

app.post('/session-checker/:random', function (req, res, next) {
    var asd = req.params.random;

    res.send(req.session);
});



server.listen(port, null, () => {
    log.debug(
        `%c

	███████╗██╗ ██████╗ ███╗   ██╗      ███████╗███████╗██████╗ ██╗   ██╗███████╗██████╗
	██╔════╝██║██╔════╝ ████╗  ██║      ██╔════╝██╔════╝██╔══██╗██║   ██║██╔════╝██╔══██╗
	███████╗██║██║  ███╗██╔██╗ ██║█████╗███████╗█████╗  ██████╔╝██║   ██║█████╗  ██████╔╝
	╚════██║██║██║   ██║██║╚██╗██║╚════╝╚════██║██╔══╝  ██╔══██╗╚██╗ ██╔╝██╔══╝  ██╔══██╗
	███████║██║╚██████╔╝██║ ╚████║      ███████║███████╗██║  ██║ ╚████╔╝ ███████╗██║  ██║
	╚══════╝╚═╝ ╚═════╝ ╚═╝  ╚═══╝      ╚══════╝╚══════╝╚═╝  ╚═╝  ╚═══╝  ╚══════╝╚═╝  ╚═╝ started...

	`,
        'font-family:monospace',
    );

    // server settings
    log.debug('settings', {
        server: host,
        api_key_secret: api_key_secret,
    });
});
