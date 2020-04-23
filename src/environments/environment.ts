// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import * as workflow from './workflow.json';
export const environment = {
  production: false,
  apiUrl: 'http://adong-api-dev.zamio.net',
  oneSignalKey: 'c4be7e7f-d265-4071-b6e8-5ba9ccb95829',
  workflow
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
