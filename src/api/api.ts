import { PersonProps } from "../components/Person/Person";
import { BASE_URL } from "../constants/constants";


export async function getData(url: string): Promise<any> {
    try {
        const response = await fetch(url);
        return response.json();
    } catch (error) {
        return error;
    }
}

export async function getPersonData(name: string, id: string): Promise<PersonProps> {
    const response = await getData(`${BASE_URL}/pep?name=${name}`);
    const person = response.hits.find((person: PersonProps) => person.id === id);
    return person;
}

export async function getCompanyData(orgNr: number | string): Promise<any> {
    return getData(`${BASE_URL}/enheter?orgNr=${orgNr}`);
}

export async function searchPersons(name: string): Promise<any> {
    return getData(`${BASE_URL}/pep?name=${name}`);
}

export async function getCompanyRoles(orgNr: number | string = "988971375"): Promise<any> {
    return getData(`${BASE_URL}/roller?orgNr=${orgNr}`);
}

export async function getCompanies(page = 1): Promise<any> {
    const URL = "https://data.brreg.no/enhetsregisteret/api/enheter?page=" + page + "&size=10   ";
    const response = await getData(URL);
    const companies = response._embedded.enheter;
    return companies
}