import { classNames } from "@/utils";

const Score = () => {
	return (
		<div
			className={classNames(
				"h-24 bg-gray-300 shadow-black/25 shadow-lg",
				"p-2 sm:p-4",
				"rounded-xl sm:rounded-2xl"
			)}
		>
			<div
				className={classNames(
					"w-full h-full overflow-hidden",
					"rounded-lg sm:rounded-xl",
					"bg-white shadow-black/25 shadow-lg"
				)}
			/>
		</div>
	);
};

export default Score;
