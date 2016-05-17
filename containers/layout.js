import React from 'react';
import Filter from './filter';
import Feed from './feed';

import Rx from 'rx-lite';

import FilterModel from '../models/filterModel';

import QuestionCollection from '../../../../common/collections/questionCollection';

export default class extends React.Component {

    constructor(){
        super();

        this.filterModel = new FilterModel();
        this.state = { questions: new QuestionCollection() };


        this.initStream();
    }


    initStream() {

        /**
         * Поток изменения фильтра
         */
        var filterStream = Rx.Observable.fromEvent(this.filterModel, 'filter')
            .startWith(0)
            .debounce(500)
            .do(() => {
                //console.warn('filterStream');
                this.offset = 0;
                this.closeStream = false;
                this.resetQuestions();
            });

        /**
         * Создаю requestStream действующий по клику мышки, и передаю в поток ссылку для запроса
         * Вызываю первый раз
         */
        var scrollStream = Rx.Observable.fromEvent(window, 'scroll')
            .throttle(500)
            .filter((e) => {
                var twoScreens = window.innerHeight * 2;
                return window.pageYOffset + twoScreens > document.body.scrollHeight;
            })
            .filter(() => !this.closeStream && this.offset && this.offset != 0)
            //.do(() => console.warn('scrollStream'));


        var requestStream = Rx.Observable.merge(filterStream, scrollStream)
            //.do(() => console.warn('requestStream'));

        /**
         * Выходной поток. Получаем данные, увеличиваем offset на 10
         */
        var responseStream = requestStream
            .flatMap((x) => Rx.Observable.fromPromise(jQuery.getJSON(this.filterModel.set('offset', this.offset).getUrl())))
            .do((response) => {
                this.offset += 10;
                this.closeStream = (response.length == 0);
            });


        responseStream.subscribe((response) => {
                this.setQuestions(response);
            },
            err => { console.log('Error', err.message); },
            () => { console.log('End'); }
        );
    }


    componentDidMount(){ }

    resetQuestions(){
        var questionsCollection = this.state.questions;
        questionsCollection.reset();
        this.setState({questions: questionsCollection});
    }

    setQuestions(questions) {
        if(!questions.length) return;

        var questionsCollection = this.state.questions;
        questionsCollection.add(questions);
        this.setState({questions: questionsCollection});
    }



    render() {
        return <div>
                <Filter filter={this.filterModel}/>
                <Feed questions={this.state.questions}/>
            </div>
    }
}





//var feed = document.getElementById('question-feed');