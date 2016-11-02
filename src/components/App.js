import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Sidebar from './sidebar/Sidebar';

class App extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <MuiThemeProvider>
                <div>
                    <AppBar title="Restaurant Reviewer 3.0" iconClassNameLeft="app-icon"/>
                    <div>
                        <Sidebar />
                        <div className="main">
                            {this.props.children}
                        </div>
                    </div>
                </div>
            </MuiThemeProvider>
        );
    }
}

App.propTypes = {
    children: PropTypes.object
};

export default connect()(App);
