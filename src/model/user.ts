import * as _ from 'lodash';

import { OkPacket } from 'mysql2';
import { oneLine } from 'common-tags';
import { BitField } from '@assasans/bitfield';

import { Model } from './model';
import { Runtime } from '../runtime';
import { Nullable, HasPartial, HasResponse } from '../utils/type';
import { InvalidOperationException } from '../error/exception';

export interface ClientUserPartial {
	id: Nullable<number>;

	username: string;
	discriminator: string;

	avatar: Nullable<string>;

	publicFlags: number;
}

export interface ClientUserResponse {
	id: number;

	username: string;
	discriminator: string;

	avatar: Nullable<string>;

	publicFlags: number;
}

export interface LoggedUserPartial extends ClientUserPartial {
	email: string;

	flags: number;
}

export interface LoggedUserResponse extends ClientUserResponse {
	email: string;

	flags: number;
}

export interface UserPartial extends LoggedUserPartial {
	password: string;
}

export interface UserResponse extends LoggedUserResponse {
	password: string;
}

export class UserFlags extends BitField {
	public static FLAGS = {
		Reserved0: 1 << 0,
		Reserved1: 1 << 1,
		Reserved2: 1 << 2,
		Reserved3: 1 << 3,
		Reserved4: 1 << 4,
		Reserved5: 1 << 5,
		Reserved6: 1 << 6,
		Reserved7: 1 << 7,

		Administrator: 1 << 8,
		Developer: 1 << 9
	};
}

export class ClientUser extends Model implements HasPartial<ClientUserPartial>, HasResponse<ClientUserResponse> {
	public id: number;

	public username: string;
	public discriminator: string;

	public avatar: Nullable<string>;

	public publicFlags: UserFlags;

	public constructor(partial: ClientUserPartial) {
		super();

		const {
			id,
			username,
			discriminator,
			avatar,
			publicFlags
		}: ClientUserPartial = partial;

		this.id = id ?? 0;

		this.username = username;
		this.discriminator = discriminator;

		this.avatar = avatar;

		this.publicFlags = new UserFlags(publicFlags);
	}

	public client(): ClientUser {
		return new ClientUser(this.partial());
	}

	public partial(): ClientUserPartial {
		return {
			id: this.id,

			username: this.username,
			discriminator: this.discriminator,

			avatar: this.avatar,

			publicFlags: this.publicFlags.valueOf()
		};
	}

	public response(): ClientUserResponse {
		return {
			id: this.id,

			username: this.username,
			discriminator: this.discriminator,

			avatar: this.avatar,

			publicFlags: this.publicFlags.valueOf()
		};
	}
}

export class LoggedUser extends ClientUser implements HasPartial<LoggedUserPartial> {
	public email: string;

	public flags: UserFlags;

	public constructor(partial: LoggedUserPartial) {
		super(partial);

		const {
			email, flags
		}: LoggedUserPartial = partial;

		this.email = email;

		this.flags = new UserFlags(flags);
	}

	public partial(): LoggedUserPartial {
		return {
			...super.partial(),

			email: this.email,

			flags: this.flags.valueOf()
		};
	}

	public response(): LoggedUserResponse {
		return {
			...super.response(),

			email: this.email,

			flags: this.flags.valueOf()
		};
	}
}

export class User extends LoggedUser implements HasPartial<UserPartial> {
	public password: string;

	public constructor(partial: UserPartial) {
		super(partial);

		const {
			password
		}: UserPartial = partial;

		this.password = password;
	}

	public logged(): LoggedUser {
		return new LoggedUser(this.partial());
	}

	public partial(): UserPartial {
		return {
			...super.partial(),

			password: this.password
		};
	}

	public response(): UserResponse {
		return {
			...super.response(),

			password: this.password
		};
	}

	public async insert(): Promise<OkPacket> {
		if(this.id !== 0) throw new InvalidOperationException('Cannot insert remote instance');

		const packet: OkPacket = await Runtime.get().db.insert(oneLine`
			INSERT INTO users
			(id, email, username, discriminator, avatar, password, flags, publicFlags)
			VALUES (?, ?, ?, ?, ?, ?, ?, ?)
		`, [
			this.id,
			this.email,

			this.username,
			this.discriminator,
			
			this.avatar,

			this.password,

			this.flags.valueOf(),
			this.publicFlags.valueOf()
		]);

		this.id = packet.insertId;

		return packet;
	}

	public async update(): Promise<OkPacket> {
		if(this.id === 0) throw new InvalidOperationException('Cannot update local instance');

		return await Runtime.get().db.insert(oneLine`
			UPDATE users
			SET email = ?, username = ?, discriminator = ?, avatar = ?, password = ?, avatar = ?, flags = ?, publicFlags = ?
			WHERE id = ?
		`, [
			this.email,

			this.username,
			this.discriminator,

			this.avatar,

			this.password,

			this.flags.valueOf(),
			this.publicFlags.valueOf(),

			this.id
		]);
	}

	public async delete(): Promise<OkPacket> {
		if(this.id === 0) throw new InvalidOperationException('Cannot delete local instance');

		const packet: OkPacket = await Runtime.get().db.delete('DELETE FROM users WHERE id = ?', [
			this.id
		]);

		this.id = 0;

		return packet;
	}

	public static get = class {
		public static async id(id: number): Promise<Nullable<User>> {
			const partial: Nullable<UserPartial> = await Runtime.get().db.selectFirst('SELECT * FROM users WHERE id = ?', [
				id
			]);

			return partial ? new User(partial) : null;
		}

		public static async email(email: string): Promise<Nullable<User>> {
			const partial: Nullable<UserPartial> = await Runtime.get().db.selectFirst('SELECT * FROM users WHERE BINARY email = ?', [
				email
			]);

			return partial ? new User(partial) : null;
		}

		public static async username(username: string): Promise<Nullable<User>> {
			const partial: Nullable<UserPartial> = await Runtime.get().db.selectFirst('SELECT * FROM users WHERE BINARY username = ?', [
				username
			]);

			return partial ? new User(partial) : null;
		}

		public static async form(formId: number): Promise<User[]> {
			const partials: UserPartial[] = await Runtime.get().db.select('SELECT * FROM users WHERE form = ?', [
				formId
			]);

			return partials.map((partial: UserPartial) => new User(partial));
		}
	}
}
