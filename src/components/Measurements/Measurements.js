import React from "react";
import { useQuery } from "@apollo/react-hooks";
import LoadingIndicator from "../LoadingIndicator/LoadingIndicator";
import ErrorIndicator from "../ErrorIndicator/ErrorIndicator";
import { GET_MEASUREMENTS } from "../../api/queries";

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

  if (loading) return <LoadingIndicator />;
  if (error) return <ErrorIndicator />;

  return (
    <div style={styles.measurements}>
      {data.nearestMeasurement.current.values.map((measurement) => {
        return (
          <div key={measurement.name}>
            {measurement.name} : {measurement.value}
          </div>
        );
      })}
      <div>Advice: {data.nearestMeasurement.current.indexes[0].advice}</div>
    </div>
  );
};

export default Measurements;
