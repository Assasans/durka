import * as React from 'react';

import '../../../../scss/main.scss';

import { Component, ReactNode } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import { Snowflake, Nullable } from '../../../utils';

export interface TextChannelProps extends RouteComponentProps {
	id: Snowflake;
	name: string;
	topic: Nullable<string>;
}

export interface TextChannelState {
}

export class TextChannel extends Component<TextChannelProps, TextChannelState> {
	public constructor(props: TextChannelProps) {
		super(props);

		this.state = {
		};
	}

	public render(): ReactNode {
		const {
			id,
			name,
			topic
		}: TextChannelProps = this.props;

		return (
			<div className="channel-topbar-container">
				<span className="channel-icon material-icons-round">#</span>
				<span className="channel-name">{name}</span>
				
				{topic !== null ? (
					<>
						<span className="channel-topic-divider"></span>
						<span className="channel-topic">{topic}</span>
					</>
				) : null}
			</div>
		);
	}
}

export default withRouter(TextChannel);
