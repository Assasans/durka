import * as mysql from 'mysql2/promise';
import * as Bluebird from 'bluebird';
import * as chalk from 'chalk';

import { RowDataPacket, FieldPacket, Connection, OkPacket } from 'mysql2/promise';

import { App } from '../app';
import { Log } from '../log';
import { Nullable } from './type';
import { Runtime } from '../runtime';
import { DatabaseConfig } from '../config/main';
import { InvalidOperationException } from '../error/exception';

export type ResultPacket = [
	RowDataPacket[] | RowDataPacket[][] | OkPacket | OkPacket[], FieldPacket[]
];

export class MySQL {
	private static readonly NotInitializedMessage: string = 'Database is not initialized';

	private config: DatabaseConfig;
	
	public db: Nullable<Connection>;

	constructor() {
		this.config = Runtime.get().config.database;

		this.db = null;
	}

	public async init(): Promise<MySQL> {
		this.db = await mysql.createConnection({
			host: this.config.hostname,
			user: this.config.username,
			password: this.config.password,
			database: this.config.database
		});
		return this;
	}
	
	public async select<T>(query: string, values?: (number | string | boolean | unknown)[]): Promise<T[]> {
		Log.mysql.trace(`Executing select query: ${chalk.greenBright(query)} with values: [ ${(values ?? []).join(', ')} ]`);

		if(this.db === null) throw new InvalidOperationException(MySQL.NotInitializedMessage);
		try {
			const result: ResultPacket = await this.db.query(query, values);
			return result[0] as T[];
		} catch(error) {
			Log.mysql.error(error);
			throw error;
		}
	}
	
	public async selectFirst<T>(query: string, values?: (number | string | boolean | unknown)[]): Promise<Nullable<T>> {
		return (await this.select<T>(query, values))[0] ?? null;
	}

	public async insert(query: string, values: (number | string | boolean | null | unknown)[]): Promise<OkPacket> {
		if(this.db === null) throw new InvalidOperationException(MySQL.NotInitializedMessage);
		try {
			const result: ResultPacket = await this.db.query(query, values);
			return result[0] as OkPacket;
		} catch(error) {
			Log.mysql.error(error);
			throw error;
		}
	}

	public async update(query: string, values: (number | string | boolean | null | unknown)[]): Promise<OkPacket> {
		if(this.db === null) throw new InvalidOperationException(MySQL.NotInitializedMessage);
		try {
			const result: ResultPacket = await this.db.query(query, values);
			return result[0] as OkPacket;
		} catch(error) {
			Log.mysql.error(error);
			throw error;
		}
	}

	public async delete(query: string, values: (number | string | boolean | null | unknown)[]): Promise<OkPacket> {
		if(this.db === null) throw new InvalidOperationException(MySQL.NotInitializedMessage);
		try {
			const result: ResultPacket = await this.db.query(query, values);
			return result[0] as OkPacket;
		} catch(error) {
			Log.mysql.error(error);
			throw error;
		}
	}
}
