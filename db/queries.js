import { EventModel } from "@/models/event-model";
import { replaceMongoIdInArray, replaceMongoIdInObject } from "@/utils/data-util";

export async function getAllEvents() {
	const allEvents = await EventModel.find().lean();
	return replaceMongoIdInArray(allEvents);
}

export async function getEventById(eventId) {
	const event = await EventModel.findById(eventId).lean()
	return replaceMongoIdInObject(event);
}
