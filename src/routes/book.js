import { Router } from "express";
import { bookController } from "../controllers/index.js";

export const bookRouter = Router();

//create
bookRouter.post("/", bookController.create);

//get all
bookRouter.get("/", bookController.findAll);

//get one
bookRouter.get("/:id", bookController.findOne);

//update one
bookRouter.put("/:id", bookController.update);

//delete one
bookRouter.delete("/:id", bookController.delete);
