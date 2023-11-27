import express from "express";
import chalk from "chalk";
import dotenv from "dotenv";

dotenv.config();

import contactRoutes from "./routes/contactRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import errorHandler from "./middleware/errorHandler.js";
import connectDB from "./config/dbConnection.js";

const port = process.env.PORT || 5001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/contacts", contactRoutes);
app.use("/api/users", userRoutes);
app.use(errorHandler);

const connect = async () => {
	try {
		await connectDB();
		app.listen(port, () => {
			console.log(chalk.magentaBright.underline.bold(`Server running on port ${port}`));
		});
	} catch (error) {
		console.log(chalk.magentaBright.underline.bold(error));
	}
};

connect();
