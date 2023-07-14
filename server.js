const express = require("express");
const app = new express();
const port = 8080;
const db = require("./models");
const expressSession = require("express-session");
const logger = require("morgan")

app.use(express.static("public"));
app.use(expressSession({
  secret: 'Drew Loves Kinsta'
}))
app.listen(port, () => {
  console.log(`Serving photo app on http://localhost:${port}`);
});
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(logger("dev"));
const sqlPort = 3307;
// set the view engine to ejs
app.set("view engine", "ejs");
global.loggedIn = null;
app.use("*", (request, response, next) => {
  loggedIn = request.session.userId;
  next();
});

//db
db.sequelize
  .sync({force:false})
  .then(() => {
    app.listen(sqlPort, () => {
      console.log(
        `MariaDB Connection has been established successfully to http://localhost:${sqlPort}.`
      );
    });
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });

  const PhotosRouter = require('./routes/PhotosRouter')
  const CommentsRouter = require('./routes/CommentsRouter')
  const UsersRouter = require('./routes/UsersRouter')
  const PageRouter = require('./routes/PageRouter')
  app.use("/images", PhotosRouter);
  app.use("/comments", CommentsRouter);
  app.use("/users", UsersRouter);
  app.use('/', PageRouter)