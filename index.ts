const express = require("express");
import { Request, Response } from "express";
require("dotenv").config();
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");
const PORT = process.env.PORT || 5001;
const passport = require("passport");
// const Apps = require('./client/src/');
import * as http from "http";
import bodyParser from "body-parser";
import { policy } from "./src/config/helmet";
import { leadRoute } from "./src/routes/leads";
import { complaintsRoute } from "./src/routes/complaints";
import { authRoute } from "./src/routes/auth";
import { filesRoute } from "./src/routes/files";
import { listRoute } from "./src/routes/list";
import { pageRoute } from "./src/routes/pages";
import { passportUtilities } from "./src/utilities/passport.utilities";
import { generateRoute } from "./src/routes/generate";
import { usersRoute } from "./src/routes/users";
import { graphqlRouter } from "./src/routes/graphql";
import { formbuild } from "./src/routes/formbuild";
import { botWppRoute } from "./src/routes/bot";
import { Server, Socket } from "socket.io";
import { mailService } from "./src/services/email/email";
import { webhookRoute } from "./src/routes/webhook";
import { productsRouter } from "./src/routes/productRouter";

const fetch = require("node-fetch");

class App {
  public server;
  public httpServer;
  public socket;
  public passport = new passportUtilities().passportInit();
  public authRoute: authRoute = new authRoute();
  public filesRoute: filesRoute = new filesRoute();
  public listRoute: listRoute = new listRoute();
  public leadsRoute: leadRoute = new leadRoute();
  public complaintsRoute: complaintsRoute = new complaintsRoute();
  public generateRoute: generateRoute = new generateRoute();
  public pageRoute: pageRoute = new pageRoute();
  public usersRoute: usersRoute = new usersRoute();
  public graphqlRouter: graphqlRouter = new graphqlRouter();
  public formbuild: formbuild = new formbuild();
  public mailService: mailService = new mailService();
  public botWppRoute: botWppRoute = new botWppRoute();
  public webhook: webhookRoute = new webhookRoute();
  public productsRouter: productsRouter = new productsRouter();
  constructor() {
    this.server = express();
    this.httpServer = http.createServer(this.server);
    this.socket = new Server(this.httpServer, {
      cors: {
        origin: ["http://localhost:3000"],
      },
    });
    this.middlewares();
    this.routes();
  }
  private middlewares() {
    this.server.use(express.json());
    this.server.use(bodyParser.json());
    this.server.use(express.urlencoded({ extended: false }));
    this.server.use(express.static(path.join(__dirname, "./src/public")));
    this.server.use(express.static(path.join(__dirname, "../src/public")));
    this.server.use(express.static(path.join(__dirname, "./client/build")));
    this.server.use(express.static(path.join(__dirname, "../client/build")));
    this.server.use(morgan("dev"));
    this.server.use(helmet(policy));
    this.server.disable("x-powered-by");
    this.server.use(cors({ origin: "*" }));
    this.server.use(passport.initialize());
    this.server.set("socketio", this.socket);
  }
  routes() {
    this.server.use("/auth", this.authRoute.router);
    this.server.use("/users", this.usersRoute.router);
    this.server.use("/products", this.productsRouter.router);
    this.server.use("/files", this.filesRoute.router);
    this.server.use("/pages", this.pageRoute.router);
    this.server.use("/list", this.listRoute.router);
    this.server.use("/leads", this.leadsRoute.router);
    this.server.use("/leadSheet", this.leadsRoute.router);
    this.server.use("/complaints", this.complaintsRoute.router);
    this.server.use("/generate", this.generateRoute.router);
    this.server.use("/Form", this.formbuild.router);
    this.server.use("/bot", this.botWppRoute.router);
    //route webhook
    this.server.use("/webhook", this.webhook.router);
    //route graphql
    this.server.use("/graphql", this.graphqlRouter.router);
    this.server.get("/*", (req: Request, res: Response) => {
      res.sendFile(path.join(__dirname, "../client/build/index.html"));
    });
  }
}

const Application = new App();
const server = Application.httpServer;
export const SocketIo = Application.socket;
server.listen(PORT, () => console.log("open port: ", PORT));
