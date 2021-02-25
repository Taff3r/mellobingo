import Game from './Game.js';
import TitleBar from './TitleBar.js';
import {Component} from 'react';
import COLORS from './Colors.js';
class App extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        // Somewhat hacky-way of changing the entire background of the app
        document.body.style.backgroundColor = COLORS['background'];
        document.title = "Mellobingo";
    }
    render() {
        return (
            <div>
                <TitleBar/>    
                <Game/> 
            </div>
        );
    }
}

export default App;
