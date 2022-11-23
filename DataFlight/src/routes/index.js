import express from "express";
import room from "./roomRoutes.js";
import device from "./deviceRoutes.js"
import tag from "./tagsRoutes.js"
import user from "./userRoutes.js"
import auth from "./authRoutes.js"
import cookieParser from 'cookie-parser'

const routes = (app) => {
  app.route("/").get((req, res) => {
    res.status(200).send("API data flight");
  });

  app.use((req, res, next) => {
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Headers", "*");
    res.set("Access-Control-Allow-Methods", "*");
    res.set('Access-Control-Allow-Credentials', true);
    next();
  });

  app.use(
    express.json(),
    cookieParser(),
    room,
    device,
    tag,
    user,
    auth
  );
};

export default routes;
