import React, { Component, makeStyles } from 'react';

class Progress extends Component {

    constructor(props) {
        super(props)
        this.state = {}
    }
    //const classes = useStyles();

    render() {
        return (
            <div style={{
                // width: 100 %,
                height: 8,
                backgroundColor: 'rgb(183, 182, 184)',
                borderRadius: 5
            }}>
                <div
                    style={{
                        backgroundColor: 'rgb(122, 235, 112)',
                        margin: 0,
                        borderRadius: 5,
                        width: this.props.progress + '%'
                    }}
                />
            </div>
        )
    }
}
export default Progress