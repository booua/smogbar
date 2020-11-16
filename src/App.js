import AirQuality from "./components/AirQuality/AirQuality";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

const styles = {
  root: {
    justifyContent: "center",
  },
};

const client = new ApolloClient({
  uri: "https://airly-widget-server.herokuapp.com/",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div style={styles.root}>
        <h1>Airly widget</h1>
        <AirQuality></AirQuality>
      </div>
    </ApolloProvider>
  );
}

export default App;
