import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { open } from './actions';

export interface NavProps {
    name: string;
    openAction(streamId: string): void;
}

interface NavState {
}

const mapStateToProps = (state) => {
debugger;
    return {
     name: state.navigation.name
    }
}

const mapDispatchToProps = (dispatch) => ({
    openAction: (streamId: string) => dispatch(open(streamId))
});

// const mapDispatchToProps = (dispatch) => bindActionCreators({
//     openAction: open
// }, dispatch);

export class Nav extends React.Component<NavProps, NavState> {
    constructor(props: NavProps) {
        super(props);
    }

    render() {
        return <button onClick={this.onClick.bind(this)}>Navigation</button>
    }

    onClick() {
        debugger;
        this.props.openAction('3');
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
