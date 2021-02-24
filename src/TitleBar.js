import './Titlebar.css';
import {Component} from 'react';
import {Navbar} from 'react-bootstrap';

class TitleBar extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Navbar bg="dark" className="titleBar">
                <Navbar.Brand> <h1 className="rainbow_text_animated">Mellobingo </h1> </Navbar.Brand>
            </Navbar>
        );
    }
}
export default TitleBar;
