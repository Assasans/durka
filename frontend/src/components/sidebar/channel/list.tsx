import * as React from 'react';

import '../../../../scss/main.scss';

import { Component, ReactNode } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import { Snowflake } from '../../../utils';

import { Channel } from './channel';
import { ScrollSpace } from '../../scroll';

export interface ChannelListProps extends RouteComponentProps {
	onSelect?: (component: Channel, id: Snowflake) => void;
}

export class ChannelList extends Component<ChannelListProps> {
	public constructor(props: ChannelListProps) {
		super(props);

		this.onSelect = this.onSelect.bind(this);
	}

	private onSelect(component: Channel, id: Snowflake): void {
		if(this.props.onSelect) {
			this.props.onSelect(component, id);
		}
	}

	public render(): ReactNode {
		const {}: ChannelListProps = this.props;

		const children = React.Children.map(this.props.children, (child: ReactNode) => {
			if(React.isValidElement(child)) {
				return React.cloneElement(child, {
					onSelect: this.onSelect
				});
			}
			return child;
		});

		return (
			<div className="channels-container">
				{children}
					
				<ScrollSpace />
			</div>
		);
	}
}

export default withRouter(ChannelList);
