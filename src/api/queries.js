import gql from "graphql-tag"

export const GET_MEASUREMENTS = gql`
  query nearestMeasurement($lat: Float!, $lng: Float!){
    nearestMeasurement(lat: $lat, lng: $lng) {
      current {
        values {
          name
          value
        }
        indexes {
          advice
          description
          value
          color
        }
      }
    }
  }`;

export const GET_NEAEREST_INSTALLATION = gql`
query nearestInstallation($lat: Float!, $lng: Float!){
  nearestInstallation(lat: $lat, lng: $lng) {
      address{
        displayAddress1
        displayAddress2
      }
    }
}`;