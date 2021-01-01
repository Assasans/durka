import * as React from 'react';

import '../../../../scss/main.scss';

import { Component, ReactNode } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import { ScrollSpace } from '../../scroll';

export interface MessageListProps extends RouteComponentProps {
}

export class MessageList extends Component<MessageListProps> {
	public render(): ReactNode {
		const {}: MessageListProps = this.props;

		return (
			<div className="messages-container">
				{this.props.children}
					
				<ScrollSpace />
			</div>
		);
	}
}

export default withRouter(MessageList);
