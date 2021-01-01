import FastifyPluginFunction from 'fastify-plugin';

import { FastifyInstance, FastifyPluginCallback, RouteOptions } from 'fastify';

export abstract class Router<Options = {}> {
	public readonly server: FastifyInstance;
	public readonly plugin: FastifyPluginCallback<Options & RouteOptions>;

	public constructor(server: FastifyInstance, plugin: FastifyPluginCallback<Options & RouteOptions>) {
		this.server = server;
		this.plugin = plugin;
	}

	public register(options?: Options): FastifyInstance {
		this.server.register(this.plugin, options as Options & RouteOptions); //FIXME: Remove type cast
		return this.server;
	}
}

