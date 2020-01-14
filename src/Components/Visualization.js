import React, { Component } from 'react';
import TempEntry from './TempEntry'
import style from './util/style'
import VizContent from './VizContent';

class Visualization extends Component {
    constructor(props) {
        super(props);

        // set the initial state of the component
        this.state = {
            started: false,
            temps: [],
        };
        this.startViz = this.startViz.bind(this);
    }

    startViz(temps) {
        this.setState({temps: temps, started: true})
    }

    render() {
        var mobile = window.innerWidth < 500
        if (!this.state.started) {
            return (
                <div style={mobile ? {...style.spaced, textAlign: 'center'} : style.centered}>
                    <TempEntry onStart={this.startViz}/>
                </div>
            )
        }
        else {
            var results = [];
            for (var i in this.state.temps) results.push('0');
            return (
                <div style={style.spaced}>
                    <VizContent temps={this.state.temps.concat()} 
                    results={results}
                    onFinish={() => this.setState({ started: false })}/>
                </div>
            )
        }
    }
}

export default Visualization;