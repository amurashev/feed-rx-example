import React from 'react';

export default class extends React.Component {

    constructor(){
        super();
    }

    componentDidMount() {
        $('#filter_category' + ', ' + '#filter_type' + ', ' + '#filter_time').selectpicker({
            size: 9,
            style: 'btn-trans site-select'
        });
    }

    changeCategory() {
        this.props.filter.set('category_id', this.refs.filter_category.value);
        this.getNewFeed();
    }

    changeType() {
        this.props.filter.set('type', this.refs.filter_type.value);
        this.getNewFeed();
    }

    changeTime() {
        this.props.filter.set('time', this.refs.filter_time.value);
        this.getNewFeed();
    }

    changePhoto() {
        this.props.filter.set('photo', this.refs.filter_photo.checked);
        this.getNewFeed();
    }

    changeText() {
        this.props.filter.set('text', this.refs.filter_text.value);
        this.getNewFeed();
    }


    getNewFeed(){
        this.props.filter.trigger('filter');
    }



    render() {
        const categories = renderCategories(main.categories);

        return <div id="filter" className="clearfix">
                    <div className="filter-block">
                        <select id="filter_category" ref="filter_category" title="Category" data-width="fit"
                                defaultValue={this.props.filter.get('category_id')} onChange={e => this.changeCategory() }>
                            <option value="all">All categories</option>
                            { categories }
                        </select>

                        <select id="filter_type" ref="filter_type" title="Type" data-width="fit"
                                defaultValue={this.props.filter.get('type')} onChange={e => this.changeType() }>
                            <option value="time">By time</option>
                            <option value="like">By like</option>
                            <option value="vote">By vote</option>
                        </select>

                        <select id="filter_time" ref="filter_time" title="Time"  data-width="fit"
                                defaultValue={this.props.filter.get('time')} onChange={e => this.changeTime() }>
                            <option value="today">Today</option>
                            <option value="week">By week</option>
                            <option value="month">By month</option>
                        </select>

                        <div className="btn-group filter-photo-block">
                            <div className="checkbox">
                                <label>
                                    <input id="filter_photo" ref="filter_photo" type="checkbox"
                                       defaultChecked={this.props.filter.get('photo')}  onChange={e => this.changePhoto() } />Only photo
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="btn-group search-input-div">
                        <div>
                            <i className="material-icons mi">search</i>
                            <input id="filter_text" ref="filter_text" type="text" className="search-input input-trans"
                               placeholder="Search" defaultValue={this.props.filter.get('text')}  onChange={e => this.changeText() }/>
                        </div>
                    </div>

                </div>
    }
}

const renderCategories = cats => {
    return cats.map(cat => optionTemplate(cat));
};

const optionTemplate = cat => (
    <option key={cat.id} value={cat.id}>{cat.name}</option>
);