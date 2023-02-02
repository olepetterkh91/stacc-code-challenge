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
	const [limit, setLimit] = useState<number>(10);

	useEffect(() => {
		if (data !== undefined) {
			const sorted = data.sort((a: PersonProps, b: PersonProps) => {
				return b.score - a.score;
			});
			const sliced = sorted.slice(0, limit);
			setSortedByScore(sliced);
		}
	}, [data, limit]);

	useEffect(() => {
		return () => {
			localStorage.setItem("searchTerm", searchTerm);
		};
	}, [searchTerm]);

	useEffect(() => {
		setLimit(10);
	}, [isLoading]);

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

			<div className="my-4">
				<button
					className="btn btn-primary btn-block btn-lg"
					onClick={() => setLimit(limit + 10)}
				>
					Load more
				</button>
			</div>
		</>
	);
}
export default Search;
