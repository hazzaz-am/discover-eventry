import EventList from "@/components/modules/home/EventList";
import Header from "@/components/modules/home/Header";

export default function HomePage() {
	return (
		<main className="py-8">
			<section className="container">
				<Header />
				<EventList />
			</section>
		</main>
	);
}
