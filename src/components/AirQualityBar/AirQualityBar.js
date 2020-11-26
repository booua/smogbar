import {
  barLabelContainerStyles,
  barLabelStyles,
  caqiLabelStyles,
  containerStyles,
  fillerLabelStyles,
  fillerStyles,
  labelStyles,
  wrapperStyles,
} from "./airQualityBarStyles";

const AirQualityBar = (props) => {
  const { bgColor, caqiValue } = props;

  const labels = ["Excellent", "Good", "So so", "Bad", "We're gonna die"];
  if (caqiValue === null) {
    return "";
  }
  return (
    <div style={wrapperStyles}>
      <div style={containerStyles}>
        <div
          style={{
            ...fillerStyles,
            width: `${caqiValue}%`,
            backgroundColor: `${bgColor}`,
          }}
        >
          <span style={caqiLabelStyles}>
            {`${caqiValue}`}
            <span style={labelStyles}> </span>
            <span style={fillerLabelStyles}>CAQI</span>
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
