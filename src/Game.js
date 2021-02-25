import logo from './logo.svg';
import './App.css';
import {Component} from 'react';
import {ListGroup, Container, Row, Col, Button, Form} from 'react-bootstrap';
import DEFAULT_ALTERNATIVES from './default-alternatives.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import COLORS from './Colors.js';

class Game extends Component {
    constructor(props) {
        super(props);
        let ret = [];
        let init = DEFAULT_ALTERNATIVES; 
        for (let i = 0; i < init.length; ++i){
            ret.push(this.makeCard(init[i])); 
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.lockBoard = this.lockBoard.bind(this);

        let board = this.defaultBoard(5,5);
        console.log(board);
        this.state = {isLocked: false, currFocus : "", focusedText : "", currentInput: "", board: board, currentItems: ret};
    }
    
    defaultBoard(nR, nC) {
        let b = []
        for (let r = 0; r < nR; ++r) {
            let inner = []
            for(let c = 0; c < nC; ++c) {
               inner.push("TOM"); 
            }
            b.push(inner);
        }
        return b;
    }
    setFocused(event) {
        console.log(event.target);
        if(this.state.currFocus) {
            this.state.currFocus.style.background = '';
        }
        event.target.style.background = COLORS['green'];
        console.log(event.target.id);
        this.setState({...this.state, currFocus: event.target, focusedText: event.target.id});
    }


    setSelected(event) {
        if (this.state.locked) {
            if (event.target.style.background === COLORS['pink']) {
                event.target.style.background = "white";
            } else {
                event.target.style.background = COLORS['pink'];
            }
        } else {
            //let coord = event.target.value.split(" ");
            let coord = event.target.id.split(" ").map(str => parseInt(str));
            let boardCpy = this.state.board;
            boardCpy[coord[0]][coord[1]] = this.state.focusedText;
            this.setState({...this.state, board: boardCpy});
            //event.target.value = this.state.focusedText;
        }
    }
    
    lockBoard() {
        this.setState({...this.state, locked: true});
    }

    handleSubmit(event) {
        event.preventDefault();
        if(this.state.currentInput !== '') {
            console.log(this.state.currentInput);
            this.updateCards(this.state.currentInput);
        }
        event.target.reset(); // Reset form input
    }

    handleChange(event) {
        this.setState({...this.state, currentInput : event.target.value});
    }


    makeCard(txt) {
        return <ListGroup.Item id={txt} onClick={(txt) => this.setFocused(txt)}> {txt} </ListGroup.Item>;
    }

    makeBoardCard(txt, r, c) {
        if (txt === '')
            txt = 'TOM';
        return <ListGroup.Item className="boardCard" id={r.toString() + " " + c.toString() } onClick={(e) => this.setSelected(e)}> {txt} </ListGroup.Item>
    }


    updateCards(newCard) {
        this.setState( {
            ...this.state, 
            currentInput: '',
            currentItems: [this.makeCard(newCard), ... this.state.currentItems],
        });
    }

    renderBoard() {
        let builder = [] 
        for (let i = 0; i < 5; ++i) {
            let inner = [];
            for (let k = 0; k < 5; k++) {
                inner.push(<Col className="coloumn"> {this.makeBoardCard(this.state.board[i][k], i, k)} </Col>);    
            }

            builder.push(<Row> {inner} </Row>);
        }
        return builder;
    }
    render() {
        return (
            <div className="test">
                <form className="addCardForm" onSubmit={this.handleSubmit}>
                    <label>
                        <h1> Skapa ny bingobricka </h1>
                    </label>

                    <input className="submitField" type="text" onChange={this.handleChange}/>
                    <input className="submitButton" value="Skapa bricka" type="submit"/>
                </form>
            <div className="cardContainer">
            <ListGroup variant="flush"className="cardAlternatives">
                {this.state.currentItems}
            </ListGroup> 
            </div>
            <div className="boardContainer">
                <Container maxWidth="sm"> 
                    {this.renderBoard()}
                </Container>
            </div>

            <div>
                <button className="butt" onClick={this.lockBoard}> SPELA </button>
            </div>
            </div>
        );
    }
}

export default Game;
