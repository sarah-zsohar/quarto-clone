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

class Randomizer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name:'',
            birthday:'',
            wishlist_one:'',
            wishlist_two:''
        };
    }
            this.handleChange=this.handleChange.bind(this);
        handleChange = (e) => {
            let name = e.target.name;
            let value = e.target.value;
            let nameInState =String(this.state.name);

            if (value.length > 20) {
                this.setState({
                    error:'Too many characters'
                })
            }else{
                this.setState({
                    error:''
                })
            }
                this.setState({
                    name:value
                })
        };
    render () {
    return (
            <div>

             <div id="text-field-group" style={{paddingBottom:'0px', marginTop:'0px'}}>
                 <input type="text"
                     inputId="define-rooms-input"
                     labelId="define-rooms-label"
                     label="Name"
                     field="asset_name"
                     value={this.state.name}
                     onChange={this.handleChange}
                 />
             </div>
             <div style={{marginTop:'10px'}}>Original Asset ID: {originalNameFirstPart}<span style={{color:'red', fontSize:'18px'}}>{originalNameSecondPart}</span></div>
             <div className="button-center">
             <button
                 style={{marginTop:'20px', backgroundColor:'red', width:'inherit', display:'inline', marginRight:'20px'}}
                 className="orange-button"

                 id="define-rooms-btn"
             >
                 Cancel
             </button>
             <button
                 style={{marginTop:'20px', width:'inherit', display:'inline', marginRight:'20px'}}
                 className="orange-button"

                 id="define-rooms-btn"
             >
                 Save
             </button>
             </div>
            </div>
)
    }
}

export default Randomizer
