import { useState, useEffect } from "react";
import { getGeolocation } from "../../api/client";
import InstallationLocation from "../InstallationLocation/InstallationLocation";
import LoadingIndicator from "../LoadingIndicator/LoadingIndicator";
import Measurements from "../Measurements/Measurements";

const styles = {
  airQualityContainer: {
    display: "flex",
    width: "100%",
  },
};

const AirQualityAdvice = () => {
  const [geolocation, setGeolocation] = useState(null);

  useEffect(() => {
      async function fetchGeolocation() {
        const geolocation = await getGeolocation();
        setGeolocation(geolocation)
      }
      fetchGeolocation();
  }, []);

  return geolocation ? (
    <div style={styles.airQualityContainer}>
      <Measurements lat={geolocation.lat} lng={geolocation.lng} />
      <InstallationLocation lat={geolocation.lat} lng={geolocation.lng} />
    </div>
  ) : (
    <LoadingIndicator />
  );
};

export default AirQualityAdvice;
