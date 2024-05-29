import { fetchMonstersPages } from "@/lib/data";
import MonsterTable from "@/app/ui/monsters/monsterTable";
import Pagination from "@/app/ui/monsters/pagination";
import Search from "@/app/ui/monsters/search";
import { Suspense } from "react";
import { MonsterTableSkeleton } from "@/app/ui/skeletons";

export default async function Page({
	searchParams,
}: {
	searchParams?: {
		query?: string;
		page?: string;
	};
}) {
	const query = searchParams?.query || "";
	const currentPage = Number(searchParams?.page) || 1;
	const totalPages = (await fetchMonstersPages(query)) as number;

	return (
		<main>
			<div className="w-full">
				<Search placeholder="Search Monsters..." />
			</div>
			<div className="my-4">
				<h1 className="text-xl md:text-2xl">Monsters</h1>
				<Suspense fallback={<MonsterTableSkeleton />}>
					<MonsterTable query={query} currentPage={currentPage} />
				</Suspense>
			</div>
			<div className="mt-5 flex w-full justify-center">
				<Pagination totalPages={totalPages} />
			</div>
		</main>
	);
}
