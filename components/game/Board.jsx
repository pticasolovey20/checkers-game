import { useState } from "react";
import { DndContext } from "@dnd-kit/core";
import { classNames } from "@/utils";

import drag from "@/public/images/drag.png";

import Image from "next/image";
import Droppable from "@/components/droppable";
import Draggable from "@/components/draggable";

const Board = () => {
	const rows = 8;
	const cols = 8;

	const [parent, setParent] = useState("id-0-0");

	const square = <div className="aspect-square" />;
	const draggableMarkup = (
		<Draggable id="draggable">
			<Image className="aspect-square rounded-full" src={drag} alt="drag me" layout="fit" />
		</Draggable>
	);

	const handleDragEnd = (event) => setParent(event?.over && event?.over.id);

	const generateBoard = () => {
		const board = [];

		for (let i = 0; i < rows; i++) {
			for (let j = 0; j < cols; j++) {
				const isWhite = (i + j) % 2 === 0;
				const bgColor = isWhite ? "bg-white" : "bg-black/75";

				const cellId = `id-${i}-${j}`;
				const cellContent = parent === cellId ? draggableMarkup : square;

				board.push(
					<div key={cellId} className={`w-full h-full shadow-black/25 shadow-lg ${bgColor}`}>
						<Droppable id={cellId}>{cellContent}</Droppable>
					</div>
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
				<DndContext onDragEnd={handleDragEnd}>{generateBoard()}</DndContext>
			</div>
		</div>
	);
};

export default Board;
