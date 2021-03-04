import logo from './logo.svg';
import './App.css';
import {Component} from 'react';
import {ListGroup, Container, Row, Col, Button, Form} from 'react-bootstrap';
import DEFAULT_ALTERNATIVES from './default-alternatives.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import COLORS from './Colors.js';
import PlayingBoard from './PlayingBoard.js';
import {sanitize, linesToJson, cardsToText} from "./FileUtil.js";
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
        this.importFile = this.importFile.bind(this);
        this.selectFile = this.selectFile.bind(this);
        this.exportFile = this.exportFile.bind(this);

        let board = this.defaultBoard(5,5);
        this.state = {
            invalidBoard: false, 
            isLocked: false, 
            currFocus : "", 
            focusedText : "", 
            currentInput: "", 
            board: board,
            currentItems: ret,
            selectedFile: null,
        };
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
        if(this.state.currFocus) {
            this.state.currFocus.style.background = '';
        }
        event.target.style.background = COLORS['green'];
        this.setState({...this.state, currFocus: event.target, focusedText: event.target.id});
    }


    setSelected(event) {
        if (this.state.isLocked) {
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
        for (let i = 0; i < 5; ++i)
            if (this.state.board[i].includes("TOM")) {
                this.setState({...this.state, invalidBoard:true});
                return;
            }
        this.setState({...this.state, isLocked: true});
    }

    handleSubmit(event) {
        event.preventDefault();
        if(this.state.currentInput !== '') {
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
        return  <ListGroup.Item className="boardCard" id={r.toString() + " " + c.toString() } onClick={(e) => this.setSelected(e)}> {txt} </ListGroup.Item>
    }


    updateCards(newCard) {
        this.setState( {
            ...this.state, 
            currentInput: '',
            currentItems: [this.makeCard(newCard), ... this.state.currentItems],
            focusedText: newCard // auto set the new created card as the focused one
        });
    }

    renderBoard() {
        let builder = [] 
        for (let i = 0; i < 5; ++i) {
            let inner = [];
            for (let k = 0; k < 5; k++) {
                inner.push(<Col className="coloumn"> {this.makeBoardCard(this.state.board[i][k], i, k)} </Col>);    
            }

            builder.push(<Row xs="5"> {inner} </Row>);
        }
        return builder;
    }

    validBoardMessage() {
        if (!this.state.invalidBoard) {
            return;
        }
        return (
            <h2 className="msg"> Du har fortfarande tomma brickor! </h2>
        );
    }

    selectFile(event) {
        let file = event.target.files[0];
        this.setState({...this.state, selectedFile: file}); 
    }

    async importFile() {
        if (this.state.selectedFile === null)
            console.log("No file selected!");

        let fileText = await this.state.selectedFile.text();
        let listOfStrings = linesToJson(fileText);
        let cards = listOfStrings.map(line => this.makeCard(line));
        let appended = cards.concat(this.state.currentItems);
        this.setState({...this.state, currentItems: appended});
    }

    async exportFile() {
        const asText = cardsToText(this.state.currentItems);
        const blob = new Blob([asText], {type: 'text/plain'});
        const fileDownloadUrl = URL.createObjectURL(blob);
        let element = document.createElement("a");
        element.href = fileDownloadUrl;
        element.download = "mellobingo-brickor.txt";
        document.body.appendChild(element);
        element.click();
    }

    render() {
        if (!this.state.isLocked) {
            return (
            <div className="test">
                <form className="addCardForm" onSubmit={this.handleSubmit}>
                    <label>
                        <h1> Skapa ny bingobricka </h1>
                    </label>
                    <input className="submitField" type="text" onChange={this.handleChange}/>
                    <input className="submitButton" value="Skapa bricka" type="submit"/>
                </form>
                <div className="fileOptions">
                    <input className="fileSelect" type="file" name="import" onChange={this.selectFile}/>
                    <button className="submitButton" onClick={this.importFile}> Importa brickor </button>
                    <button className="submitButton" onClick={this.exportFile}> Exportera brickor </button>
                </div>
            <div className="cardContainer">
            <ListGroup variant="flush" className="cardAlternatives" fluid>
                {this.state.currentItems}
            </ListGroup> 
            </div>
            <div className="boardContainer">
                <Container fluid> 
                    {this.renderBoard()}
                </Container>
            </div>

            <div>
                {this.validBoardMessage()}
                <button className="butt" onClick={this.lockBoard}> SPELA </button>
            </div>
            </div>
        );
        }
        else {
            return (
                <PlayingBoard board={this.state.board}/> 
            );
        }
    }
}

export default Game;
