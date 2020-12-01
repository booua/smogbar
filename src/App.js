import AirQualityDashboard from "./components/AirQualityDashboard/AirQualityDashboard";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import ThemeContextProvider from "./contexts/ThemeContext";
import { rootContainer } from "./styles/helperStyles";

const client = new ApolloClient({
  uri: "https://airly-widget-server.herokuapp.com/",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <ThemeContextProvider>
          <div style={rootContainer}>
            <AirQualityDashboard />
          </div>
        </ThemeContextProvider>
      </ApolloProvider>
    </>
  );
}

export default App;
