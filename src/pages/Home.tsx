import { Link } from "react-router-dom";
import MainContainer from "../components/Container/MainContainer";
import Search from "../components/Search/Search";

function Home() {
	return (
		<MainContainer>
			<div>
				<h1>Stacc Code Challenge</h1>
				<Link to="/company">Company</Link>
			</div>

			<Search />
		</MainContainer>
	);
}
export default Home;
