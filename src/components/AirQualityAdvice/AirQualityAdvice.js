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

  // let geolocation = {lat:  50.0473559, lng: 19.9276365}
  // let geolocation = {lat: 50.8500018, lng: 20.6163501}

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
