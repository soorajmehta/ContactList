var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/Appconstants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var AppAPI = require('../utils/appAPI.js');

var CHANGE_EVENT = 'change';

var _contacts = [];
var _contact_to_edit = '';


var AppStore = assign({},EventEmitter.prototype,{
    
    saveContact: function(contact){
        _contacts.push(contact);       
    },
    
    setContact:function(contacts){
        _contacts = contacts;
    },
    
    getContacts: function(){        
      return _contacts;      
    },
    
    removeContact(contactId){        
      var index = _contacts.findIndex(x => x.id === contactId);      
      _contacts.splice(index,1);
    },
    
    setContactToEdit : function(contact){
        _contact_to_edit=contact;
    },
    
    getContactToEdit:function(){
        return _contact_to_edit;
    },
    
    updateContact : function(contact){
        for (var index = 0; index < _contacts.length; index++) {
            if(_contacts[index].id == contact.id){
                _contacts.splice(index,1);
                _contacts.push(contact);
            }   
        }
    },
    
    emitChange: function(){
        this.emit(CHANGE_EVENT);
    },
    addChangeListener: function(callback){
        this.on('change',callback);
    },
    removeChangeListener: function(callback){
        this.removeListener('change',callback);
    }
});


AppDispatcher.register(function(payload){
    var action = payload.action;
    switch(action.actionType){ 
        case AppConstants.SAVE_CONTACT:            
            
            //save to store
            AppStore.saveContact(action.contact);
            
            //save to api
            AppAPI.saveContact(action.contact);
            
            AppStore.emit(CHANGE_EVENT);    
       
        break;       
        
        case AppConstants.RECEIVE_CONTACTS :
            //save to store
            AppStore.setContact(action.contacts);
            
            AppStore.emit(CHANGE_EVENT);    
         
            
        break;   
        
        case AppConstants.REMOVE_CONTACT:
            console.log('removing contact...')
            
            //store remove
            AppStore.removeContact(action.contactId);
            
            //api remove
            AppAPI.removeContact(action.contactId); 
            
            AppStore.emit(CHANGE_EVENT);    
             
        break;    
        
        case AppConstants.EDIT_CONTACT:
            //store remove
            AppStore.setContactToEdit(action.contact);

            AppStore.emit(CHANGE_EVENT);    
             
        break; 
        
         case AppConstants.UPDATE_CONTACT:
            console.log('updating contact...')
            
            //store update
            AppStore.updateContact(action.contact);
            
            //api update
            AppAPI.updateContact(action.contact); 
            
            AppStore.setContactToEdit('');
            
            AppStore.emit(CHANGE_EVENT);    
             
        break;       
            
    }
    
    return true;
});

module.exports = AppStore
