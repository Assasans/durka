import 'source-map-support/register';

import * as appRoot from 'app-root-path';
import * as Bluebird from 'bluebird';
import * as Fastify from 'fastify';
import * as chalk from 'chalk';
import * as http from 'http';
import * as path from 'path';
import * as URL from 'url';

import FastifyPlugin from 'fastify-plugin';
import FastifyStatic from 'fastify-static';

import { AddressInfo } from 'net';
import { oneLine } from 'common-tags';

import { Runtime } from './runtime';
import { Looper } from './utils/looper';
import { Log, init as initLog } from './log';
import { TypeHelper, Nullable } from './utils/type';

import { ApiUsersRouter } from './routes/api/users';
import { ApiAuthRouter } from './routes/api/auth';
import { ApiMesssagesRouter } from './routes/api/messages';

import { FrontendMainRouter } from './routes/frontend/main';

export class App {
	public readonly server: Fastify.FastifyInstance;

	public constructor() {
		this.server = Fastify.fastify({
		});

		this.server.register(FastifyPlugin((fastify: Fastify.FastifyInstance, options: Fastify.RouteOptions, next: (error?: Fastify.FastifyError) => void) => {
			fastify.addHook('onRequest', async (request: Fastify.FastifyRequest, reply: Fastify.FastifyReply) => {
				const url = URL.parse(request.url);
	
				Log.web.trace(oneLine`
					Request
					(IP: ${chalk.green(request.ip)})
					${chalk.green.bold(request.method)} ${chalk.green(url.pathname!)}
				`);
			});

			return next();
		}));

		this.server.register(FastifyStatic, {
			root: path.join(appRoot.path, 'frontend/static'),
			prefix: '/assets/',
		});

		new ApiUsersRouter(this.server).register({ prefix: '/api/users' });
		new ApiAuthRouter(this.server).register({ prefix: '/api/auth' });
		new ApiMesssagesRouter(this.server).register({ prefix: '/api' });

		new FrontendMainRouter(this.server).register({ prefix: '/' });

		/* const looper: Looper = Looper.getInstance();
		setInterval(() => {
			looper.loop();
		}, 15000);
		Log.looper.debug('Interval created'); */
	}

	public async start(): Promise<void> {
		await Runtime.get().init();

		const hostname: string = Runtime.get().config.web.hostname;
		const port: number = Runtime.get().config.web.port;

		this.server.listen(port, hostname, (error: Error) => {
			if(error) {
				Log.web.error(error);
				return;
			}

			const serverInfo: AddressInfo = server.address() as AddressInfo;
			if(serverInfo) {
				Log.web.debug(`Web server config:`);
				Log.web.debug(` Hostname: ${chalk.greenBright(serverInfo.address)}`);
				Log.web.debug(` Port: ${chalk.greenBright(serverInfo.port)}`);
			}
		});

		const server: http.Server = this.server.server;

		server.on('error', (error: NodeJS.ErrnoException) => {
			if(error.syscall !== 'listen') throw error;

			switch(error.code) {
				case 'EACCES': {
					console.error(`${port} requires elevated privileges`);
					process.exit(1);
				}
					
				case 'EADDRINUSE': {
					console.error(`${port} is already in use`);
					process.exit(1);
				}
					
				default: {
					throw error;
				}
			}
		});
	}
}

(async () => {
	initLog();

	const app: App = new App();
	await app.start();
})();
