import React from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router';
import CategoryPage from '../Pages/CategoryPage';
import NotFoundPage from '../Pages/NotFoundPage';

const ElementaryRoute: React.FC<RouteComponentProps> = ({ match }) =>{

    return(
        // here's a nested div
        <div>
            <Switch>
                {/* here's a nested Route, match.url helps us make a relative path */}
                <Route path={match.url} exact component={CategoryPage} />
                <Route path='*' exact={true} component={NotFoundPage} />
                {/* <Route path={match.url + "/rules"} component={RuleScreen} />
                <Route path={match.url + "/game"} component={CountDownScreen} /> */}
            </Switch>
        </div>
    )
}

export default ElementaryRoute;