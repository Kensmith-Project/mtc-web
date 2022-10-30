import React from 'react';
import { Route, RouteComponentProps } from 'react-router';
import AddQuestionPage from '../Pages/AddQuestionPage';
import NotFoundPage from '../Pages/NotFoundPage';
import QuestionSettings from '../Pages/QuestionSettings';

const QuestionsSettingsRoute: React.FC<RouteComponentProps> = ({ match }) =>{

    return(
        // here's a nested div
    <div>
        {/* here's a nested Route, match.url helps us make a relative path */}
        <Route path={match.url} exact component={QuestionSettings} />
        <Route path={match.url + '/add'} exact component={AddQuestionPage} />

        {/* <Route path='*' exact={true} component={NotFoundPage} /> */}
        {/* <Route path={match.url + "/add"} component={AddQuestion} />
        <Route path={match.url + "/upload"} component={AddCategories} /> */}
    </div>
    )
}

export default QuestionsSettingsRoute;