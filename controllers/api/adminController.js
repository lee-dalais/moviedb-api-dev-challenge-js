var User = require('../../models/user');

exports.listUsers = async (req, res) => {
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

exports.createUser = (req, res) => {
   let user = new User(req.body);
    return user.save()
        .then(() => {
            return res.json({ });
        })
        .catch((err) => {
            throw new Error(err.message);
        });
};