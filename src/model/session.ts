import * as _ from 'lodash';

import { OkPacket } from 'mysql2';

import { User } from './user';
import { Model } from './model';
import { Runtime } from '../runtime';
import { Nullable, HasPartial, HasResponse } from '../utils/type';
import { InvalidOperationException } from '../error/exception';

export interface SessionPartial {
	id: Nullable<number>;

	user: number;

	token: string;
}

export interface SessionResponse {
	id: number;

	user: number;

	token: string;
}

export class Session extends Model implements HasPartial<SessionPartial>, HasResponse<SessionResponse> {
	public id: number;

	public userId: number;
	private _user: Nullable<User>;

	public token: string;

	public constructor(partial: SessionPartial) {
		super();

		const {
			id, user,
			token
		}: SessionPartial = partial;

		this.id = id ?? 0;

		this.userId = user;
		this._user = null;

		this.token = token;
	}

	public async user(): Promise<User> {
		if(this._user !== null) return this._user;

		const user: User = (await User.get.id(this.userId))!; // TODO
		this._user = user;

		return user;
	}

	public partial(): SessionPartial {
		return {
			id: this.id,
			
			user: this.userId,

			token: this.token
		};
	}

	public response(): SessionResponse {
		return {
			id: this.id,

			user: this.userId,

			token: this.token
		};
	}

	public async insert(): Promise<OkPacket> {
		if(this.id !== 0) throw new InvalidOperationException('Cannot insert remote instance');

		const packet: OkPacket = await Runtime.get().db.insert('INSERT INTO sessions (id, user, token) VALUES (NULL, ?, ?)', [
			this.userId,
			this.token
		]);

		this.id = packet.insertId;

		return packet;
	}

	public async update(): Promise<OkPacket> {
		if(this.id === 0) throw new InvalidOperationException('Cannot update local instance');

		return await Runtime.get().db.insert('UPDATE sessions SET user = ?, token = ? WHERE id = ?', [
			this.userId,

			this.token,

			this.id
		]);
	}

	public async delete(): Promise<OkPacket> {
		if(this.id === 0) throw new InvalidOperationException('Cannot delete local instance');

		const packet: OkPacket = await Runtime.get().db.delete('DELETE FROM sessions WHERE id = ?', [
			this.id
		]);

		this.id = 0;

		return packet;
	}

	public static get = class {
		public static async id(id: number): Promise<Nullable<Session>> {
			const partial: Nullable<SessionPartial> = await Runtime.get().db.selectFirst('SELECT * FROM sessions WHERE id = ?', [
				id
			]);
			if(!partial) return null;
			
			const session: Session = new Session(partial);
			return session;
		}
	
		public static async token(token: string): Promise<Nullable<Session>> {
			const partial: Nullable<SessionPartial> = await Runtime.get().db.selectFirst('SELECT * FROM sessions WHERE BINARY token = ?', [
				token
			]);
			if(!partial) return null;
			
			const session: Session = new Session(partial);
			return session;
		}
	}
}
