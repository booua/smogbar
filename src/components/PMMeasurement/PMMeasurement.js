const PMMeasurment = (props) => {
  return (
    <div style={{ padding: "10px", textAlign: "center" }}>
      <h1 style={{ fontSize: "1rem" }}>{props.name}</h1>
      <span style={{ fontSize: "0.9rem" }}>{props.value}</span>
    </div>
  );
};

export default PMMeasurment;
