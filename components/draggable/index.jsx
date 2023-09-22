import { useDraggable } from "@dnd-kit/core";

const Draggable = ({ children, piece }) => {
	const { attributes, listeners, setNodeRef, transform } = useDraggable({ id: piece });

	const style = transform ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` } : undefined;

	return (
		<button
			ref={setNodeRef}
			style={style}
			{...listeners}
			{...attributes}
			className="w-full h-full p-1.5 rounded-full bg-gray-300 overflow-hidden cursor-grab"
		>
			{children}
		</button>
	);
};

export default Draggable;
