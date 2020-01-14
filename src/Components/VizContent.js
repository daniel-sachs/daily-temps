import React, { Component } from 'react';
import { Container, Grid, Typography, Fab } from '@material-ui/core';
import style from './util/style'
import Array from './Array'
import Stack from './Stack';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';

class VizContent extends Component {
    constructor(props) {
        super(props);

        // set the initial state of the component
        this.state = {
            temps: this.props.temps,
            results: this.props.results,
            tempIndex: this.props.temps.length - 1,
            stack: [],
            message: "Click the button below to begin the visualization",
            locked: true,
            nextStep: "beforeCompare",
            comparisons: 0,
        };
        this.nextStep = this.nextStep.bind(this);
        this.beforeCompare = this.beforeCompare.bind(this);
        this.compare = this.compare.bind(this);
        this.putZero = this.putZero.bind(this);
        this.push = this.push.bind(this);
        this.pop = this.pop.bind(this);
        this.putDiff = this.putDiff.bind(this);
    }

    nextStep() {
        if (this.state.nextStep === "beforeCompare") this.beforeCompare();
        else if (this.state.nextStep === "compare") this.compare();
        else if (this.state.nextStep === "putZero") this.putZero();
        else if (this.state.nextStep === "push") this.push();
        else if (this.state.nextStep === "pop") this.pop();
        else if (this.state.nextStep === "putDiff") this.putDiff();
    }

    beforeCompare() {
        if (this.state.tempIndex < 0) this.setState({message: `Algorithm complete. Total comparisons: ${this.state.comparisons}`})
        else this.setState({message: `Compare temps[${this.state.tempIndex}] to stack.peek()`,  nextStep: "compare"});
    }

    compare() {
        if (this.state.stack.length === 0) {
            this.setState({message: "There is nothing on the stack", nextStep: "putZero"});
        }
        else if (this.state.temps[this.state.stack[this.state.stack.length-1]] <= this.state.temps[this.state.tempIndex]) {
            this.setState({
                message: `The top item (${this.state.temps[this.state.stack[this.state.stack.length-1]]}) is not warmer than temps[${this.state.tempIndex}] (${this.state.temps[this.state.tempIndex]})`,
                nextStep: "pop",
                comparisons: this.state.comparisons+1
            })
        }
        else {
            this.setState({
                message: `The top item (${this.state.temps[this.state.stack[this.state.stack.length-1]]}) is warmer than temps[${this.state.tempIndex}] (${this.state.temps[this.state.tempIndex]})`,
                nextStep: "putDiff",
                comparisons: this.state.comparisons+1
            })
        }
    }

    putDiff() {
        var diff = this.state.stack[this.state.stack.length-1] - this.state.tempIndex;
        var results = this.state.results.concat();
        results[this.state.tempIndex] = diff;
        this.setState({
            message: `Set results[${this.state.tempIndex}] to ${this.state.stack[this.state.stack.length-1]} - ${this.state.tempIndex} = ${diff}`,
            results: results,
            nextStep: "push"
        })
    }

    pop() {
        var stack = this.state.stack.concat();
        stack.pop();
        this.setState({
            message: `Pop ${this.state.stack[this.state.stack.length -1]} (${this.state.temps[this.state.stack[this.state.stack.length-1]]}) off the stack.`,
            stack: stack,
            nextStep: "beforeCompare"
        })
    }

    putZero() {
        this.setState({message: `Set results[${this.state.tempIndex}] to 0`, nextStep: "push"});
    }

    push() {
        var stack = this.state.stack.concat();
        stack.push(this.state.tempIndex);
        this.setState({message: `Place ${this.state.tempIndex} (${this.state.temps[this.state.tempIndex]}) on the stack`, stack: stack, tempIndex: this.state.tempIndex - 1, nextStep: "beforeCompare"})
    }

    render() {
        return (
            <div>
                <Grid container spacing={2} style={style.centered}>
                    <Grid item xs={8}>
                        <Grid container direction="column" spacing={4}>
                            <Typography variant="h3">{this.state.message}</Typography>
                            <Grid item>
                                <Array arr={this.state.temps.concat()} index={this.state.tempIndex} direction="back" title="Temperatures" />
                            </Grid>
                            <Grid item>
                                <Array arr={this.state.results.concat()} index={this.state.tempIndex} direction="forward" title="Output" />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={4}>
                        <Stack stack={this.state.stack.concat()} values={this.state.temps.concat()} />
                    </Grid>
                </Grid>
                <div style={{ ...style.centerBottom, textAlign: 'center' }}>
                    <Fab variant="extended" style={style.spaced} onClick={() => this.nextStep()} >
                        <PlayArrowIcon />
                        Begin Next Step
                </Fab>
                </div>
            </div>
        )
    }
}

export default VizContent;