import React, { Component } from 'react';
import style from './util/style'
import Container from '@material-ui/core/Container'
import { Typography, Paper, List, ListItemAvatar, Avatar, ListItemText, IconButton, ListItemSecondaryAction, ListItem, TextField, InputAdornment, Button, Icon, Fab, Grid, Box } from '@material-ui/core';
import HelpIcon from '@material-ui/icons/Help';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import DeleteIcon from '@material-ui/icons/Delete'
import AddIcon from '@material-ui/icons/Add'
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import HelperDialog from './HelperDialog';
import { borders } from '@material-ui/system';

class TempEntry extends Component {
    constructor(props) {
        super(props);

        // set the initial state of the component
        this.state = {
            temp: "",
            temps: [],
            helperDlg: false,
        };
        this.tempList = this.tempList.bind(this);
        this.addTemp = this.addTemp.bind(this);
        this.removeTemp = this.removeTemp.bind(this);
        this.startViz = this.startViz.bind(this);
    }

    addTemp() {
        if (this.state.temp && this.state.temps.length < 10) {
            this.setState({
                temps: this.state.temps.concat(parseInt(this.state.temp)),
                temp: ""
            })
        }
    }

    removeTemp(index) {
        var temps = this.state.temps.concat();
        temps.splice(index, 1);
        this.setState({ temps: temps })
    }

    startViz() {
        this.props.onStart(this.state.temps.concat());
    }

    tempList() {

        var cells = this.state.temps.map((temp, index) => {
            return (
                <Grid item xs={1}>
                    <Box border={1}>
                        <Typography variant="h5" style={{ color: "#666564" }}>{temp}</Typography>
                    </Box>
                </Grid>
            )
        })
        return <Grid container direction="row" spacing={0} alignContent="center" justify="center">
            {cells}
        </Grid>
    }
    render() {
        var mobile = window.innerWidth < 500;
        return (
            <div>
                <Container fullWidth={mobile}>
                    <Paper>
                        <Typography style={style.spaced} variant={mobile ? "h5" : "h3"}>Enter up to 10 daily temperatures</Typography>
                        {this.tempList()}

                        <Container>
                            <TextField style={style.spaced} disabled={this.state.temps.length >= 10}
                                label="Add a Temperature" value={this.state.temp} type="number"
                                onKeyPress={(e) => {
                                    if (e.key === "Enter") {
                                        this.addTemp();
                                    }
                                }}
                                onChange={(event) => { this.setState({ temp: event.target.value }); }}
                                InputProps={{
                                    endAdornment:
                                        <InputAdornment position="end">
                                            <IconButton onClick={() => this.addTemp()}>
                                                <AddIcon />
                                            </IconButton>
                                        </InputAdornment>
                                }} />
                            <Button style={style.spaced} fullWidth={!mobile} color="primary" variant="outlined"
                                onClick={() => this.startViz()} disabled={this.state.temps.length < 1}>
                                <PlayCircleFilledIcon />
                                Start Visualization
                            </Button>
                        </Container>


                    </Paper>

                </Container>
                <Fab variant="extended" style={{ ...style.centerBototm, ...style.spaced }} onClick={() => this.setState({ helperDlg: true })}>
                    <HelpIcon />
                    What is This?
                    </Fab>
                <HelperDialog visible={this.state.helperDlg} onClose={() => this.setState({ helperDlg: false })} />
            </div>
        )
    }
}

export default TempEntry;