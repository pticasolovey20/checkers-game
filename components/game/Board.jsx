import { useEffect, useState } from "react";
import { DndContext, MouseSensor, TouchSensor, useSensor, useSensors } from "@dnd-kit/core";
import { restrictToParentElement } from "@dnd-kit/modifiers";
import { classNames } from "@/utils";

import Droppable from "@/components/droppable";
import Draggable from "@/components/draggable";
import Piece from "../piece";

const initialFirstPlayerPositions = [
	{ id: "p1-1", row: 0, col: 1 },
	{ id: "p1-2", row: 0, col: 3 },
	{ id: "p1-3", row: 0, col: 5 },
	{ id: "p1-4", row: 0, col: 7 },
	{ id: "p1-5", row: 1, col: 0 },
	{ id: "p1-6", row: 1, col: 2 },
	{ id: "p1-7", row: 1, col: 4 },
	{ id: "p1-8", row: 1, col: 6 },
	{ id: "p1-9", row: 2, col: 1 },
	{ id: "p1-10", row: 2, col: 3 },
	{ id: "p1-11", row: 2, col: 5 },
	{ id: "p1-12", row: 2, col: 7 },
];

const initialSecondPlayerPositions = [
	{ id: "p2-1", row: 7, col: 0 },
	{ id: "p2-2", row: 7, col: 2 },
	{ id: "p2-3", row: 7, col: 4 },
	{ id: "p2-4", row: 7, col: 6 },
	{ id: "p2-5", row: 6, col: 1 },
	{ id: "p2-6", row: 6, col: 3 },
	{ id: "p2-7", row: 6, col: 5 },
	{ id: "p2-8", row: 6, col: 7 },
	{ id: "p2-9", row: 5, col: 0 },
	{ id: "p2-10", row: 5, col: 2 },
	{ id: "p2-11", row: 5, col: 4 },
	{ id: "p2-12", row: 5, col: 6 },
];

const Board = () => {
	const [firstPlayerPieces, setFirstPlayerPieces] = useState(initialFirstPlayerPositions);
	const [secondPlayerPieces, setSecondPlayerPieces] = useState(initialSecondPlayerPositions);

	const [containerWidth, setContainerWidth] = useState(0);

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

	const handleDrop = (event) => {
		const piece = event?.active?.id;
		const pieceId = piece.id;
		const player = pieceId.startsWith("p1") ? 1 : 2;

		const numbers = event.over.id.split("-").map(Number).slice(1);

		const row = numbers[0];
		const col = numbers[1];

		if (player === 1) {
			const updatedFirstPlayerPieces = firstPlayerPieces.filter((piece) => piece.id !== pieceId);
			updatedFirstPlayerPieces.push({ id: pieceId, row, col });
			setFirstPlayerPieces(updatedFirstPlayerPieces);
		} else if (player === 2) {
			const updatedSecondPlayerPieces = secondPlayerPieces.filter((piece) => piece.id !== pieceId);
			updatedSecondPlayerPieces.push({ id: pieceId, row, col });
			setSecondPlayerPieces(updatedSecondPlayerPieces);
		}
	};

	const mouseSensor = useSensor(MouseSensor, { activationConstraint: { distance: 10 } });
	const touchSensor = useSensor(TouchSensor, { activationConstraint: null });
	const sensors = useSensors(mouseSensor, touchSensor);

	const generateBoard = () => {
		const board = [];

		for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
			for (let colIndex = 0; colIndex < cols; colIndex++) {
				const isWhite = (rowIndex + colIndex) % 2 === 0;
				const bgColor = isWhite ? "bg-white" : "bg-black";

				const cellId = `p${rowIndex}-${colIndex}`;
				const cellSize = Math.min(containerWidth / cols, containerWidth / rows);

				const restrictions = {
					maxX: (cols - 1) * cellSize,
					maxY: (rows - 1) * cellSize,
					minX: 0,
					minY: 0,
				};

				const pieceInCell = (row, col) => {
					const firstPlayerPiece = firstPlayerPieces.find((piece) => piece.row === row && piece.col === col);
					const secondPlayerPiece = secondPlayerPieces.find(
						(piece) => piece.row === row && piece.col === col
					);

					if (firstPlayerPiece) {
						return (
							<Draggable piece={firstPlayerPiece} restrictions={restrictions}>
								<Piece player={1} />
							</Draggable>
						);
					} else if (secondPlayerPiece) {
						return (
							<Draggable piece={secondPlayerPiece} restrictions={restrictions}>
								<Piece player={2} />;
							</Draggable>
						);
					}
					return <div className="aspect-square" />;
				};

				board.push(
					<div key={cellId} className={`w-full h-full shadow-black/25 shadow-lg ${bgColor}`}>
						<Droppable id={`cell-${rowIndex}-${colIndex}`}>{pieceInCell(rowIndex, colIndex)}</Droppable>
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
					"board overflow-hidden",
					"grid grid-cols-8 grid-rows-8",
					"rounded-lg sm:rounded-xl"
				)}
			>
				<DndContext onDragEnd={handleDrop} sensors={sensors}>
					{generateBoard()}
				</DndContext>
			</div>
		</div>
	);
};

export default Board;
