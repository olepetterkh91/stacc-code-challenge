import { Link } from "react-router-dom";

export type PersonProps = {
	id: string;
	name: string;
	email: string;
	score: number;
	birth_date: string;
	countries: string;
};

export function getRiskLevel(score: number) {
	if (score < 0.1) {
		return "Low";
	} else if (score < 0.3) {
		return "Medium";
	} else if (score < 0.5) {
		return "High";
	} else {
		return "Very High";
	}
}

export function getColor(score: number) {
	if (score < 0.1) {
		return "success";
	} else if (score < 0.3) {
		return "warning";
	} else if (score < 0.5) {
		return "danger";
	} else {
		return "dark";
	}
}

function Person({ person }: { person: PersonProps }) {
	return (
		<div className="card">
			<div className="card-body">
				<div className="person__name font-weight-bold">
					<Link to={`/person/${person?.name}?id=${person.id}`}>
						{person.name}
					</Link>
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
	);
}
export default Person;
