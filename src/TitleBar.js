import './Titlebar.css';
import {Component} from 'react';
import {Navbar} from 'react-bootstrap';

class TitleBar extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="titlebarContainer">
            <Navbar className="titleBar">
                <Navbar.Brand> <h1 className="rainbow_text_animated">Mellobingo </h1> </Navbar.Brand>
            </Navbar>
            </div>
        );
    }
}
export default TitleBar;
