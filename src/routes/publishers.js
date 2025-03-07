import { Router } from "express";
import { publisherController } from "../controllers/index.js";

export const publisherRouter = Router();

//create
publisherRouter.post("/", publisherController.create);

//get all
publisherRouter.get("/", publisherController.findAll);

//get one
publisherRouter.get("/:id", publisherController.findOne);

//update one
publisherRouter.put("/:id", publisherController.update);

//delete one
publisherRouter.delete("/:id", publisherController.delete);