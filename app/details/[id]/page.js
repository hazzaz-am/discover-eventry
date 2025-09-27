import Details from "@/components/modules/event-details/Details";
import EventVenue from "@/components/modules/event-details/EventVenue";
import HeroSection from "@/components/modules/event-details/HeroSection";
import { getEventById } from "@/db/queries";

export async function generateMetadata({ params: { id } }) {
	const eventInfo = await getEventById(id);


	return {
		title: eventInfo?.name,
		description: eventInfo?.details
	}
}

export default async function EventDetailPage({ params: { id } }) {
	const eventInfo = await getEventById(id);
	return (
		<>
			<HeroSection eventInfo={eventInfo} />
			<section class="container">
				<div class="grid grid-cols-5 gap-12 my-12">
					<Details details={eventInfo?.details} swags={eventInfo?.swags} />
					<EventVenue location={eventInfo?.location} />
				</div>
			</section>
		</>
	);
}
