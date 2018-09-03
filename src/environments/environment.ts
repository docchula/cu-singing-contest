// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyD9-yNpDKnv-c_hwj2Kyxltya75hoTAPi4',
    authDomain: 'cu-singing-contest.firebaseapp.com',
    databaseURL: 'https://cu-singing-contest.firebaseio.com',
    projectId: 'cu-singing-contest',
    storageBucket: 'cu-singing-contest.appspot.com',
    messagingSenderId: '365913577805'
  },
  modeKey: 'dev-mode',
  functionsBase: 'https://us-central1-cu-singing-contest.cloudfunctions.net',
  redirectUrl: 'http://localhost:4200/login'
};
