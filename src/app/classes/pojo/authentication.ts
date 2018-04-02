export class Authentication {
	authorizationHeader: string;

	constructor(authHeader: string) {
		this.authorizationHeader = authHeader;
	}

}
