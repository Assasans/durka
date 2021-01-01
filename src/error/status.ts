import { Exception } from './exception';

export class StatusCodeException extends Exception {
	public statusCode: number;

	public constructor(statusCode: number, message?: string) {
		super(message);
		this.statusCode = statusCode;
	}
}

export class UnauthorizedException extends StatusCodeException {
	public constructor(message?: string) { super(401, message); }
}

export class ForbiddenException extends StatusCodeException {
	public constructor(message?: string) { super(403, message); }
}

export class NotFoundException extends StatusCodeException {
	public constructor(message?: string) { super(404, message); }
}
