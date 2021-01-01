import * as Bluebird from 'bluebird';
import * as Fastify from 'fastify';

import { Router } from '../router';
import { UserFlags } from '../../model/user';
import { Nullable, Snowflake } from '../../utils/type';
import { NotFoundException, UnauthorizedException } from '../../error/status';
import { Session } from '../../model/session';

export class ApiMesssagesRouter extends Router {
	public constructor(server: Fastify.FastifyInstance) {
		super(server, (fastify: Fastify.FastifyInstance, options: Fastify.RouteOptions, next: (error?: Fastify.FastifyError) => void) => {
			fastify.route<{
				Body: {
					content: string;
					nonce: Snowflake;
				},
				Headers: {
					authorization: string;
				}
			}>({
				method: 'POST',
				url: '/channels/:channel/messages',
				schema: {
					body: {
						type: 'object',
						properties: {
							content: { type: 'string' },
							none: { type: 'string' }
						},
						required: [
							'content',
							'nonce'
						]
					},
					headers: {
						type: 'object',
						properties: {
							authorization: { type: 'string' }
						},
						required: [
							'authorization'
						]
					}
				},
				handler: async (request, reply) => {
					const session: Nullable<Session> = await Session.get.token(request.headers.authorization);
					if(!session) throw new UnauthorizedException('Invalid access token');

					if((await session.user()).flags.has(UserFlags.FLAGS.Answers)) {
						return await quiz.response();
					}
					
					return await (await quiz.noAnswers()).response();
				}
			});

			return next();
		});
	}
}
