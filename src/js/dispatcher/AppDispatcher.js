var Dispatcher = require('flux').Dispatcher;
var assigne = require('object-assign');

var AppDispatcher = assigne(new Dispatcher(),{
    handleViewAction : function(action){
        var payload = {
            source : 'VIEW_ACTION',
            action : action
        }
        this.dispatch(payload);
    }
});

module.exports = AppDispatcher;