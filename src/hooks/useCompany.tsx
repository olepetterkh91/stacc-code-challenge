import { useEffect, useState } from "react";
import { getCompanyData, getCompanyRoles } from "../api/api";
import { CompanyProps } from "../components/Company/Company";

export const useCompany = ({ orgNr }: { orgNr: string }) => {
	console.log(orgNr, "orgNr");
	const [company, setCompany] = useState<CompanyProps>({} as CompanyProps);
	const [roles, setRoles] = useState<CompanyProps>({} as CompanyProps);
	const [isLoading, setIsloading] = useState<boolean>(false);

	useEffect(() => {
		async function getCompany() {
			setIsloading(true);
			const data = await getCompanyData(orgNr);
			const roles = await getCompanyRoles(orgNr);
			setRoles(roles);
			setCompany(data);
			setIsloading(false);
		}
		getCompany();
	}, []);

	return {
		company,
		roles,
		isLoading,
	};
};
