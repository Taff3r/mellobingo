import React, {Component} from 'react'
class InputForm extends Component {
    constructor(props) {
        super(props);
        this.state = {currentInput: ''}
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.callBackToParent = props.callback;
    }
    
    handleChange(event) {
        this.setState({currentInput : event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        this.callBackToParent(this.state.currentInput);
    }


    render() {
        return (
           <form onSubmit={this.handleSubmit}>
                    <label>
                        <h1> Ny bingobricka: </h1>

                        <input type="text" value={this.state.currentInput} onChange={this.handleChange}/>
                    </label>
                <input type="submit" value="Submit"/>
            </form>
        ); 
    }
}

export default InputForm;
