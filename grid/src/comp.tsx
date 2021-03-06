import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { chatsSelector } from './selectors';

import { interfaces, injectInterface } from 'sdk';

export interface IStateProps {
    chats: Array<string>;
}

export interface IDispatchProps {
}

export type IGridProps = interfaces.grid.IPassedProps & IStateProps & IDispatchProps;

export interface IGridState {
}

const mapStateToProps = (state: any, ownProps: interfaces.grid.IPassedProps): IStateProps => {
    return {
        chats: chatsSelector(state)
    }
}

const mapDispatchToProps = (dispatch: Dispatch<any>): IDispatchProps => {
    return {
    }
};

class Grid extends React.Component<IGridProps, IGridState> {

    @injectInterface(interfaces.Symbols.IChat)
    private chat: interfaces.chat.IChat;

    constructor(props: IGridProps) {
        super(props);
        // this.chat = registry.get<interfaces.chat.IChat>(interfaces.chat.IChatSymbol);
    }

    render() {
        let divStyle = {
            border: '2px solid black',
            margin: '2px',
            padding: '2px'
        }
        let chats = this.getChats();
        if (!chats || chats.length === 0) {
            chats = [ <div key={1}>Empty</div> ]
        }
        return (
            <div style={divStyle}>
                <label>Grid</label>
                <div>{chats}</div>
            </div>
        );
    }

    getChats() {
        let chats = [];
        this.props.chats.forEach((streamId) => {
            chats.push(<this.chat.Component key={streamId} streamId={streamId}/>);
        })
        return chats;
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Grid);
