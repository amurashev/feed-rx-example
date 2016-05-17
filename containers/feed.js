import React from 'react';

import Question from './question';

export default class extends React.Component {

    constructor(){
        super();

    }

    render() {

        var notQuestionsTemplate = '';
        if(this.props.questions.length == 0) {
            notQuestionsTemplate = <p className="no-questions">No records for this search</p>
        }


        return <div id="question-feed">
            {notQuestionsTemplate}

            {this.props.questions.map(
                (question, i) => <Question key={i} question={question} />
            )}
        </div>
    }
}

