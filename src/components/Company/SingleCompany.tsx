import { Link } from "react-router-dom";
import { useCompany } from "../../hooks/useCompany";

function SingleCompany({ orgNr }: { orgNr: string }) {
	const { company, roles, isLoading } = useCompany({ orgNr });

	console.log(roles, "roles");

	return (
		<div>
			<Link to="/company">Back</Link>
			{isLoading && <div>Loading...</div>}
			{!isLoading && (
				<>
					<h1>{company.navn}</h1>
					<div>{company.email}</div>
					<div>OrgNr: {company.organisasjonsnummer}</div>
				</>
			)}
		</div>
	);
}
export default SingleCompany;
