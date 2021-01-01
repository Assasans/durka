import * as React from 'react';

import '../../../../scss/main.scss';

import { Component, ReactNode } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import { Snowflake } from '../../../utils';

import { Guild } from './guild';
import { ScrollSpace } from '../../scroll';

export interface GuildListProps extends RouteComponentProps {
	onSelect?: (component: Guild, id: Snowflake) => void;
}

export class GuildList extends Component<GuildListProps> {
	public constructor(props: GuildListProps) {
		super(props);

		this.onSelect = this.onSelect.bind(this);
	}

	private onSelect(component: Guild, id: Snowflake): void {
		if(this.props.onSelect) {
			this.props.onSelect(component, id);
		}
	}

	public render(): ReactNode {
		const {}: GuildListProps = this.props;

		const children = React.Children.map(this.props.children, (child: ReactNode) => {
			if(React.isValidElement(child)) {
				return React.cloneElement(child, {
					onSelect: this.onSelect
				});
			}
			return child;
		});

		return (
			<div className="guilds-container">
				{children}
					
				<ScrollSpace />
			</div>
		);
	}
}

export default withRouter(GuildList);
