import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/layouts/Navbar";
import { dbConnect } from "@/services/mongoose";
import AuthProvider from "./providers/AuthProvider";

const geistSans = localFont({
	src: "./fonts/GeistVF.woff",
	variable: "--font-geist-sans",
	weight: "100 900",
});
const geistMono = localFont({
	src: "./fonts/GeistMonoVF.woff",
	variable: "--font-geist-mono",
	weight: "100 900",
});

export const metadata = {
	title: "Eventry",
	description: "Discover events across the world!",
};

export default async function RootLayout({ children }) {
	/**
	 * mongodb connection with mongoose
	 */
	await dbConnect();
	return (
		<html lang="en">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<AuthProvider>
					<Navbar />
					{children}
				</AuthProvider>
			</body>
		</html>
	);
}
