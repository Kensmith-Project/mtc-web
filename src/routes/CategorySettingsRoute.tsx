import React from 'react';
import { Route, RouteComponentProps } from 'react-router';
import CategorySettings from '../Pages/CategorySettings';

const CategorySettingsRoute: React.FC<RouteComponentProps> = ({ match }) =>{

    return(
        // here's a nested div
    <div>
        {/* here's a nested Route, match.url helps us make a relative path */}
        <Route path={match.url} exact component={CategorySettings} />
        {/* <Route path={match.url + "/add"} component={AddCategory} /> */}
    </div>
    )
}

export default CategorySettingsRoute;