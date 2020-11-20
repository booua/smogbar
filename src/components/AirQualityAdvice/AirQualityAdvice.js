import { useState, useEffect } from "react";
import { getGeolocation } from "../../api/client";
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
    </div>
  ) : (
    <LoadingIndicator />
  );
};

export default AirQualityAdvice;
