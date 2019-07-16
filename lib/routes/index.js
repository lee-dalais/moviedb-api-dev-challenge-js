const express = require('express'),
    mainRouter = express.Router(),
    apiRouter = express.Router(),
    security = require('../security'),
    movieController = require('../../controllers/api/movieController'),
    adminController = require('../../controllers/api/adminController'),
    userController = require('../../controllers/api/userController');

apiRouter.route("/movies").get(movieController.search);
apiRouter.route("/movies/:id").get(movieController.movieDetails);


//apiRouter.use(security.authorize);

apiRouter.route("/admin/users").get(adminController.listUsers)
                                .post(adminController.createUser);

apiRouter.route("/users/:id/favorites").get(userController.listFavorites)
                                        .post(userController.createFavorite);

mainRouter.use("/api", apiRouter);

module.exports = mainRouter;