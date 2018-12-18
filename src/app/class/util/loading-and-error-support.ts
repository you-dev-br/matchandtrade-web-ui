export class LoadingAndErrorSupport {
	errorMessage: string;
	loading: boolean = true;

	showContent(): boolean {
		return !this.errorMessage && !this.loading;
	}
}
