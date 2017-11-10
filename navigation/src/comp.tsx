import * as React from 'react';
import { connect, connectAdvanced } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';

import { interfaces, bindDependencies } from 'sdk';

export interface IStateProps {
}

export interface IDispatchProps {
    openAction(streamId: string): interfaces.grid.IOpenAction
}

type NavProps = interfaces.nav.IPassedProps & IStateProps & IDispatchProps;

interface NavState {
}


const mapStateToProps = (state: any, ownProps: interfaces.nav.IPassedProps): IStateProps => {
    return {
    }
}

let mapDispatchToProps = (dispatch: Dispatch<any>, ownProps: interfaces.nav.IPassedProps, getIGrid: () => interfaces.grid.IGrid): IDispatchProps => {
    let grid = getIGrid();
    return {
        openAction: (streamId: string) => dispatch(grid.open(streamId))
    }
};
let newMapDispatchToProps = bindDependencies(mapDispatchToProps, [ interfaces.Symbols.IGrid ] );

class Navigation extends React.Component<NavProps, NavState> {
    constructor(props: NavProps) {
        super(props);
    }

    render() {
        let divStyle = {
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

export default connect(mapStateToProps, newMapDispatchToProps)(Navigation);
