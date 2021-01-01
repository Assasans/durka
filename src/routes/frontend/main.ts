import * as appRoot from 'app-root-path';
import * as Bluebird from 'bluebird';
import * as Fastify from 'fastify';
import * as fs from 'promise-fs';
import * as path from 'path';
import * as _ from 'lodash';

import { Router } from '../router';

export class FrontendMainRouter extends Router {
	public constructor(server: Fastify.FastifyInstance) {
		super(server, (fastify: Fastify.FastifyInstance, options: Fastify.RouteOptions, next: (error?: Fastify.FastifyError) => void) => {
			fastify.route<{}>({
				method: 'GET',
				url: '/',
				handler: async (request, reply) => {
					reply.type('text/html');
					
					return await fs.readFile(path.join(appRoot.path, 'frontend/html/main.html'), {
						encoding: 'utf8'
					});
				}
			});

			return next();
		});
	}
}
