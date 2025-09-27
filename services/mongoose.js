import mongoose from "mongoose";

export async function dbConnect() {
	try {
		const connection = await mongoose.connect(process.env.MONGO_URI);
		console.log("DB connected successfully ✅");
		return connection;
	} catch (error) {
		console.log("DB connection failed for: -----", error);
	}
}
