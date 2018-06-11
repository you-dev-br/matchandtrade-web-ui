export class StringUtil {

	public static shorttenWithEllipsis(text: string, lengthTrashold?: number): string {
		let trashold = 100;
		if (lengthTrashold) {
			trashold = lengthTrashold;
		}
		if (text && text.length > trashold) {
			return text.substring(0, trashold)  + '...';
		} else {
			return text;
		}
	}

}
