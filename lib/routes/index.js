var express = require('express'),
    mainRouter = express.Router(),
    apiRouter = express.Router(),
    security = require('../security'),
    movieController = require('../../controllers/api/movieController'),
    adminController = require('../../controllers/api/adminController');

//apiRouter.get("/user", userController.info);

apiRouter.route("/movie").get(movieController.search);
apiRouter.route("/movie/:id").get(movieController.movieDetails);


//apiRouter.use(security.authorize);

apiRouter.route("/admin/user").get(adminController.listUsers)
                                .post(adminController.createUser);

mainRouter.use("/api", apiRouter);

module.exports = mainRouter;