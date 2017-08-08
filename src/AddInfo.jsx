import React, {
    Component
} from 'react';
import {
    HashRouter as Router,
    Route,
    Link
} from 'react-router-dom'
import io from 'socket.io-client'
let socket = io.connect();


class AddInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name:'',
            birthday:'',
            wishlist_one:'',
            wishlist_two:''
        };
                this.handleChangeName=this.handleChangeName.bind(this);
                this.handleChangeBirth=this.handleChangeBirth.bind(this);
                this.handleChangeWish=this.handleChangeWish.bind(this);
                this.submitForm=this.submitForm.bind(this);

    }
    submitForm(){
        // let birthdayTest=this.state.bithday.split('-');
        // if (birthdayTest[0].length !== 0||2 && birthdayTest[1].length !== 0||2) {
        //     console.log("invalid bday");
        //     return;
        // }

        console.log(this.setState);
        socket.emit('submitNew', {
            message: this.state

        });
    }
    handleChangeName(e){

            let name = e.target.name;
            let value = e.target.value;
            console.log(e.target.name);

                this.setState({
                    name:value
                })

        };
        handleChangeBirth(e){

                let name = e.target.name;
                let value = e.target.value;

                    this.setState({
                        birthday:value
                    })
            };
            handleChangeWish(e){

                    let name = e.target.name;
                    let value = e.target.value;

                this.setState({
                    wishlist_one:value
                })
                };
    render () {
               console.log(this.state);
    return (

            <div>

             <div id="text-field-group" style={{paddingBottom:'0px', marginTop:'0px'}}>
                <div> Name:</div>
                 <input type="text"
                                 inputId="define-rooms-input"
                                 labelId="define-rooms-label"
                                 label="Name:"
                                 field="asset_name"
                                 placeholder="Name:"
                                 value={this.state.name}
                                 onChange={this.handleChangeName}
                 />
                 <div> Birthday </div>
                 <input type="text"
                                 inputId="define-rooms-input"
                                 labelId="define-rooms-label"
                                 label="Birthday:"
                                 field="asset_name"
                                 placeholder="Birthday:"
                                 value={this.state.birthday}
                                 onChange={this.handleChangeBirth}
                 />
                 <div> Wishlist </div>
                 <input type="text"
                                 inputId="define-rooms-input"
                                 labelId="define-rooms-label"
                                 label="Wishlist:"
                                 field="asset_name"
                                 placeholder="Wishlist Address"
                                 value={this.state.wishlist_one}
                                onChange={this.handleChangeWish}
                 />

             </div>


             <button
                 style={{marginTop:'20px', width:'inherit', display:'inline', marginRight:'20px'}}
                 className="orange-button"
                  onClick={() => this.submitForm()}
                 id="define-rooms-btn"
             >
                 Submit
             </button>
             </div>

)
    }
}

export default AddInfo
