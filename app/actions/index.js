"use server";

import {
	createUser,
	findUserByCredentials,
	getEventById,
	updateGoing,
	updateInterest,
} from "@/db/queries";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Resend } from "resend";

/**
 * The function `registerUser` takes form data, creates a user with the data, and then redirects to the
 * login page.
 * @param formData - The `formData` parameter in the `registerUser` function likely contains user input
 * data such as username, email, password, etc. This data is then converted into an object using
 * `Object.fromEntries(formData)` before being passed to the `createUser` function to create a new
 * user. Finally,
 */
export async function registerUser(formData) {
	const data = Object.fromEntries(formData);
	await createUser(data);
	redirect("/login");
}

/**
 * The function performLogin takes form data, extracts email and password, finds a user with those
 * credentials, and returns the user data.
 * @param formData - The `formData` parameter in the `performLogin` function likely contains user input
 * data from a login form. It is expected to be an object that allows access to form data using the
 * `get` method, typically obtained from an HTML form using the `FormData` constructor. This data
 * usually includes the email and password.
 * @returns The `performLogin` function is returning the data found by `findUserByCredentials` function
 * after attempting to log in with the provided email and password.
 */
export async function performLogin(formData) {
	try {
		const credentials = {};
		credentials.email = formData.get("email");
		credentials.password = formData.get("password");
		const foundData = await findUserByCredentials(credentials);

		return foundData;
	} catch (error) {
		throw error;
	}
}

export async function addInterestedEventId(eventId, authId) {
	try {
		await updateInterest(eventId, authId);
		revalidatePath("/");
	} catch (error) {
		throw error;
	}
}

export async function addGoingIds(eventId, auth) {
	try {
		await updateGoing(eventId, auth.id);
		await sendEmail(eventId, auth);
	} catch (error) {
		throw error;
	}
	revalidatePath("/");
	redirect("/");
}

export async function sendEmail(eventId, user) {
	try {
		const event = await getEventById(eventId);
		const resend = new Resend(process.env.RESEND_API_KEY);
		const message = `Dear ${user?.name}, you have been successfully registered for the event, ${event?.name}. Please carry this email and your official id to the venue. We are excited to have you here.`;

		await resend.emails.send({
			from: "onboarding@resend.dev",
			to: user?.email,
			subject: "Successfully Registered for the event!",
			text: message,
		});
	} catch (error) {
		throw error;
	}
}
