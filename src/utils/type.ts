export type Nullable<T> = T | null;
export type Snowflake = string;

export interface HasInfo<I> { info(): I | Promise<I>; }
export interface HasPartial<P> { partial(): P | Promise<P>; }
export interface HasResponse<R> { response(): R | Promise<R>; }

export class TypeHelper {
	public static toBoolean(value: string, strict: boolean): boolean {
		if(strict) {
			if(value === 'true') return true;
			if(value === 'false') return false;
			throw new Error('Invalid boolean value!');
		} else {
			if(value === 'true') return true;
			return false;
		}
	}

	public static normalizeHeader(value: string | string[] | undefined): Nullable<string> {
		if(value === undefined) return null;
		if(value instanceof Array) return value[0];
		return value;
	}
}
