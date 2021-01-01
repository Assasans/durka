import * as Bluebird from 'bluebird';
import * as Luxon from 'luxon';
import * as chalk from 'chalk';
import * as _ from 'lodash';

import { Log } from '../log';

export class Looper {
	private static instance: Looper;
	public static getInstance(): Looper {
		if(!Looper.instance) Looper.instance = new Looper();
		return Looper.instance;
	}

	private constructor() {
		Log.looper.debug('Creating looper...');
	}

	public async loop(): Promise<void> {
		//Log.looper.trace('Main loop')
	}
}
