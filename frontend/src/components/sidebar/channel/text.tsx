import * as React from 'react';

import '../../../../scss/main.scss';

import { Component, ReactNode } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import { Snowflake } from '../../../utils';

export interface TextChannelProps extends RouteComponentProps {
	id: Snowflake;
	name: string;
	selected: boolean;

	onSelect?: (component: TextChannel, id: Snowflake) => void;
}

export class TextChannel extends Component<TextChannelProps> {
	public constructor(props: TextChannelProps) {
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
			name,
			selected
		}: TextChannelProps = this.props;

		return (
			<div
				className={`channel-sidebar-container${selected ? ' channel-sidebar-container--selected' : ''}`}
				onClick={this.onSelect}
			>
				<span className="channel-sidebar-icon material-icons-round">#</span>
				<span className="channel-sidebar-name">{name}</span>
				<span className="channel-sidebar-edit material-icons-round">settings</span>
			</div>
		);
	}
}

export default withRouter(TextChannel);
