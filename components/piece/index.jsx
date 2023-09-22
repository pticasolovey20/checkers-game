import { classNames } from "@/utils";

const Piece = ({ player }) => {
	return <div className={classNames("w-full h-full rounded-full", player === 1 ? "bg-red-500" : "bg-blue-500")} />;
};

export default Piece;
