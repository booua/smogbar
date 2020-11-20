import React, {useState, useEffect} from "react";
import { useQuery } from "@apollo/react-hooks";
import LoadingIndicator from "../LoadingIndicator/LoadingIndicator";
import ErrorIndicator from "../ErrorIndicator/ErrorIndicator";
import { GET_MEASUREMENTS } from "../../api/queries";
import AirQualityBar from "../AirQualityBar/AirQualityBar";

const styles = {
  measurements: {
    width: "100%",
  },
};


const Measurements = (props) => {
  const { lat, lng } = props;
  const { loading, error, data } = useQuery(GET_MEASUREMENTS, {
    variables: { lat, lng },
  });

  // const [caqiValue, setCaqi] = useState(0);

  // useEffect(() => {
  //   setInterval(() => setCaqi(Math.floor(Math.random() * 100) + 1), 2000);
  // }, []);

  if (loading) return <LoadingIndicator />;
  if (error) return <ErrorIndicator />;
  // let measurementKeys = ['temperature', 'humidity']

  let backgroundColor = data.nearestMeasurement.current.indexes[0].color.toString();
  let caqiValue = data.nearestMeasurement.current.indexes[0].value

  return (
    <div style={styles.measurements}>
      <h1 style={{color: backgroundColor, textAlign: 'center', fontSize: '2rem'} }> {data.nearestMeasurement.current.indexes[0].advice}</h1>
      <h1 style={{textAlign: "center", fontSize: "1rem", marginBottom: "20px"}}>{data.nearestMeasurement.current.indexes[0].description}</h1>
      <div style={{display:'flex', justifyContent: 'center'}}>
        <AirQualityBar bgColor={backgroundColor} caqiValue={caqiValue}/>
      </div>
      {/* {data.nearestMeasurement.current.values.map((measurement) => {
        return (
          <div key={measurement.name}>
            {measurement.name} : {measurement.value}
          </div>
        );
      })} */}

    </div>
  );
};

export default Measurements;
