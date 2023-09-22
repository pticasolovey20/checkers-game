import { useState } from "react";
import { DndContext, MouseSensor, TouchSensor, useSensor, useSensors } from "@dnd-kit/core";
import { restrictToParentElement } from "@dnd-kit/modifiers";

import Droppable from "@/components/droppable";
import Draggable from "@/components/draggable";
import Piece from "./Piece";

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

	const [active, setActive] = useState("");

	const rows = 8;
	const cols = 8;

	const handleDrop = (event) => {
		const piece = event?.active?.id;
		const pieceId = piece.id;
		const player = pieceId.startsWith("p1") ? 1 : 2;

		if (event?.over) {
			const [row, col] = event.over.id.split("-").map(Number).slice(1);
			const isWhiteCell = (row + col) % 2 === 0;

			if (isWhiteCell) {
				setActive("");
				return;
			}

			const isCellOccupied = (_, pieces) => pieces.some((piece) => piece.row === row && piece.col === col);

			const opponentPlayer = player === 1 ? 2 : 1;
			const playerPieces = player === 1 ? firstPlayerPieces : secondPlayerPieces;
			const opponentPieces = opponentPlayer === 1 ? firstPlayerPieces : secondPlayerPieces;

			if (isCellOccupied(player, playerPieces) || isCellOccupied(opponentPlayer, opponentPieces)) {
				setActive("");
				return;
			}

			if (player === 1) {
				const updatedFirstPlayerPieces = firstPlayerPieces.filter((piece) => piece.id !== pieceId);
				updatedFirstPlayerPieces.push({ id: pieceId, row, col });
				setFirstPlayerPieces(updatedFirstPlayerPieces);
			} else if (player === 2) {
				const updatedSecondPlayerPieces = secondPlayerPieces.filter((piece) => piece.id !== pieceId);
				updatedSecondPlayerPieces.push({ id: pieceId, row, col });
				setSecondPlayerPieces(updatedSecondPlayerPieces);
			}

			setActive("");
		}

		setActive("");
	};

	const mouseSensor = useSensor(MouseSensor, { activationConstraint: { distance: 10 } });
	const touchSensor = useSensor(TouchSensor, { activationConstraint: null });
	const sensors = useSensors(mouseSensor, touchSensor);

	const generateBoard = () => {
		const board = [];

		for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
			for (let colIndex = 0; colIndex < cols; colIndex++) {
				const isWhite = (rowIndex + colIndex) % 2 === 0;
				const bgColor = isWhite ? "bg-white" : "bg-black/75";

				const cellId = `cell-${rowIndex}-${colIndex}`;

				const pieceInCell = (row, col) => {
					const firstPlayerPiece = firstPlayerPieces.find((piece) => piece.row === row && piece.col === col);
					const secondPlayerPiece = secondPlayerPieces.find(
						(piece) => piece.row === row && piece.col === col
					);

					if (firstPlayerPiece) {
						return (
							<Draggable piece={firstPlayerPiece} modifiers={[restrictToParentElement]} active={active}>
								<Piece player={1} />
							</Draggable>
						);
					} else if (secondPlayerPiece) {
						return (
							<Draggable piece={secondPlayerPiece} modifiers={[restrictToParentElement]} active={active}>
								<Piece player={2} />
							</Draggable>
						);
					}
					return <div className="aspect-square" />;
				};

				board.push(
					<div key={cellId} role="gridcell" className={`w-full h-full ${bgColor}`}>
						<Droppable id={cellId}>{pieceInCell(rowIndex, colIndex)}</Droppable>
					</div>
				);
			}
		}

		return board;
	};

	return (
		<div className="p-2 rounded-lg bg-gray-400">
			<div
				role="grid"
				className="board grid grid-cols-8 grid-rows-8 rounded-md overflow-hidden shadow-black/25 shadow-lg"
			>
				<DndContext
					onDragEnd={handleDrop}
					onDragStart={(event) => setActive(event.active.id.id)}
					sensors={sensors}
				>
					{generateBoard()}
				</DndContext>
			</div>
		</div>
	);
};

export default Board;
