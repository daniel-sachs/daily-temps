import React, { Component } from 'react';
import { Grid, Typography, Box } from '@material-ui/core';
import style from './util/style'

class Array extends Component {
    constructor(props) {
        super(props);

        // set the initial state of the component
        this.state = {
            arr: this.props.arr,
            index: this.props.index,
            direction: this.props.direction,
            title: this.props.title
        };
    }

    componentDidUpdate(prev) {
        if (this.props.arr !== prev.arr) this.setState({ arr: this.props.arr });
        if (this.props.index !== prev.index) this.setState({ index: this.props.index });
    }

    render() {
        return (
            <div>
                <Typography variant="h4" style={{textAlign: "center", ...style.spaced}}>{this.props.title}</Typography>

                <Grid container direction="row" justify="center" alignContent="center" spacing={0}>
                    {this.state.arr.map((a, index) => {
                        var style = {}; //index == this.state.index ? {backgroundColor: "#a7ff84"} : index > this.state.index && this.state.direction === "back" ? {backgroundColor: "#666666"} : {};
                        if (index === this.state.index) style = {backgroundColor: "#a7ff84"};
                        else if ((index > this.state.index && this.state.direction === "back")
                        || (index < this.state.index && this.state.direction === "forward")) style = {backgroundColor: "#666666"};
                        return (
                            <Grid item xs={1}>
                                <Grid container direction="column" spacing={0}>
                                    <Typography style={{ color: "#666666" }}>
                                        {index}
                                    </Typography>
                                    <Box border={1} style={style}>
                                        <Typography variant="h5" >{a}</Typography>
                                    </Box>
                                </Grid>
                            </Grid>
                        )
                    })}
                </Grid>
            </div>
        )
    }
}

export default Array;