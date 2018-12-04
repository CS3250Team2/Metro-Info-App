import React from 'react';
import FileUploader from 'react-firebase-file-uploader';
import { withFirebase } from '../../Firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import classes from './UserForm.css';

class UserForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            description: '',
            selectedFile: '',
        };
    }

    onChange = e => {
        switch (e.target.name) {
            case 'selectedFile':
                this.setState({ selectedFile: e.target.files[0] });
                if (e.target.files[0] !== undefined) {
                    document.getElementById('fileName').innerHTML = e.target.files[0].name;
                }
                break;
            default:
                this.setState({ [e.target.name]: e.target.value });
        }
    };

    startUpload = event => {
        event.preventDefault();
        console.log(event.target);
        this.fileUploader.startUpload(this.state.selectedFile);
    };

    render() {
        return (
            <form className={classes.UserForm}>
                <div className={classes.ImageContainer}>
                    <label className={classes.UploadButton}>
                        UPLOAD SCHEDULE &nbsp;
                        <FontAwesomeIcon icon="upload" color="#25116c" />
                        <FileUploader
                            hidden
                            accept=".htm, .html"
                            name="selectedFile"
                            storageRef={this.props.firebase.storage.ref('schedules')}
                            filename={this.props.firebase.auth.O}
                            onChange={this.onChange}
                            ref={instance => {
                                this.fileUploader = instance;
                            }}
                        />
                    </label>
                    <div className={classes.SubmitButton} onClick={this.startUpload}>
                        GO
                    </div>
                    <h3 id="fileName" className={classes.FileName}>{' '}</h3>
                </div>
            </form>
        );
    }
}

export default withFirebase(UserForm);
