import * as appRoot from 'app-root-path';
import * as log4js from 'log4js';
import * as chalk from 'chalk';
import * as path from 'path';

export const Log = {
	preinit: log4js.getLogger('PreInit'),

	main: log4js.getLogger('Main'),
	looper: log4js.getLogger('Looper'),
	
	api: log4js.getLogger('API'),
	mysql: log4js.getLogger('MySQL'),

	rest: log4js.getLogger('REST API'),
	cdn: log4js.getLogger('CDN'),
	web: log4js.getLogger('Web'),
	webui: log4js.getLogger('WebUI')
};

export function init(logLevel: string = 'trace'): void {
	log4js.configure({
		appenders: {
			console: {
				type: 'console',
				layout: {
					type: 'pattern',
					pattern: `%[[%d{hh:mm:ss}] [%p/${chalk.bold('%c')}]%]: %m`
				}
			},
			file: {
				type: 'file',
				filename: path.join(appRoot.path, 'logs/server.log'),
				pattern: 'yyyy-MM-dd',
				maxLogSize: 1024 * 1024 * 1024 * 8,
				backups: 128,
				compress: true,
				keepFileExt: true,
				layout: {
					type: 'pattern',
					pattern: `[%d{hh:mm:ss}] [%p/%c]: %x{data}`,
					tokens: {
						data: function(event: log4js.LoggingEvent) {
							return event.data
								.join(' ')
								.replace(/[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g, '');
						}
					}
				}
			}
		},
		categories: {
			default: {
				appenders: [
					'console',
					'file'
				],
				level: logLevel
			}
		}
	});
}
