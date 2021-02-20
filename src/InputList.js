import React, {Component} from 'react'
import {ListGroup} from 'react-bootstrap'
class InputList extends Component {
    constructor(props) {
        super(props);
        console.log(props.params);
        //this.makeLgCards(props.params.currentInputs);
        this.updateItems = this.updateItems.bind(this);
       
        // Initial items
        let ret = [];
        for (let i = 0; i < props.params.currentInputs.length; ++i){
            ret.push(<ListGroup.Item> {props.params.currentInputs[i]} </ListGroup.Item>); 
        }
        this.state = {currentItems : ret};
    }

    updateItems(input) {
        console.log("Making new cards!");
        console.log(input);
        let ret = [];
        for (let i = 0; i < input.length; ++i){
            ret.push(<ListGroup.Item> {input[i]} </ListGroup.Item>); 
        }
        this.setState({currentItems: ret});
    } 

    componentDidUpdate(prevProps) {
        console.log("Receiving new props!");
        console.log(this.state.currentItems);
        this.render();
        /*
        let input = prevProps.params.currentInputs;
        let ret = [];
        for (let i = 0; i < input.length; ++i){
            ret.push(<ListGroup.Item> {input[i]} </ListGroup.Item>); 
        }
        this.setState( {currentItems: ret} );
        */
    }
    render() {
        return (
            <ListGroup>
            {this.state.currentItems}
            </ListGroup> 
        ); 
    }
}

export default InputList;
