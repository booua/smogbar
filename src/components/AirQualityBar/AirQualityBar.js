import React from "react";

const AirQualityBar = (props) => {
  const { bgColor, caqiValue } = props;

  const containerStyles = {
    height: "20px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    width: "80%",
    backgroundColor: "#e0e0de",
    borderRadius: "10px",
    marginBottom: "20px",
  };

  const fillerStyles = {
    height: "100%",
    width: `${caqiValue}%`,
    backgroundColor: `${bgColor}`,
    borderRadius: "inherit",
    textAlign: "right",
    transition: "width 0.4s ease-in-out",
  };

  const caqiLabelStyles = {
    padding: "5px",
    color: "black",
    fontSize: "0.9rem",
    fontFamily: "Quicksand",
  };

  const labelStyles = {
    color: "black",
    fontSize: "0.6rem",
    fontFamily: "Quicksand",
  };

  const barLabelStyles = {
    flex: 1,
    color: "black",
    fontSize: "0.9rem",
    fontFamily: "Quicksand",
  };

  const barLabelContainerStyles = {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    textAlign: "center",
  };

  const wrapperStyles = {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };

  const labels = ["Excellent", "Good", "So so", "Bad", "We're gonna die"];

  return (
    <div style={wrapperStyles}>
      <div style={containerStyles}>
        <div style={fillerStyles}>
          <span style={caqiLabelStyles}>
            {`${caqiValue}`} 
            <span style={labelStyles}> CAQI</span>
          </span>
        </div>
      </div>

      <div style={barLabelContainerStyles}>
        {labels.map((label) => {
          return (
            <span key={label} style={barLabelStyles}>
              {label}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default AirQualityBar;
