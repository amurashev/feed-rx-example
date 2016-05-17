import React from 'react';

export default class extends React.Component {


    render() {

        const answer = this.props.answer;

        let linksTemplate;
        if(answer.get('links').length) {
            var ol = answer.get('links').map((link, i) => <li>
                <a href={link} target="_blank"><i className="material-icons mi">link</i> {link}</a></li> );
            linksTemplate = <ul className="answer-links list-unstyled" >{ol}</ul>;
        }

        var imagesTemplate;
        if(answer.get('images').length) {
            var im = answer.get('images').map((image, i) =>
                <div key={i} className="answer-image-block">
                    <img src={image.get('path')} />
                </div>
            );
            imagesTemplate = <div className="answer-images clearfix">{im}</div>;
        }


        var answerTemplate;
        if(answer.get('you_choice')) {
            answerTemplate =
                <div className="answer-progress">
                    <div className="bar" style={{
                        width: answer.get('percent') + '%',
                        backgroundPosition: 0 + ' ' + answer.get('percent') + '%'
                    }}></div>
                    <span className="value">{answer.get('percent') + '%'}</span>
                </div>

        } else {
            answerTemplate = <i className="material-icons answer-choose" onClick={e => this.choise(e)}>check</i>;
        }

        /** IF NOT TEXT NEED VERTICAL SPACE */
        //var noneNameSpike = (text.length == 0 && youChoice) ? <span className="answer-none-spike">&nbsp;</span> : '';

        return <div className="answer">
            <div className="answer-info">
                <span className="answer-name">{answer.get('text')}</span>
                { imagesTemplate }
                { linksTemplate }
                { answerTemplate }
            </div>
        </div>
    }

    choise(e){
         this.props.choiseFunc(this.props.answer.get('id'));
    }
}