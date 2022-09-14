import React from 'react';
import { Route, RouteComponentProps } from 'react-router';
import CategorySettingsRoute from './CategorySettingsRoute';
import QuestionsSettingsRoute from './QuestionsSettingsRoute';



// when the url matches `/settings` this component renders
const SettingsRoute: React.FC<RouteComponentProps> = ({ match }) => (
    // here's a nested div
    <div>
      {/* here's a nested Route, match.url helps us make a relative path */}
        <Route path={match.url + "/categories"} component={CategorySettingsRoute} />
        <Route path={match.url + "/questions"} component={QuestionsSettingsRoute} />
    </div>
);

export default SettingsRoute;