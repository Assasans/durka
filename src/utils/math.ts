export class MathHelper {
	public static random(min: number, max: number): number {
		return Math.floor(Math.random() * (max - min + 1) + min);
	}

	public static map(value: number, inMin: number, inMax: number, outMin: number, outMax: number): number {
		if(value <= inMin) return outMin;
		if(value >= inMax) return outMax;
		return (value - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
	}

	public static readableSize(bytes: number): string {
		const suffixes: string[] = [ 'bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB' ];
		if(bytes == 0) return `0 ${suffixes[0]}`;
		const byteCount: number = Math.abs(bytes);
		const place: number = Math.floor(Math.log(byteCount) / Math.log(1024));
		const num: number = Math.round(byteCount / (1024 ** place));
		return `${(Math.sign(bytes) * num).toFixed(1)} ${suffixes[place]}`;
	}
}
