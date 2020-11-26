const { temperatureIndicator } = require("../Measurements/measurementsStyles")

const TemperatureIndicator = (props) => {
    return (
        <div style={temperatureIndicator}>
        {props.value} &deg;C
      </div>
    )
}

export default TemperatureIndicator