// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
	// Change ${EXTERNAL-ADDRESS} with host address used by external HTTP requests.
	// authenticateGoogleUrl: "/api/authenticate?callbackUrl=http://${EXTERNAL-ADDRESS}:4200/authenticate/callback"
	authenticateUrl: "/matchandtrade-web-api/v1/authenticate"
};
