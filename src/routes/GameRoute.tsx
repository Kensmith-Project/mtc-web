import React from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router';
import GamePage from '../Pages/GamePage';
import NotFoundPage from '../Pages/NotFoundPage';
import PerformancePage from '../Pages/PerformancePage';

const GameRoute: React.FC<RouteComponentProps> = ({ match }) =>{

    return(
        // here's a nested div
        <div>
            <Switch>
                {/* here's a nested Route, match.url helps us make a relative path */}
                <Route path={match.url} exact component={GamePage} />
                <Route path={match.url + "/review"} component={PerformancePage} />
                <Route path='*' exact={true} component={NotFoundPage} />
                {/* <Route path={match.url + "/game"} component={CountDownScreen} /> */}
            </Switch>
        </div>
    )
}

export default GameRoute;