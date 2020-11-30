import AirQualityAdvice from "./components/AirQualityAdvice/AirQualityAdvice";
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
            <AirQualityAdvice />
          </div>
        </ThemeContextProvider>
      </ApolloProvider>
    </>
  );
}

export default App;
