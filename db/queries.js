import { EventModel } from "@/models/event-model";
import { UserModel } from "@/models/user-model";
import {
	replaceMongoIdInArray,
	replaceMongoIdInObject,
} from "@/utils/data-util";
import mongoose from "mongoose";

/**
 * The function `getAllEvents` retrieves all events from the database and replaces the MongoDB IDs with
 * a more user-friendly format.
 * @returns The `getAllEvents` function is returning all events from the database after converting them
 * to plain JavaScript objects and replacing the MongoDB `_id` with a standard `id` field.
 */
export async function getAllEvents(query) {
	let allEvents = [];
	if (query) {
		const regex = new RegExp(query, "i");
		allEvents = await EventModel.find({ name: { $regex: regex } }).lean();
	} else {
		allEvents = await EventModel.find().lean();
	}
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

/**
 * The function `findUserByCredentials` searches for a user in the database based on the provided
 * credentials and returns the user object with the MongoDB ID replaced.
 * @param credentials - The `credentials` parameter likely contains the information needed to find a
 * user in the database, such as username and password. This information is used to query the
 * `UserModel` to find a matching user. If a user is found, the function `replaceMongoIdInObject` is
 * called to replace
 * @returns If a user is found in the database based on the provided credentials, the function will
 * return the user object after replacing the MongoDB ID with a more user-friendly representation. If
 * no user is found, the function will return `null`.
 */

export async function findUserByCredentials(credentials) {
	const user = await UserModel.findOne(credentials).lean();

	if (user) {
		return replaceMongoIdInObject(user);
	}
	return null;
}

export async function updateInterest(eventId, authId) {
	const event = await EventModel.findById(eventId);

	if (event) {
		const findUser = event.interested_ids.find(
			(id) => id.toString() === authId
		);

		if (findUser) {
			event.interested_ids.pull(authId);
		} else {
			event.interested_ids.push(authId);
		}
	}

	event.save();
}

export async function updateGoing(eventId, authId) {
	const event = await EventModel.findById(eventId);
	event.going_ids.push(authId);
	event.save();
}
