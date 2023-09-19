import { classNames } from "@/utils";

const Board = () => {
	const rows = 8;
	const cols = 8;

	const generateBoard = () => {
		const board = [];

		for (let i = 0; i < rows; i++) {
			for (let j = 0; j < cols; j++) {
				const isWhite = (i + j) % 2 === 0;
				const bgColor = isWhite ? "bg-white" : "bg-black/75";

				board.push(
					<div
						key={`cell-${i}-${j}`}
						className={classNames("w-full h-full shadow-black/25 shadow-lg", bgColor)}
					/>
				);
			}
		}

		return board;
	};

	return (
		<div className="p-2 sm:p-4 rounded-xl sm:rounded-3xl bg-gray-300 shadow-black/25 shadow-lg">
			<div
				className={classNames(
					"aspect-square overflow-hidden",
					"grid grid-cols-8 grid-rows-8",
					"rounded-lg sm:rounded-xl"
				)}
			>
				{generateBoard()}
			</div>
		</div>
	);
};

export default Board;
