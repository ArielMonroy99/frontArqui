// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const keycloakConfig = {
  url: 'http://localhost:8180',
  realm: 'vetstore',
  clientId: 'front',
};
export const environment = {
  production: false,
  url: 'http://localhost:8080',
  mapboxToken:
    'pk.eyJ1IjoiYXJpbW9uOTkiLCJhIjoiY2w5MXJhaWZ3MWQ5OTNvdDV5Yzc1OGN1NSJ9.rIIIEIEAm7uDqpgsFQAUgA',
  keycloakConfig: keycloakConfig,
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
