import { useEffect, useState } from "react";
import { searchPersons } from "../api/api";
import { PersonProps } from "../components/Person/Person";

export const useSearch = ({ searchTerm }: { searchTerm: string }) => {
	const [data, setData] = useState<PersonProps[]>([]);
	const [resultCount, setResultCount] = useState<number>(0);
	const [isLoading, setIsloading] = useState<boolean>(false);
	const [error, setError] = useState<string>("");
	const [requestCount, setRequestCount] = useState<number>(0);

	useEffect(() => {
		async function searchData() {
			setError("");
			if (
				!searchTerm ||
				searchTerm === undefined ||
				searchTerm.trim() === ""
			) {
				return setError("No search term provided");
			}
			const data = await searchPersons(searchTerm);
			setData(data.hits);
			setResultCount(data.numberOfHits);
			setIsloading(false);
		}
		searchData();
	}, [requestCount]);

	useEffect(() => {
		setIsloading(true);
		const searchTimeout = setTimeout(() => {
			if (searchTerm.trim().length > 0 && searchTerm.length > 2) {
				setRequestCount((prev) => prev + 1);
			}
		}, 500);

		return () => {
			setIsloading(false);
			clearTimeout(searchTimeout);
		};
	}, [searchTerm]);

	return {
		data,
		resultCount,
		error,
		isLoading,
	};
};
