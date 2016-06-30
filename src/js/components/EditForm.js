var React = require('react');
var AppActions = require('../Actions/AppActions');
var AppStore = require('../stores/AppStore');


var EditForm = React.createClass(
    {
       
        render: function(){           
            return(
                <div className="well">
                    <h3>Edit contact</h3>
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <input type="text" ref="name" className="form-control" 
                            value={this.props.contactToEdit.name}
                            onChange={this.handleChange.bind(this,'name')}
                            placeholder="Add Contact Name" />
                        </div>
                        <div className="form-group">
                            <input type="text" ref="phone" className="form-control" 
                            value={this.props.contactToEdit.phone} 
                            onChange={this.handleChange.bind(this,'phone')}
                            placeholder="Add Contact Phone" />
                        </div>
                        <div className="form-group">
                            <input type="text" ref="email" className="form-control" 
                            value={this.props.contactToEdit.email} 
                            onChange={this.handleChange.bind(this,'emial')}
                            placeholder="Add Contact Email" />
                        </div>  
                        <button type="submit" className="btn btn-primary">Update</button>                      
                    </form>
                </div>
            )
        },
        handleChange:function(fieldname,event){
           var  newState = event.target.value;
           var selected = this.state.selected;
           selected.name = newState;
           this.setState({selected:selected});
        },
        
        handleSubmit:function(e){
            e.preventDefault();
            
            var contact = {
                id: this.props.contactToEdit.id,
                name: this.refs.name.value.trim(),
                phone: this.refs.phone.value.trim(),
                email: this.refs.email.value.trim(),
            };
            
            AppActions.updateContact(contact);
        }
        
               
    }
);

module.exports = EditForm;