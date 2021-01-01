import * as Fastify from 'fastify';

import { Router } from '../router';
import { User } from '../../model/user';
import { Nullable } from '../../utils/type';
import { NotFoundException } from '../../error/status';
import { Session } from '../../model/session';

export class ApiUsersRouter extends Router {
	public constructor(server: Fastify.FastifyInstance) {
		super(server, (fastify: Fastify.FastifyInstance, options: Fastify.RouteOptions, next: (error?: Fastify.FastifyError) => void) => {
			fastify.route<{
				Params: {
					id: number;
				}
			}>({
				method: 'GET',
				url: '/:id',
				schema: {
					params: {
						type: 'object',
						properties: {
							id: { type: 'number' }
						}
					}
				},
				handler: async (request, reply) => {
					const user: Nullable<User> = await User.get.id(request.params.id);
					if(!user) throw new NotFoundException('User not found');
					
					return user.client().response();
				}
			});

			fastify.route<{
				Headers: {
					authorization: string;
				}
			}>({
				method: 'GET',
				url: '/@me',
				schema: {
					headers: {
						type: 'object',
						properties: {
							Authorization: { type: 'string' }
						},
						required: [
							'Authorization'
						]
					}
				},
				handler: async (request, reply) => {
					const session: Nullable<Session> = await Session.get.token(request.headers.authorization);
					if(!session) throw new NotFoundException('Session not found');

					const user: Nullable<User> = await User.get.id(session.userId);
					if(!user) throw new NotFoundException('User not found');

					return user.logged().response();
				}
			});

			return next();
		});
	}
}
