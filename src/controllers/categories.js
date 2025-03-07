import {
	createCategory,
	deleteCategoy,
	getAllCategory,
	getCategoryById,
} from "../servies/index.js";

export const categoryController = {
	async create(req, res, next) {
		try {
			const body = req.body;
			const result = await createCategory(body);
			res.status(201).send(result);
		} catch (error) {
			next(error);
		}
	},
	async findAll(req, res, next) {
		try {
			const result = await getAllCategory();
			res.json(result);
		} catch (error) {
			next(error);
		}
	},
	async findOne(req, res, next) {
		try {
			const { id } = req.params;
			const result = await getCategoryById(id);
			res.json(result);
		} catch (error) {
			next(error);
		}
	},
	update(req, res, next) {
		try {
			console.log();
		} catch (error) {
			next(error);
		}
	},
	async delete(req, res, next) {
		try {
			const { id } = req.params;
			const result = await deleteCategoy(id);
			res.json(result);
		} catch (error) {
			next(error);
		}
	},
};
