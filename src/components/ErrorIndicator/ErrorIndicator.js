import React from "react";

const styles = {
  errorIndicator: {
    width: "100%",
    backgroundColor: "red",
    textAlign: "center",
  },
};
const ErrorIndicator = (props) => {
  const { error } = props;

  console.error(error);

  return <div style={styles.errorIndicator}>{error}</div>;
};

export default ErrorIndicator;
