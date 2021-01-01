import * as Fastify from 'fastify';
import * as Bcrypt from 'bcrypt';

import { Router } from '../router';
import { User } from '../../model/user';
import { Nullable } from '../../utils/type';
import { Session } from '../../model/session';
import { TokenHelper } from '../../utils/random';
import { NotFoundException, UnauthorizedException } from '../../error/status';

export class ApiAuthRouter extends Router {
	public constructor(server: Fastify.FastifyInstance) {
		super(server, (fastify: Fastify.FastifyInstance, options: Fastify.RouteOptions, next: (error?: Fastify.FastifyError) => void) => {
			fastify.route<{
				Body: {
					email: string;
					password: string;
				}
			}>({
				method: 'POST',
				url: '/login',
				schema: {
					body: {
						type: 'object',
						properties: {
							email: { type: 'string' },
							password: { type: 'string' }
						},
						required: [
							'email',
							'password'
						]
					}
				},
				handler: async (request, reply) => {
					const user: Nullable<User> = await User.get.email(request.body.email);
					if(!user) throw new NotFoundException('User not found');

					if(await Bcrypt.compare(request.body.password, user.password)) {
						const session: Session = new Session({
							id: null,
							user: user.id,
							token: await TokenHelper.generateToken(user.id)
						});
						await session.insert();
						
						return session.partial();
					}

					throw new UnauthorizedException('Incorrect password');
				}
			});

			return next();
		});
	}
}
