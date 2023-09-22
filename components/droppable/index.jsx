import { useDroppable } from "@dnd-kit/core";

const Droppable = ({ children, id }) => {
	const { setNodeRef } = useDroppable({ id });

	return (
		<div ref={setNodeRef} className="w-full h-full p-1">
			{children}
		</div>
	);
};

export default Droppable;
