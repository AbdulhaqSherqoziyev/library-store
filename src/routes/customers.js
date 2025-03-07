import { Router } from "express";
import { customerController } from "../controllers/index.js";

export const customerRouter = Router();

//create
customerRouter.post("/", customerController.create);

//get all
customerRouter.get("/", customerController.findAll);

//get one
customerRouter.get("/:id", customerController.findOne);

//update one
customerRouter.put("/:id", customerController.update);

//delete one
customerRouter.delete("/:id", customerController.delete);