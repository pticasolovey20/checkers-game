import { useDraggable } from "@dnd-kit/core";
import { classNames } from "@/utils";

const Draggable = ({ children, piece, active }) => {
	const { attributes, listeners, setNodeRef, transform } = useDraggable({ id: piece });

	const style = transform ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` } : undefined;

	return (
		<button
			ref={setNodeRef}
			style={style}
			{...listeners}
			{...attributes}
			className={classNames(
				"w-full h-full p-0.5 rounded-full overflow-hidden cursor-grab",
				active === piece.id ? "bg-yellow-400" : "bg-gray-400"
			)}
		>
			{children}
		</button>
	);
};

export default Draggable;
