import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import * as grid from '../grid';
import { IOpenAction } from '../grid';

export interface PassedProps {
    navItems: Array<string>;
}

interface StateProps {
}

interface DispatchProps {
    openAction(streamId: string): IOpenAction
}

type NavProps = PassedProps & StateProps & DispatchProps;

interface NavState {
}

const mapStateToProps = (state: any, ownProps: PassedProps): StateProps => {
    return {
    }
}

const mapDispatchToProps = (dispatch: Dispatch<any>): DispatchProps => {
    return {
        openAction: (streamId: string) => dispatch(grid.actions.open(streamId))
    }
};

class Navigation extends React.Component<NavProps, NavState> {
    constructor(props: NavProps) {
        super(props);
    }

    render() {
        var divStyle = {
            border: '2px solid black',
            margin: '2px',
            padding: '2px'
        }
        return (
            <div style={divStyle}>
                <label>Navigation</label>
                <div>
                    {this.getNavItems()}
                </div>
            </div>
        );
    }

    getNavItems() {
        let chats = []
        this.props.navItems.forEach((streamId) => {
            let chat = <button onClick={this.onClick.bind(this,streamId)}
                               key={streamId}>{streamId}</button>
            chats.push(chat);
        });
        return chats;
    }

    onClick(streamId) {
        this.props.openAction(streamId);
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
