import express from "express";
import room from "./roomRoutes.js";
import device from "./deviceRoutes.js"
import tag from "./tagsRoutes.js"

const routes = (app) => {
  app.route("/").get((req, res) => {
    res.status(200).send("API data flight");
  });

  app.use((req, res, next) => {
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Headers", "*");
    res.set("Access-Control-Allow-Methods", "*");
    next();
  });

  app.use(
    express.json(),
    room,
    device,
    tag
  );
};

export default routes;
