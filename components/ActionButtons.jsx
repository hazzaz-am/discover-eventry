"use client";
import { addInterestedEventId } from "@/app/actions";
import useAuth from "@/app/hooks/useAuth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

export default function ActionButtons({
	eventId,
	interested_ids,
	going_ids,
	fromDetails,
}) {
	const { auth } = useAuth();
	const router = useRouter();
	const [isPending, startTransition] = useTransition();
	const isInterested = interested_ids.find((id) => id === auth?.id);
	const going = going_ids.find((id) => id === auth?.id);
	const [interested, setInterested] = useState(isInterested);
	const [isGoing, setIsGoing] = useState(going);

	async function toggleEvent() {
		if (auth) {
			await addInterestedEventId(eventId, auth.id);
			setInterested(!interested);
		} else {
			router.push("/login");
		}
	}

	function onMarked() {
		if (auth) {
			router.push(`/payment/${eventId}`);
		} else {
			router.push("/login");
		}
	}

	return (
		<div className={`w-full flex gap-4 mt-4 ${fromDetails && "flex-1"}`}>
			<button
				onClick={() =>
					startTransition(() => {
						toggleEvent();
					})
				}
				className={`w-full hover:bg-indigo-800 ${
					interested && "bg-indigo-600"
				}`}
			>
				Interested
			</button>
			<button
				onClick={onMarked}
				disabled={auth && isGoing}
				className={`text-center w-full bg-[#464849] py-2 px-2 rounded-md border border-[#5F5F5F]/50 shadow-sm cursor-pointer hover:bg-[#3C3D3D] transition-colors active:translate-y-1 ${
					isGoing &&
					"bg-green-600 disabled:cursor-not-allowed disabled:hover:bg-green-600"
				}`}
			>
				Going
			</button>
		</div>
	);
}
