import React, { Component } from 'react'
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

import Progress from "../components/Progress";
import Dropzone from '../components/Dropzone';

class Upload extends Component {
    constructor(props) {
        super(props)
        this.state = {
            file: '',
            uploading: false,
            uploadProgress: {},
            successfullUploaded: false,
            mode: false
        };

    }


    render() {
        return (
            <div>
                <div>
                    <Dropzone />
                </div>
                <Typography align='center' style={{ fontSize: 40 }}>גרור / לחץ לבחירת קובץ</Typography>
            </div>
        )
    }
}
export default Upload;