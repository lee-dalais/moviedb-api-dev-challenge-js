var User = require('../../models/user');

exports.listUsers = async function (req, res, next) {
    try {
        let documents = await User.find().exec();
        let users = documents.map(item => {
            return {
              id: item.userID,
              username: item.username
            };
        });
        return res.json({ model: { users: users } });
    } catch (err) {
        throw new Error(err.stack);
    }

};

exports.createUser = function (req, res, next) {
   let user = new User(req.body);
    return user.save()
        .then(function () {
            return res.json({ });
        })
        .catch(function (err) {
            throw new Error(err.message);
        });
};