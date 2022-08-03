import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import playerDetails from '../Components/playerDetails';
import landingPage from '../Components/landingPage';

class Routes extends Component {
    render() {
        return (
            <React.Fragment>
                <Router>
                    <Switch>
                        <Route exact path="/" component={landingPage} />
                        <Route exact path="/playerDetails" component={playerDetails} />
                        {/* <Route path="*">
                            <PageError />
                        </Route> */}
                    </Switch>
                </Router>
            </React.Fragment>
        )
    }
}


export default Routes;