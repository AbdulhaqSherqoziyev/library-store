import { Router } from "express";
import { categoryController } from "../controllers/index.js";

export const categoryRouter = Router();

//create
categoryRouter.post("/", categoryController.create);

//get all
categoryRouter.get("/", categoryController.findAll);

//get one
categoryRouter.get("/:id", categoryController.findOne);

//update one
categoryRouter.put("/:id", categoryController.update);

//delete one
categoryRouter.delete("/:id", categoryController.delete);
