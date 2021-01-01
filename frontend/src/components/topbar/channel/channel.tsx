import * as React from 'react';

import '../../../../scss/main.scss';

import { Component, ReactNode } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import { Snowflake } from '../../../utils';

export interface ChannelProps extends RouteComponentProps {
	id: Snowflake;
	name: string;
}

export interface ChannelState {
}

export class Channel extends Component<ChannelProps, ChannelState> {
	public constructor(props: ChannelProps) {
		super(props);

		this.state = {
		};
	}

	public render(): ReactNode {
		const {
			id,
			name
		}: ChannelProps = this.props;

		return (
			<div className="channel-topbar-container">
				<span className="channel-icon material-icons-round">#</span>
				<span className="channel-name">{name}</span>
			</div>
		);
	}
}

export default withRouter(Channel);
