import * as React from 'react';

import '../../../../scss/main.scss';

import { Component, ReactNode } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import { Snowflake } from '../../../utils';
import { AuthorPartial } from '../../../partials';

export interface MessageProps extends RouteComponentProps {
	groupStart: boolean;

	id: Snowflake;
	time: string;
	author: AuthorPartial;
	content: string;
}

export class Message extends Component<MessageProps> {
	public render(): ReactNode {
		const {
			groupStart,
			id,
			time,
			author,
			content
		}: MessageProps = this.props;

		return (
			<div className={`message${groupStart ? ' message--group-start' : ''}`}>
				{groupStart ? (
					<div className="author-avatar-wrapper">
						<img className="author-avatar" src={author.avatar} />
					</div>
				) : (
					<div className="time">{time}</div>
				)}

				<div className="message-body">
					{groupStart ? (
						<div className="header">
							<span className="author-username">{author.username}#{author.discriminator}</span>
						</div>
					) : null}
					
					<div className="content">{content}</div>
				</div>
			</div>
		);
	}
}

export default withRouter(Message);
