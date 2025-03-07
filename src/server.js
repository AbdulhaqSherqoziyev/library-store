import express from "express";
import { setUp } from "./servies/setup.js";
import { bookRouter, authorRouter, categoryRouter, customerRouter, orderRouter, orderItemRouter, publisherRouter } from "./routes/index.js";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

app.use("/setup", (req, res, next) => {
	setUp();
});

app.use("/books", bookRouter);
app.use("/authors", authorRouter);
app.use("/categories", categoryRouter);
app.use("/customers", customerRouter);
app.use("/orders", orderRouter);
app.use("/orderitems", orderItemRouter);
app.use("/publishers", publisherRouter);

//error handler
app.use((err, req, res, next) => {
	if (err) {
		res.send(err);
	}

	res.status(500).send("server error");
});

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
