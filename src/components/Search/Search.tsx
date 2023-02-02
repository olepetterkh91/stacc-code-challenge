import { useEffect, useState } from "react";
import { useSearch } from "../../hooks/useSearch";
import Loader from "../Loader/Loader";
import Person, { PersonProps } from "../Person/Person";

function Search() {
	const [searchTerm, setSearchTerm] = useState<string>(
		localStorage.getItem("searchTerm") || ""
	);
	const { data, error, isLoading, resultCount } = useSearch({ searchTerm });

	const [sortedByScore, setSortedByScore] = useState<PersonProps[]>([]);

	useEffect(() => {
		if (data !== undefined) {
			const sorted = data.sort((a: PersonProps, b: PersonProps) => {
				return b.score - a.score;
			});
			setSortedByScore(sorted);
		}
	}, [data]);

	useEffect(() => {
		return () => {
			localStorage.setItem("searchTerm", searchTerm);
		};
	}, [searchTerm]);

	function searchHandler(e: React.ChangeEvent<HTMLInputElement>) {
		setSearchTerm(e.target.value);
	}

	return (
		<>
			<div className="search">
				<label className="search__label" htmlFor="search">
					Search
				</label>
				<input
					className="form-control search__input"
					type="text"
					onChange={searchHandler}
					value={searchTerm}
					placeholder="Search for persons"
				/>
			</div>

			{error && <div className="error">{error}</div>}
			{isLoading && searchTerm.trim().length > 2 && <Loader />}
			{!isLoading && resultCount === 0 && (
				<div className="no-results">No results</div>
			)}

			{resultCount > 0 && (
				<div className="my-4">Result count: {resultCount}</div>
			)}

			{sortedByScore !== undefined &&
				sortedByScore?.length > 0 &&
				sortedByScore?.map((person: PersonProps) => (
					<Person person={person} />
				))}
		</>
	);
}
export default Search;
