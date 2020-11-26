import { GET_NEAEREST_INSTALLATION } from "../../api/queries";
import LoadingIndicator from "../LoadingIndicator/LoadingIndicator";
import ErrorIndicator from "../ErrorIndicator/ErrorIndicator";
import { useCachedData } from "../../hooks/hooks";

const styles = {
  installationLocationContainer: {
    position: "absolute",
    bottom: "10px",
    right: "20px",
    textAlign: "right",
  },
};
const InstallationLocation = (props) => {
  const [loading, error, installationData] = useCachedData(
    GET_NEAEREST_INSTALLATION,
    "nearestInstallation",
    props,
    []
  );

  if (loading) return <LoadingIndicator />;
  if (error) return <ErrorIndicator error={error} />;

  let installation =
    installationData && installationData.nearestInstallation[0];

  return (
    <div style={styles.installationLocationContainer}>
      <span style={{ fontSize: "0.8rem" }}>
        {installation && installation.address.displayAddress1}
      </span>
      <br />
      <span style={{ fontSize: "0.7rem" }}>
        {installation && installation.address.displayAddress2}
      </span>
    </div>
  );
};

export default InstallationLocation;
