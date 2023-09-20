import { useEffect, useState } from "react";
import { DndContext, useSensor, TouchSensor } from "@dnd-kit/core";
import { classNames } from "@/utils";

import drag from "@/public/images/drag.png";

import Image from "next/image";
import Droppable from "@/components/droppable";
import Draggable from "@/components/draggable";

const Board = () => {
	const [containerWidth, setContainerWidth] = useState(0);
	const [parent, setParent] = useState("id-0-0");

	const rows = 8;
	const cols = 8;

	useEffect(() => {
		const updateContainerWidth = () => {
			const containerElement = document.querySelector(".board");
			if (containerElement) {
				const containerStyles = getComputedStyle(containerElement);
				const width = parseInt(containerStyles.width, 10);
				setContainerWidth(width);
			}
		};

		updateContainerWidth();

		window.addEventListener("resize", updateContainerWidth);
		return () => window.removeEventListener("resize", updateContainerWidth);
	}, []);

	const handleDragEnd = (event) => setParent(event?.over && event?.over.id);

	const sensor = useSensor(TouchSensor, { activationConstraint: null });

	const generateBoard = () => {
		const board = [];

		for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
			for (let colIndex = 0; colIndex < cols; colIndex++) {
				const isWhite = (rowIndex + colIndex) % 2 === 0;
				const bgColor = isWhite ? "bg-white" : "bg-black/75";

				const cellSize = Math.min(containerWidth / cols, containerWidth / rows);

				const restrictions = {
					maxX: (cols - 1) * cellSize,
					maxY: (rows - 1) * cellSize,
					minX: 0,
					minY: 0,
				};

				const cellId = `id-${rowIndex}-${colIndex}`;
				const cellContent =
					parent === cellId ? (
						<Draggable id="draggable" restrictions={restrictions}>
							<Image className="aspect-square rounded-full" src={drag} alt="drag me" layout="fit" />
						</Draggable>
					) : (
						<div className="aspect-square" />
					);

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
					"board aspect-square overflow-hidden",
					"grid grid-cols-8 grid-rows-8",
					"rounded-lg sm:rounded-xl"
				)}
			>
				<DndContext onDragEnd={handleDragEnd} sensors={[sensor]}>
					{generateBoard()}
				</DndContext>
			</div>
		</div>
	);
};

export default Board;
