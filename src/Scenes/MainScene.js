import React, { useState, Component } from "react";
import Container from '@material-ui/core/Container';
//import Table from '../components';
import row from '../utils/createRowData';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

function MainScene() {

    return (
        <React.Fragment>
            <Container>

            </Container>
            <div>
                <Box color="text.primary">
                    {props => <Button {...props} />}
                </Box>

                {/* <Table rows={row} /> */}

            </div>
        </React.Fragment>


    );

}


export { MainScene };