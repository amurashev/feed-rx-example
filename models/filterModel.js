var FilterModel = Backbone.Model.extend({

    defaults: {
        category_id: 'all',
        type: 'time',
        time: 'today',
        photo: false,
        text: '',
        offset: 0,
        limit: 10
    },

    initialize() {

    },

    getFilter(){
        var str = {};
        _.each(this.toJSON(), (val, param) => {
            str[param] = val;
        });
        return str;
    },

    getUrl(){
        return main.urls.questions + '?' + jQuery.param(this.getFilter());
    }

} );

export default FilterModel;
