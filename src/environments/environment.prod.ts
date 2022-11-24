const keycloakConfig = {
  url: 'http://localhost:8180',
  realm: 'vetstore',
  clientId: 'front',
};

export const environment = {
  production: true,
  url: 'http://192.168.0.9:8080',
  mapboxToken:
    'pk.eyJ1IjoiYXJpbW9uOTkiLCJhIjoiY2w5MXJhaWZ3MWQ5OTNvdDV5Yzc1OGN1NSJ9.rIIIEIEAm7uDqpgsFQAUgA',
  keycloakConfig: keycloakConfig,
};
