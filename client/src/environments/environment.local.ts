// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: true,
  contentful:{
    spaceID:'b73d407c7z3q',
    token:'173bbb7627a7cdc82292e2a99d28d5004612fbc724a4e74a643629c67d98919f',
    categoryIDs:{
      news: '4bGp5zRaVOAmO2gaMuagEO',
      jumbotron: '28BCNlBF6Msggwa2ECkokm'
    }
  },
  s3bucketImages: 'dev-ngs-image-storage',
  s3bucketReplays: 'dev-ngs-replay-storage',
  s3bucketGeneralImage:'dev-ngs-general-image',
  socketURL:'localhost:5000',
  heroesProfilePlayer:"https://www.heroesprofile.com/NGS/Profile/?",
  heroesProfileTeam: "https://heroesprofile.com/NGS/Team/Single/?team="
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
