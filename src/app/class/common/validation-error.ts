export class ValidationError implements Error {
	name: string;
	message: string;
	stack?: string;
	messages: string[];

	constructor(desiredMessages: string | String | string[]) {
		this.stack = new Error().stack;
		this.name = 'ValidationError';
		if (!desiredMessages || desiredMessages.length == 0) {
			desiredMessages = 'Unknown';
		}
		this.messages = [];
		if (desiredMessages instanceof Array) {
			this.messages = this.messages.concat(desiredMessages);
		} else {
			this.messages.push(String(desiredMessages));
		}
		this.message = this.messages.join('; ');
	}
}
