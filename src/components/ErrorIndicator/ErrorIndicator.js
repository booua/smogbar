const styles = {
  errorIndicator: {
    width: "100%",
    textAlign: "center",
    position: "absolute",
    height: "100%",
    backgroundColor: "rgba(255,150,150,0.8)",
    display: 'grid',
    placeItems:'center' 
  },
};
const ErrorIndicator = (props) => {
  const { error } = props;

  console.error(error.message);

  return (
    
    <div style={styles.errorIndicator}>
      <span style={{}}>
        Sorry! An error occured :C <br/>
        We're about to fix it tho! Don't worry!
      </span>
    </div>
  );
};

export default ErrorIndicator;
