import {Component} from 'react';
import {ListGroup, Container, Row, Col} from 'react-bootstrap';
import './App.css';
import COLORS from './Colors.js';
class PlayingBoard extends Component {
    constructor(props) {
        super(props);
        console.log("hello there");
        let selectedItems = [];
        for (let i = 0; i < 5; ++i) {
            let inner = []
            for (let j = 0; j < 5; ++j) {
                inner.push(0);
            }
            selectedItems.push(inner);
        }
        
        console.log(selectedItems);
        this.state = {hasBingo: false, board: props.board, selectedItems : selectedItems};
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

    makeBoardCard(txt, r, c) {
        return  <ListGroup.Item className="boardCard" id={r.toString() + " " + c.toString() } onClick={(e) => this.setSelected(e)}> {txt} </ListGroup.Item>
    }
    setSelected(event) {
        let coord = event.target.id.split(" ").map(str => parseInt(str));
        let boardCpy = this.state.selectedItems;
        if (this.state.selectedItems[coord[0]][coord[1]] == 1) {
            event.target.style.background = "white";
            boardCpy[coord[0]][coord[1]] = 0;
        } else {
            event.target.style.background = COLORS['pink'];
            boardCpy[coord[0]][coord[1]] = 1;
        }
        this.setState({...this.state, selectedItems : boardCpy});
        this.checkBingo();
    }

    checkBingo() {
        // Check left diag
        let lDiag = this.checkLDiag();
        let rDiag = this.checkRDiag();
        let col  = this.checkCols();
        let row   = this.checkRows();
        let hasBingo = lDiag || rDiag || col || row;
        this.setState({...this.state, hasBingo : hasBingo});
    }

    checkLDiag() {
        for (let i = 0; i < 5; ++i)
            if (this.state.selectedItems[i][i] == 0)
                return false;
        return true;
    }

    checkCols() {
        for (let i = 0; i < 5; ++i) {
            let col = this.getCol(this.state.selectedItems, i);
            if (!col.includes(0))
                return true;
        }
        return false;
    }
    getCol(matrix, col){
       var column = [];
       for(var i=0; i<matrix.length; i++){
          column.push(matrix[i][col]);
       }
       return column;
    }

    checkRows() {
        for (let r = 0; r < 5; ++r)
            if (!this.state.selectedItems[r].includes(0))
                return true;
    }
    
    checkRDiag() {
        for (let r = 0; r < 5; r++)
            if (this.state.selectedItems[r][4 - r] == 0)
                return false;
        return true;
    }

    displayBingo() {
        if (this.state.hasBingo) {
            return ;
        }
        return ;
    }
    render() {
        return (
            <div>
                <div className="boardContainer">
                    <Container fluid> 
                        {this.renderBoard()}
                    </Container>
                </div>
                <div>
                    {this.displayBingo()}
                </div>
            </div>
        );
    }
}

export default PlayingBoard;
