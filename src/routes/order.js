import { Router } from 'express';
import { orderController } from '../controllers/index.js';

export const orderRouter = Router();

//create
orderRouter.post('/', orderController.create);

//get all
orderRouter.get('/', orderController.findAll);

//get one
orderRouter.get('/:id', orderController.findOne);

//update one
orderRouter.put('/:id', orderController.update);

//delete one
orderRouter.delete('/:id', orderController.delete);


