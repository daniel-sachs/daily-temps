import React, { Component } from 'react';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import { Dialog, DialogTitle, DialogContent, Typography, Button, Grow, Container } from '@material-ui/core';
import style from './util/style'

class HelperDialog extends Component {
    constructor(props) {
        super(props);

        // set the initial state of the component
        this.state = {
            visible: this.props.visible,
        };
    }

    componentDidUpdate(previous) {
        if (this.props.visible !== previous.visible) {
            this.setState({ visible: this.props.visible })
        }
    }

    render() {
        return (
            <Dialog open={this.state.visible} maxWidth="md" fullWidth transitionDuration={500} TransitionComponent={Grow}>
                <DialogTitle>
                    About
                    </DialogTitle>
                <DialogContent>
                    <Container>
                        <Typography style={style.spaced}>
                            <p>
                                This application is a visualization of an optimal solution to an algorithmic whiteboarding problem
                                 I received in a real job interview. See the problem statement below.
                            </p>
                            <p>
                                Given a list of daily temperatures T, return a list such that, for each day in the input, the list tells you how many days you would 
                                have to wait until a warmer day. If there is no future day for which this is possible, put 0 instead.
                            </p>
                            <p>
                                The accepted solution is to iterate from the back of the array and maintain a stack of indexes of strictly increasing temperatures.
                                For each element i, any index j on the stack for which T[j] is less than or equal to T[i] is popped off the stack. When T[j] > T[i], the result array at index i
                                is set to j - i. If there are no elements left on the stack, the result is 0.
                            </p>
                            <p>
                                The solution is based on the idea that if T[i] is warmer than every temperature over some interval between i and k such that k > i,
                                then no element before i will have its next warmer day in the range [i, k).
                            </p>
                        </Typography>
                    </Container>
                    <Button variant="contained" color="primary" fullWidth onClick={() => this.props.onClose()}>
                        <ThumbUpIcon />
                        Got it
                    </Button>
                </DialogContent>
            </Dialog>
        )
    }
}

export default HelperDialog;