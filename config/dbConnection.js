import mongoose from "mongoose";
import chalk from "chalk";

const connectDB = async () => {
	try {
		const connect = await mongoose.connect(process.env.MONGO_URI);
		console.log(chalk.magentaBright.underline.bold(`Database connected: ${connect.connection.host} ${connect.connection.name}`));
	} catch (error) {
		console.log(chalk.redBright.underline.bold(error));
		process.exit(1);
	}
};

export default connectDB;
