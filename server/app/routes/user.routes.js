module.exports = (app) => {
    const users = require('../controllers/user.controller');
    const { validateWebToken } = require('../auth');

    app.get('/api/users/:userId', users.getUserById);

    app.post('/api/users', users.registerUser);
    app.post('/api/users/login', users.login);

    app.put('/api/users/:userId', validateWebToken, users.updateUserById);

    app.delete('/api/users/:userId', validateWebToken, users.deleteUserById);
}