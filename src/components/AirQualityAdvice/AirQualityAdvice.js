import { useState, useEffect, useContext } from "react";
import { getGeolocation } from "../../api/client";
import { ThemeContext } from "../../contexts/ThemeContext";
import { flexContainer, topLeftbutton } from "../../styles/helperStyles";
import ErrorIndicator from "../ErrorIndicator/ErrorIndicator";
import InstallationLocation from "../InstallationLocation/InstallationLocation";
import { LoadingIndicator } from "../LoadingIndicator/LoadingIndicator";
import Measurements from "../Measurements/Measurements";

const styles = {
  airQualityContainer: {
    light: { ...flexContainer, backgroundColor: "#ffffff", color: "#212124" },
    dark: { ...flexContainer, backgroundColor: "#212124", color: "#ffffff" },
  },
};

const AirQualityAdvice = () => {
  const { darkTheme, toggleDarkTheme } = useContext(ThemeContext);

  const theme = !darkTheme ? "light" : "dark";

  const [geolocation, setGeolocation] = useState(null);

  useEffect(() => {
    async function fetchGeolocation() {
      const geolocation = await getGeolocation();
      setGeolocation(geolocation);
    }
    try {
      fetchGeolocation();
    } catch (error) {
      return <ErrorIndicator error={error}/>
    }
  }, []);
  
  return geolocation ? (
    <>
      <div style={styles.airQualityContainer[theme]}>
        <button style={topLeftbutton} onClick={toggleDarkTheme}>
          🖌
        </button>
        <Measurements lat={geolocation.lat} lng={geolocation.lng} />
        <InstallationLocation lat={geolocation.lat} lng={geolocation.lng} />
      </div>
    </>
  ) : <LoadingIndicator/>;
};

export default AirQualityAdvice;
