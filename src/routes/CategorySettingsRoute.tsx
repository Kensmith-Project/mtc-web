import React from 'react';
import { Route, RouteComponentProps } from 'react-router';
import AddChallengePage from '../Pages/AddChallengePage';
import CategorySettings from '../Pages/CategorySettings';
import NotFoundPage from '../Pages/NotFoundPage';

const CategorySettingsRoute: React.FC<RouteComponentProps> = ({ match }) =>{

    return(
        // here's a nested div
    <div>
        {/* here's a nested Route, match.url helps us make a relative path */}
        <Route path={match.url} exact component={CategorySettings} />
        <Route path={match.url + '/add'} exact component={AddChallengePage} />
        <Route path='*' exact={true} component={NotFoundPage} />
        {/* <Route path={match.url + "/add"} component={AddCategory} /> */}
    </div>
    )
}

export default CategorySettingsRoute;