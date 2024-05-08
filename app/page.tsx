import dbConnect from "@/lib/db";

export default function Home() {
	dbConnect();

	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			<div className="text-xl">Hello World!</div>
		</main>
	);
}
