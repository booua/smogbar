export const nearestInstallation = {
  timestamp: 1606321563184,
  dataType: "nearestInstallation",
  nearestInstallation: [
    {
      id: 204,
      location: {
        latitude: 50.062006,
        longitude: 19.940984,
      },
      address: {
        country: "Poland",
        city: "Kraków",
        street: "Mikołajska",
        number: "4B",
        displayAddress1: "Kraków",
        displayAddress2: "Mikołajska",
      },
      elevation: 220.38,
      airly: true,
      sponsor: {
        name: "KrakówOddycha",
        description: "Airly Sensor is part of action",
        logo: "https://cdn.airly.eu/logo/KrakówOddycha.jpg",
        link: "https://sponsor_home_address.pl",
      },
    },
  ],
};

export const nearestMeasurements = {
  timestamp: 1606321563184,
  dataType: "nearestMeasurements",
  nearestMeasurement: {
    current: {
      fromDateTime: "2018-08-24T08:24:48.652Z",
      tillDateTime: "2018-08-24T09:24:48.652Z",
      values: [
        { name: "PM1", value: 12.73 },
        { name: "PM25", value: 18.7 },
        { name: "PM10", value: 35.53 },
        { name: "PRESSURE", value: 1012.62 },
        { name: "HUMIDITY", value: 66.44 },
        { name: "TEMPERATURE", value: 24.71 },
      ],
      indexes: [
        {
          name: "AIRLY_CAQI",
          value: 35.53,
          level: "LOW",
          description: "Fairly good air quality",
          advice: "Take a deep breath :)",
          color: "#D1CF1E",
        },
      ],
      standards: [
        {
          name: "WHO",
          pollutant: "PM25",
          limit: 25,
          percent: 74.81,
        },
      ],
    },
  },
};
