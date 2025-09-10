"use server";

import { createUser, findUserByCredentials } from "@/db/queries";
import { redirect } from "next/navigation";

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
