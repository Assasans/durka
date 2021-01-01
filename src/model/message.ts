import * as _ from 'lodash';

import { OkPacket } from 'mysql2';

import { User } from './user';
import { Model } from './model';
import { Runtime } from '../runtime';
import { Nullable, HasPartial, HasResponse } from '../utils/type';
import { InvalidOperationException } from '../error/exception';

export interface MessagePartial {
	id: Nullable<number>;

	user: number;

	token: string;
}

export interface MessageResponse {
	id: number;

	user: number;

	token: string;
}

export class Message extends Model implements HasPartial<MessagePartial>, HasResponse<MessageResponse> {
	public id: number;

	public userId: number;
	private _user: Nullable<User>;

	public token: string;

	public constructor(partial: MessagePartial) {
		super();

		const {
			id, user,
			token
		}: MessagePartial = partial;

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

	public partial(): MessagePartial {
		return {
			id: this.id,
			
			user: this.userId,

			token: this.token
		};
	}

	public response(): MessageResponse {
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
		public static async id(id: number): Promise<Nullable<Message>> {
			const partial: Nullable<MessagePartial> = await Runtime.get().db.selectFirst('SELECT * FROM sessions WHERE id = ?', [
				id
			]);
			if(!partial) return null;
			
			const session: Message = new Message(partial);
			return session;
		}
	
		public static async token(token: string): Promise<Nullable<Message>> {
			const partial: Nullable<MessagePartial> = await Runtime.get().db.selectFirst('SELECT * FROM sessions WHERE BINARY token = ?', [
				token
			]);
			if(!partial) return null;
			
			const session: Message = new Message(partial);
			return session;
		}
	}
}
