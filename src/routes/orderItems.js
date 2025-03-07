import { Router } from 'express';
import { orderItemController } from '../controllers/index.js';

export const orderItemRouter = Router();

//create
orderItemRouter.post('/', orderItemController.create);

//get all
orderItemRouter.get('/', orderItemController.findAll);

//get one
orderItemRouter.get('/:id', orderItemController.findOne);

//update one
orderItemRouter.put('/:id', orderItemController.update);

//delete one
orderItemRouter.delete('/:id', orderItemController.delete);