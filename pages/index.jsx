import Layout from "@/components/layout";
import Score from "@/components/game/Score";
import Board from "@/components/game/Board";

const Home = () => {
	return (
		<Layout>
			<div className="flex flex-col gap-4">
				<Score />
				<Board />
			</div>
		</Layout>
	);
};

export default Home;
