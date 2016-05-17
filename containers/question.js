import React from 'react';

import UserInfo from './userInfo';
import Image from './image';
import Answer from './answer'

export default class extends React.Component {    

    componentWillMount() {
        this._isMounted = true;
        window.addEventListener('resize', () => this.windowResize(), true);
        this.setState({
            answers: this.props.question.get('answers'),
            isLiked: this.props.question.get('likes_is_liked'),
            likeCount: this.props.question.get('likes_count'),
            images: this.props.question.get('images')
        });

        this.props.question.get('images').setSize($('#question-feed').width() - 30);
    }

    componentWillUnmount() {
        this._isMounted = false;
    }


    render() {

        const question = this.props.question;
        const link = main.urls.questionPage + '/' + question.get('link');
        const categoryName = main.categories.filter((cat) => cat.id == question.get('category_id'))[0].name; //FIXME
       

        let linksTemplate;
        if(question.get('links').length) {
            var ol = question.get('links').map((link, i) => <li><a href={link} target="_blank"><i className="material-icons mi">link</i> {link}</a></li> );
            linksTemplate = <ul className="question_links list-unstyled" >{ol}</ul>;
        }

        var imagesTemplate;
        if(this.state.images.length) {
            var im = this.state.images.map((image, i) => <Image key={i} image={image} />);
            imagesTemplate = <div className="question_images clearfix" >{im}</div>;
        }

        var likeButtonTemplate = (!this.state.isLiked) ?
            <i className="material-icons mi"  onClick={e => this.like(e)}>favorite_border</i> :
            <i className="material-icons mi like-button-liked">favorite</i>;


        return <div className="question-layout">
            <div className="question__block">
                <a href={link} className="question-link"><i className="material-icons mi">share</i></a>
                <span className="question-category">{ categoryName }</span>
                <div className="question-name" >{question.get('text')}</div>

                { linksTemplate }
                { imagesTemplate }

                <div className="media user-info">
                    <UserInfo user={question.get('user')} dateNormal={question.get('date_normal')} />
                </div>

                <span className="question-instruments">
                    <span className="likes-block">
                        <span className="like-button">
                            {likeButtonTemplate}
                        </span>
                        <b>{this.state.likeCount}</b>
                    </span>

                    <span className="comments-block">
                        <a href={link + '#comments'} className="">
                            <i className="material-icons mi">comment</i>
                        </a>
                        <b>{question.get('comments_count')}</b>
                    </span>
                </span>
            </div>

            <div className="question__answers__wrapper">
                <div className="question__answers">
                    {question.get('answers').map(
                        (answer, i) => <Answer key={i} answer={answer} choiseFunc={answer_id => this.choiseAnswer(answer_id)} />
                    )}
                </div>
            </div>

        </div>
    }


    like() {
        this.props.question.like().then(likeCount => {
            this.setState({
                isLiked: true,
                likeCount: likeCount
            });
        });
    }

    choiseAnswer(answer_id) {
        this.props.question.answerChoise(answer_id).then(answers => {
            this.setState({
                answers: answers
            });
        });
    }

    windowResize(){

        if(!this._isMounted) return;

        this.props.question.get('images').setSize($('#question-feed').width() - 30);
        this.setState({
            images: this.props.question.get('images'),
        });
    }

}




