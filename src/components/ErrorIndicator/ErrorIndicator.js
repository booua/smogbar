import React from "react";

const styles = {
  errorIndicator: {
    width: "100%",
    backgroundColor: "red",
    textAlign: "center",
    position:"absolute",
    height: "100%",
  },
};
const ErrorIndicator = (props) => {
  const { error } = props;

  console.log(error);

  return <div style={styles.errorIndicator}>{error.message}</div>;
};

export default ErrorIndicator;
