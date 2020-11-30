import {LoadingIndicator} from "../LoadingIndicator/LoadingIndicator";
import ErrorIndicator from "../ErrorIndicator/ErrorIndicator";
import { GET_MEASUREMENTS } from "../../api/queries";
import AirQualityBar from "../AirQualityBar/AirQualityBar";
import { useCachedData } from "../../hooks/useCachedData";
import {
  adviceHeader,
  indexDescriptionHeader,
  measurements,
  airQualityBarContainer,
  measurementsContainer,
  refreshButton,
} from "./measurementsStyles";
import TemperatureIndicator from "../TemperatureIndicator/TemperatureIndicator";
import PMMeasurment from "../PMMeasurement/PMMeasurement";

const Measurements = (props) => {
  let pmMeasurementKeys = ["PM1", "PM10", "PM25"];

  const refreshMeasurements = () => {
    console.log("ref");
  };

  const [loading, error, measurementData] = useCachedData(
    GET_MEASUREMENTS,
    "nearestMeasurements",
    props,
    []
  );

  if (loading) return <LoadingIndicator />;
  if (error) return <ErrorIndicator error={error} />;

  let indexes =
    measurementData &&
    measurementData.nearestMeasurement &&
    measurementData.nearestMeasurement.current &&
    measurementData.nearestMeasurement.current.indexes[0];
  let backgroundColor = indexes && indexes.color;
  let caqiValue = indexes && indexes.value;

  return (
    <div style={measurements}>
      {/* <button style={refreshButton} onClick={refreshMeasurements.bind(this)}>&#x21bb;</button> */}
      <h1 style={{ ...adviceHeader, color: backgroundColor }}>
        {indexes && indexes.advice}
      </h1>

      <h1 style={indexDescriptionHeader}>{indexes && indexes.description}</h1>

      <div style={airQualityBarContainer}>
        <AirQualityBar bgColor={backgroundColor} caqiValue={caqiValue} />
      </div>
      <div style={measurementsContainer}>
        {measurementData &&
          measurementData.nearestMeasurement.current &&
          measurementData.nearestMeasurement.current.values.map(
            (measurement) => {
              if (pmMeasurementKeys.includes(measurement.name)) {
                return (
                  <PMMeasurment
                    key={measurement.name}
                    name={measurement.name}
                    value={measurement.value}
                  />
                );
              } else if (measurement.name === "TEMPERATURE") {
                return (
                  <TemperatureIndicator
                    key={measurement.name}
                    value={measurement.value}
                  />
                );
              } else {
                return "";
              }
            }
          )}
      </div>
    </div>
  );
};

export default Measurements;
