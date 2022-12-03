import express from "express";
import cookieParser from 'cookie-parser'
import room from "./roomRoutes.js";
import device from "./deviceRoutes.js"
import tag from "./tagsRoutes.js"
import user from "./userRoutes.js"
import auth from "./authRoutes.js"
import events from "./eventRoutes.js"

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
    auth,
    events
  );
};

export default routes;
