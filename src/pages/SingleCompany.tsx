import { useParams } from "react-router-dom";
import SingleCompany from "../components/Company/SingleCompany";
import MainContainer from "../components/Container/MainContainer";

function SingleCompanyPage() {
	const { orgNr } = useParams<{ orgNr: string }>();

	return (
		<MainContainer>
			<SingleCompany orgNr={orgNr} />
		</MainContainer>
	);
}
export default SingleCompanyPage;
