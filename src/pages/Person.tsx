import { Link, useParams } from "react-router-dom";
import MainContainer from "../components/Container/MainContainer";
import { getColor, getRiskLevel } from "../components/Person/Person";
import { usePerson } from "../hooks/usePerson";

function Person() {
	const { name } = useParams<{ name: string }>();
	const id: string =
		new URLSearchParams(window.location.search).get("id") || "";
	const { person, isLoading } = usePerson({ name, id });

	return (
		<MainContainer>
			<div className="my-3">
				<Link to="/">Back</Link>
			</div>

			<div className="card">
				<div className="card-body">
					{isLoading && <div className="loading">Loading...</div>}
					<div className="person__name font-weight-bold">
						{person?.name}
					</div>

					<div className="person__score">
						<span className="font-weight-bold">Score: </span>
						{person.score}{" "}
						<span className={`text-${getColor(person.score)}`}>
							({getRiskLevel(person.score)})
						</span>
					</div>
				</div>
			</div>
		</MainContainer>
	);
}
export default Person;
