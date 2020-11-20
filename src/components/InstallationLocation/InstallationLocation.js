import { useQuery } from "@apollo/react-hooks";
import { GET_NEAEREST_INSTALLATION } from "../../api/queries";
import LoadingIndicator from "../LoadingIndicator/LoadingIndicator";
import ErrorIndicator from "../ErrorIndicator/ErrorIndicator";

const InstallationLocation = (props) => {
  const { lat, lng } = props;

  const { loading, error, data } = useQuery(GET_NEAEREST_INSTALLATION, {
    variables: { lat, lng },
  });

  if (loading) return <LoadingIndicator />;
  if (error) return <ErrorIndicator error={error} />;

  return (
    <div
      style={{
        position: "absolute",
        bottom: "10px",
        right: "20px",
        textAlign: "center",
      }}
    >
      <span style={{ fontSize: "0.8rem" }}>
        {data.nearestInstallation[0] &&
          data.nearestInstallation[0].address.displayAddress1}
      </span>
      <br />
      <span style={{ fontSize: "0.7rem" }}>
        {data.nearestInstallation[0] &&
          data.nearestInstallation[0].address.displayAddress2}
      </span>
    </div>
  );
};

export default InstallationLocation;
