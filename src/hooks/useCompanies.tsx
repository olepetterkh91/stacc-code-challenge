import { useEffect, useState } from "react";
import { getCompanies } from "../api/api";
import { CompanyProps } from "../components/Company/Company";

export function useCompanies({ page }: { page: number }) {
	const [companies, setCompanies] = useState<CompanyProps[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);

	useEffect(() => {
		async function fetchCompanies() {
			setLoading(true);
			try {
				const companies = await getCompanies(page);
				console.log(companies);
				setCompanies(companies);
			} catch (error) {
				setError(true);
			}
			setLoading(false);
		}
		fetchCompanies();
	}, [page]);

	return { companies, loading, error };
}
