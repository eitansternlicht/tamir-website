import React, { Component } from 'react'
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Select from '../components/Select';
import { entriesToObj } from './general-utils'
import Progress from "../components/Progress";
import Dropzone from '../components/Dropzone';

class Upload extends Component {
    constructor(props) {
        super(props)
        this.state = {
            aoo: [],
            selecting: false,
            uploading: false,
            uploadProgress: {},
            successfullUploaded: false,
        };
    }

    aoaToAoo(aoa) {
        const [columnsNames, ...data] = aoa;
        return data.map((row) => entriesToObj(row.map((cellVal, idx) => [columnsNames[idx], cellVal])))
    }

    render() {

        return (

            <div style={{width: '1000'}}>
                {this.state.selecting ? <Select uploadedFinished={(val) => this.setState({ selecting: val })} onSelectingDone={(fileRowsToTableRows) => {
                    this.props.onNewFile(this.state.aoo.map(obj => entriesToObj(fileRowsToTableRows.map(([tableName, fileName]) => [tableName, obj[fileName]]))))
                }} fileRows={Object.keys(this.state.aoo[0])} /> : <div>
                        <Dropzone onGetFile={(aoa) => this.setState({ aoo: this.aoaToAoo(aoa), selecting: aoa.length > 0, successfullUploaded: aoa.length > 0 })} />
                        <Typography align='center' style={{ fontSize: 40 }}>גרור / לחץ לבחירת קובץ</Typography>
                    </div>
                }

            </div>
        )
    }
}
export default Upload;