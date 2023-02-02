import { useState } from "react";
import { Link } from "react-router-dom";
import { useCompanies } from "../../hooks/useCompanies";
import Loader from "../Loader/Loader";

export type CompanyProps = {
	navn: string;
	email: string;
	organisasjonsnummer: string;
};

function Company() {
	const [page, setPage] = useState<number>(1);
	const { companies, loading } = useCompanies({ page });

	return (
		<div>
			<Link to="/">Back</Link>

			<h1>Companies</h1>

			{loading && <Loader />}
			{!loading &&
				companies?.map((company) => (
					<div key={company.organisasjonsnummer}>
						<Link to={`/company/${company.organisasjonsnummer}`}>
							{company.navn}
						</Link>

						<div>{company.email}</div>

						<div>{company.organisasjonsnummer}</div>
					</div>
				))}

			<div className="my-3">
				<button
					className="btn btn-primary"
					onClick={() => setPage((page) => (page > 1 ? page - 1 : 1))}
				>
					Previous
				</button>
				<div style={{ display: "inline-block", margin: "0 10px" }}>
					{page}
				</div>
				<button
					className="btn btn-primary"
					onClick={() => setPage(page + 1)}
				>
					Next
				</button>
			</div>
		</div>
	);
}
export default Company;
