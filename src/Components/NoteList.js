import React, { Component } from 'react';
import { noteData } from './firebaseConnect';
import {connect} from 'react-redux';

class NoteList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataNote: []
        }
    }

    // get data note list
    UNSAFE_componentWillMount() {
        var arrayData = [];
        noteData.on('value', (data) => {
            data.forEach(notes => {
                var id = notes.key;
                var noteTitle = notes.val().title;
                var noteContent = notes.val().content;
                arrayData.push({
                    id: id,
                    noteTitle: noteTitle,
                    noteContent: noteContent
                })
            });
            // console.log('arrayData: '+ arrayData);
            this.setState({
                dataNote: arrayData
            })
            setTimeout(()=>{
                arrayData = [];
            }, 1000);
        });
    }

    submitEditData = (id, title, content)=>{
        this.setState({
            noteItem: {noteId: id, noteTitle: title, noteContent: content}
        },()=>{
            // console.log(this.state.noteItem);
            this.props.getEditData(this.state.noteItem);
            this.props.changeDisplayForm(id);
        })

    }

    submitRemoveData = (id)=>{
        this.props.removeData(id);
        this.props.alertOn("Xóa thành công", "danger");
    }

    render() { 
        return (
            <div className="col">
                <div id="noteList" role="tablist" aria-multiselectable="true">
                    {/* {console.log(this.state.dataNote)} */}
                    {
                        this.state.dataNote.map((value, index) => {
                            return (
                                <div key={index} className="card">
                                    <div className="card-header text-left" role="tab" id="noteTitle-1">
                                        <h5 className="mb-0 d-flex justify-content-between">
                                            <a data-toggle="collapse" data-parent="#noteList" href={"#" + value.id} aria-expanded="true" aria-controls="noteContent-1">{value.noteTitle}</a>
                                            <div className="btn-group">
                                                <button onClick={()=>{this.submitEditData(value.id, value.noteTitle, value.noteContent)}} type="button" className="btn btn-success">Sửa</button>
                                                <button onClick={()=>{this.submitRemoveData(value.id)}} type="button" className="btn btn-danger">Xóa</button>
                                            </div>
                                        </h5>
                                    </div>
                                    <div id={value.id} className="collapse in" role="tabpanel" aria-labelledby="noteTitle-1">
                                        <div className="card-body">
                                            {value.noteContent}
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }


                </div>
            </div>

        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        // prop: state.prop
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getEditData: (noteItem) => {
            dispatch({
                type: "GET_EDIT_DATA_FROM_LIST", noteItem
            })
        },
        changeDisplayForm: (noteId) => {
            dispatch({
                type: "CHANGE_DISPLAY_FORM", noteId
            })
        },
        removeData: (noteId) => {
            dispatch({
                type: "REMOVE_DATA", noteId
            })
        },
        alertOn: (alertContent, alertType) => {
            dispatch({type:"ALERT_ON", alertContent, alertType})
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NoteList)