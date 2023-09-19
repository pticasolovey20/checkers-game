import { useDraggable } from "@dnd-kit/core";

const Draggable = ({ children, id }) => {
	const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });

	const style = transform ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` } : undefined;

	return (
		<button
			ref={setNodeRef}
			style={style}
			{...listeners}
			{...attributes}
			className="h-full w-full p-1.5 rounded-full bg-gray-300 overflow-hidden cursor-grab"
		>
			{children}
		</button>
	);
};

export default Draggable;
