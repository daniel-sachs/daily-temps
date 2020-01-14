import React, { Component } from 'react';
import { Grid, Typography, Box } from '@material-ui/core';
import style from './util/style'

class Stack extends Component {
    constructor(props) {
        super(props);

        // set the initial state of the component
        this.state = {
            stack: this.props.stack,
            values: this.props.values,
        };
    }

    componentDidUpdate(prev) {
        if (this.props.stack !== prev.stack) this.setState({ stack: this.props.stack });
        if (this.props.values !== prev.values) this.setState({ values: this.props.values });
    }

    render() {
        return (
            <Grid container direction="column-reverse" justify="center" alignContent="center" spacing={0}>
                {this.state.stack.map((a, index) => {
                    var style = index === this.state.stack.length - 1 ? { backgroundColor: "#a7ff84" } : {};
                    return (
                        <Grid item>
                            <Box border={1} style={style}>
                                <Typography variant="h5" >{a} ({this.state.values[a]})</Typography>
                            </Box>
                        </Grid>
                    )
                })}
                <Typography variant="h5" style={style.spaced}>Increasing Stack</Typography>
            </Grid>
        )
    }
}

export default Stack;