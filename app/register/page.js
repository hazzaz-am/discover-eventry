import Link from "next/link";

export default function RegistrationPage() {
	return (
		<section className="h-screen grid place-items-center">
			<div className="max-w-[450px] w-full mx-auto p-6 border border-gray-700/20 rounded-md">
				<h4 className="font-bold text-2xl">Register</h4>
				<form className="login-form">
					<div>
						<label htmlFor="name">Full Name</label>
						<input type="text" name="name" id="name" />
					</div>
					<div>
						<label htmlFor="email">Email Address</label>
						<input type="email" name="email" id="email" />
					</div>
					<div>
						<label htmlFor="password">Password</label>
						<input type="password" name="password" id="password" />
					</div>
					<div>
						<label htmlFor="phone">Phone Number</label>
						<input type="tel" name="pnone" id="phone" />
					</div>
					<div>
						<label htmlFor="bio">Bio</label>
						<input className="min-h-16" type="text" name="bio" id="bio" />
					</div>

					<button
						type="submit"
						className="btn-primary w-full mt-4 bg-indigo-600 hover:bg-indigo-800"
					>
						Register
					</button>
				</form>

				<span className="text-center text-xs text-gray-500">
					Already have an account?
					<Link className="underline hover:text-indigo-600" href="/login">
						Login
					</Link>
				</span>
			</div>
		</section>
	);
}
