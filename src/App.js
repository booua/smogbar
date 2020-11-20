import AirQualityAdvice from "./components/AirQualityAdvice/AirQualityAdvice";
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
        <AirQualityAdvice></AirQualityAdvice>
      </div>
    </ApolloProvider>
  );
}

export default App;
