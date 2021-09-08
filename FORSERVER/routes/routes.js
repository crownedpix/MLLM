// import other routes
// const userRoutes = require('./users');
const actorRoutes = require('./actors');
const movieRoutes = require('./movie');
const categoryRoutes = require('./category');
const youMovieRoutes = require('./youmo');
const posRoutes = require('./pos');

const appRouter = (app, fs) => {

    // default route
    app.get('/', (req, res) => {
        res.send('welcome to the development api-server');
    });

    // // other routes
    // userRoutes(app, fs);
    actorRoutes(app,fs);
    movieRoutes(app,fs);
    categoryRoutes(app,fs);
    youMovieRoutes(app,fs);
    posRoutes(app,fs);
};

module.exports = appRouter;