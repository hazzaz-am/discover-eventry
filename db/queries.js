import { EventModel } from "@/models/event-model";
import { UserModel } from "@/models/user-model";
import {
	replaceMongoIdInArray,
	replaceMongoIdInObject,
} from "@/utils/data-util";

/**
 * The function `getAllEvents` retrieves all events from the database and replaces the MongoDB IDs with
 * a more user-friendly format.
 * @returns The `getAllEvents` function is returning all events from the database after converting them
 * to plain JavaScript objects and replacing the MongoDB `_id` with a standard `id` field.
 */
export async function getAllEvents() {
	const allEvents = await EventModel.find().lean();
	return replaceMongoIdInArray(allEvents);
}

/**
 * The function `getEventById` retrieves an event by its ID from a MongoDB database and replaces the
 * MongoDB ID with a more user-friendly format.
 * @param eventId - The `eventId` parameter is the unique identifier of the event that you want to
 * retrieve from the database.
 * @returns The `getEventById` function is returning an event object with the MongoDB ID replaced with
 * a more user-friendly format.
 */
export async function getEventById(eventId) {
	const event = await EventModel.findById(eventId).lean();
	return replaceMongoIdInObject(event);
}

/**
 * The function `createUser` asynchronously creates a new user using the data provided.
 * @param data - The `data` parameter in the `createUser` function likely contains the information
 * needed to create a new user. This could include details such as the user's username, email,
 * password, and any other relevant information required for creating a user in the system.
 */
export async function createUser(data) {
	await UserModel.create(data);
}

export async function findUserByCredentials(credentials) {
	const user = await UserModel.findOne(credentials).lean();

	if (user) {
		return replaceMongoIdInObject(user);
	}
	return null;
}
