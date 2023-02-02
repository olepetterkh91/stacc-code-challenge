import { useEffect, useState } from "react";
import { PersonProps } from "../components/Person/Person";

export const usePersons = () => {
	const [persons, setPersons] = useState<PersonProps[]>([]);

	useEffect(() => {
		fetch("https://staccflow.com/technical-task/persons")
			.then((response) => response.json())
			.then((data) => {
				setPersons(data);
			});
	}, []);

	return persons;
};
