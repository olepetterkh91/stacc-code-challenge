import { useEffect, useState } from "react";
import { getPersonData } from "../api/api";
import { PersonProps } from "../components/Person/Person";

export function usePerson({ name = "", id = "" }) {
	const [person, setPerson] = useState<PersonProps>({} as PersonProps);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string>("");

	useEffect(() => {
		const fetchPerson = async () => {
			if (!name || name === undefined || name.trim() === "") {
				return setError("No name provided");
			}
			setIsLoading(true);
			const person = await getPersonData(name, id);
			setPerson(person);
			setIsLoading(false);
		};
		fetchPerson();
	}, [name]);

	return { person, isLoading, error };
}
