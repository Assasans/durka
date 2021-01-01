import * as appRoot from 'app-root-path';
import * as path from 'path';

import { Log } from './log';
import { MySQL } from './utils/mysql';
import { ConfigManager } from './config/main';
import { InvalidOperationException } from './error/exception';

export class Runtime {
	private static instance: Runtime;
	public static get(): Runtime {
		if(!this.instance) this.instance = new Runtime();
		return this.instance;
	}

	public config: ConfigManager;

	public db!: MySQL;

	private constructor() {
		this.config = new ConfigManager();;
	}

	public async init(): Promise<void> {
		await this.config.load();

		this.db = new MySQL();
		this.db.init();
	}

	public static get configDir(): string {
		return path.join(appRoot.path, 'config');
	}

	public static get logsDir(): string {
		return path.join(appRoot.path, 'logs');
	}
}
