module.exports = (app) => {
  const users = require("../controllers/user.controller");
  const { validateWebToken } = require("../auth");

  app.get("/api/users/:userId", users.getUserById);
  app.get("/api/users/email/:email", users.getUserByEmail);

  app.post("/api/users/signup", users.registerUser);
  app.post("/api/users/login", users.login);

  app.put("/api/users/:userId", validateWebToken, users.updateUserById);

  app.delete("/api/users/:userId", validateWebToken, users.deleteUserById);

  app.put('/api/users/newpassword/:userId', validateWebToken, users.changePassword)
};
