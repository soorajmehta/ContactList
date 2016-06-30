var AppActions = require('../actions/AppActions');
var firebaseDB = require('./firebase');

module.exports = {
    saveContact:function(contact){
        firebaseDB.ref('contacts').push(contact);
    },
    
    getContacts:function(){        
        firebaseDB.ref('contacts').on('value',function(snapshot){
            var contacts = [];
           snapshot.forEach(function(childSnapshot){              
               var contact = {
                   id: childSnapshot.key,
                   name: childSnapshot.val().name,
                   phone: childSnapshot.val().phone,
                   email: childSnapshot.val().email
               };
                              
               contacts.push(contact);
                               
            });          
           
            AppActions.receiveContacts(contacts);
        });
    },
    
    removeContact : function(contactId){
        firebaseDB.ref('contacts/' + contactId).remove();
    },
    
    updateContact: function(contact){
        var updatedContact =  {
            name: contact.name,
            phone : contact.phone,
            email: contact.email
        }
        console.log(updatedContact);
        firebaseDB.ref('contacts/' + contact.id).update(updatedContact);
    }
}