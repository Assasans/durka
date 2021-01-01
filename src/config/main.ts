import * as appRoot from 'app-root-path';
import * as fs from 'promise-fs';
import * as path from 'path';

import { HasPartial } from '../utils/type';

export interface WebConfigPartial {
	hostname: string;
	port: number;
}

export class WebConfig implements HasPartial<WebConfigPartial> {
	public hostname: string;
	public port: number;

	public constructor(partial: WebConfigPartial) {
		const {
			hostname, port
		}: WebConfigPartial = partial;

		this.hostname = hostname;
		this.port = port;
	}

	public partial(): WebConfigPartial {
		return {
			hostname: this.hostname,
			port: this.port
		};
	}
}

export interface DatabaseConfigPartial {
	hostname: string;
	username: string;
	password: string;
	database: string;
}

export class DatabaseConfig implements HasPartial<DatabaseConfigPartial> {
	public hostname: string;
	public username: string;
	public password: string;
	public database: string;

	public constructor(partial: DatabaseConfigPartial) {
		const {
			hostname, username, password, database
		}: DatabaseConfigPartial = partial;

		this.hostname = hostname;
		this.username = username;
		this.password = password;
		this.database = database;
	}

	public partial(): DatabaseConfigPartial {
		return {
			hostname: this.hostname,
			username: this.username,
			password: this.password,
			database: this.database
		};
	}
}

export interface ConfigPartial {
	web: WebConfigPartial;
	database: DatabaseConfigPartial;
}

export class ConfigManager {
	private readonly file: string;

	public web!: WebConfig;
	public database!: DatabaseConfig;

	public constructor() {
		this.file = path.join(appRoot.path, 'config/main.json');
	}

	public async load(): Promise<void> {
		const {
			web,
			database
		}: ConfigPartial = JSON.parse(await fs.readFile(this.file, {
			encoding: 'utf8'
		}));

		this.web = new WebConfig(web);
		this.database = new DatabaseConfig(database);
	}
}
