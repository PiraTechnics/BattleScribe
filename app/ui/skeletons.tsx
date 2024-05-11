// Loading animation
const shimmer =
	"before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent";

export function MonsterTableSkeleton() {
	return (
		<div
			className={`${shimmer} relative flex w-full flex-col overflow-hidden md:col-span-4 mt-2`}
		>
			<div className="flex grow flex-col justify-between rounded-xl bg-gray-100 p-4">
				<div className="bg-white px-6">
					<MonsterTableEntrySkeleton />
					<MonsterTableEntrySkeleton />
					<MonsterTableEntrySkeleton />
					<MonsterTableEntrySkeleton />
					<MonsterTableEntrySkeleton />
					<MonsterTableEntrySkeleton />
				</div>
			</div>
		</div>
	);
}

function MonsterTableEntrySkeleton() {
	return (
		<div className="flex flex-row items-center justify-between border-b border-gray-100 py-4">
			<div className="gird items-center">
				<div className="h-5 w-40 rounded-md bg-gray-200" />
			</div>
		</div>
	);
}
