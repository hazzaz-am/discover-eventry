import Details from "@/components/modules/event-details/Details";
import EventVanue from "@/components/modules/event-details/EventVanue";
import HeroSection from "@/components/modules/event-details/HeroSection";

export default function EventDetailPage() {
	return (
		<>
			<HeroSection />
			<section className="container">
				<div className="grid grid-cols-5 gap-12 my-12">
					<Details />
					<EventVanue />
				</div>
			</section>
		</>
	);
}
