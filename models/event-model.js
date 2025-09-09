import mongoose, { Schema } from "mongoose";

const eventSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	details: {
		type: String,
		required: true,
	},
	location: {
		type: String,
		required: true,
	},
	imageUrl: {
		type: String,
		required: true,
	},
	interested_ids: {
		type: Array,
	},
	going_ids: {
		type: Array,
	},
	swags: {
		type: Array,
	},
});

export const EventModel = mongoose.models.events ?? mongoose.model("events", eventSchema);
