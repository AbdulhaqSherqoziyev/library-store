import { Router } from "express";
import { authorController } from "../controllers/index.js";

export const authorRouter = Router();

//create
authorRouter.post("/", authorController.create);

//get all
authorRouter.get("/", authorController.findAll);

//get one
authorRouter.get("/:id", authorController.findOne);

//update one
authorRouter.put("/:id", authorController.update);

//delete one
authorRouter.delete("/:id", authorController.delete);
