import * as React from 'react';

import '../../../../scss/main.scss';

import { Component, ReactNode } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import { Snowflake } from '../../../utils';

export interface GuildProps extends RouteComponentProps {
	id: Snowflake;
	name: string;
	icon: string;
	selected: boolean;

	onSelect?: (component: Guild, id: Snowflake) => void;
}

export class Guild extends Component<GuildProps> {
	public constructor(props: GuildProps) {
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
			icon,
			selected
		}: GuildProps = this.props;

		return (
			<div
				className="guild"
			 	onClick={this.onSelect}
			>
				{selected ? (
					<span className="guild-pill"></span>
				) : null}
				<img className="guild-icon" src={icon} />
			</div>
		);
	}
}

export default withRouter(Guild);
