import Image from "next/image";
import logo from "@/public/logo.svg";
import Link from "next/link";
import Authorization from "../modules/auth/Authorization";

export default function Navbar() {
	return (
		<nav>
			<div className="container flex justify-between items-center py-4">
				<div className="nav-brand">
					<Link href="/">
						<Image src={logo} alt="Eventry" className="h-[45px]" />
					</Link>
				</div>

				<ul className="flex gap-4 text-[#9C9C9C]">
					<Authorization />
					<Link href="/about">About</Link>
					<Link href="/contact">Contact Us</Link>
				</ul>
			</div>
		</nav>
	);
}
