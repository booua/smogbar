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
        }
      }
    }
  }`;