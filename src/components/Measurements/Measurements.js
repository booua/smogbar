import { useQuery } from "@apollo/react-hooks";
import LoadingIndicator from "../LoadingIndicator/LoadingIndicator";
import ErrorIndicator from "../ErrorIndicator/ErrorIndicator";
import { GET_MEASUREMENTS } from "../../api/queries";
import AirQualityBar from "../AirQualityBar/AirQualityBar";

const styles = {
  measurements: {
    width: "100%",
    fontFamily: "Quicksand"
  },
};

const Measurements = (props) => {
  const { lat, lng } = props;
  const { loading, error, data } = useQuery(GET_MEASUREMENTS, {
    variables: { lat, lng },
  });

  if (loading) return <LoadingIndicator />;
  if (error) return <ErrorIndicator />;
  let pmMeasurementKeys = ["PM1", "PM10", "PM25"];

  let backgroundColor = data.nearestMeasurement.current.indexes[0].color;
  let caqiValue = data.nearestMeasurement.current.indexes[0].value;

  return (
    <div style={styles.measurements}>
      <h1
        style={{
          color: backgroundColor,
          textAlign: "center",
          fontSize: "2rem",
        }}
      >
        {" "}
        {data.nearestMeasurement.current.indexes[0].advice}
      </h1>
      <h1
        style={{ textAlign: "center", fontSize: "1rem", marginBottom: "20px" }}
      >
        {data.nearestMeasurement.current.indexes[0].description}
      </h1>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <AirQualityBar bgColor={backgroundColor} caqiValue={caqiValue} />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        {data.nearestMeasurement.current.values.map((measurement) => {
          if (pmMeasurementKeys.includes(measurement.name)) {
            return (
              <div
                key={measurement.name}
                style={{ padding: "20px", marginTop: "25px", textAlign: "center" }}
              >
                <h1 style={{ fontSize: "1rem" }}>{measurement.name}</h1>
                <span style={{ fontSize: "0.9rem" }}>{measurement.value}</span>
              </div>
            );
          } else if (measurement.name === "TEMPERATURE") {
            return (
              <div key={measurement.name} style={{position: 'absolute', bottom:'20px', left: '20px'}}>
                <span style={{ fontSize: "1.3rem" }}>{measurement.value} &deg;C</span>
              </div>
            );
          } else {
            return ""
          }
        })}
      </div>
    </div>
  );
};

export default Measurements;
