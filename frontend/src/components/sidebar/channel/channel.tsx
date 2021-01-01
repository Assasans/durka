import * as React from 'react';

import '../../../../scss/main.scss';

import { Component, ReactNode } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import { Snowflake } from '../../../utils';

export interface ChannelProps extends RouteComponentProps {
	id: Snowflake;
	name: string;

	onSelect?: (component: Channel, id: Snowflake) => void;
}

export class Channel extends Component<ChannelProps> {
	public constructor(props: ChannelProps) {
		super(props);

		this.onSelect = this.onSelect.bind(this);
	}

	private onSelect(event: React.MouseEvent<HTMLDivElement, MouseEvent>): void {
		if(this.props.onSelect) {
			this.props.onSelect(this, this.props.id);
		}
	}

	public render(): ReactNode {
		const {
			id,
			name
		}: ChannelProps = this.props;

		return (
			<div
				className="channel-sidebar-container"
				onClick={this.onSelect}
			>
				<span className="channel-sidebar-name">{name}</span>
				<span className="channel-sidebar-edit material-icons-round">settings</span>
			</div>
		);
	}
}

export default withRouter(Channel);
