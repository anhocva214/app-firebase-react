import React, { Component } from 'react';
import { connect } from 'react-redux';

class NoteForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            noteId: '',
            noteTitle: '',
            noteContent: ''
        }
    }

    isChange = (event) => {
        var name = event.target.name;
        var value = event.target.value;

        this.setState({
            [name]: value
        })
    }

    addNote = (title, content) => {

        if (this.props.editObject.id) {

            var wait_load_data = new Promise((resolve, reject) => {
                this.setState({
                    noteId: this.props.editObject.id
                }, () => { resolve(true) })
            })

            wait_load_data.then(data => {
                if (title === '') {
                    this.setState({
                        noteTitle: this.props.editObject.title
                    }, () => { return true })
                }
            }).then(data => {
                if (content === '') {
                    this.setState({
                        noteContent: this.props.editObject.content
                    }, () => { return true })
                }
            }).then(data => {
                console.log(this.state.noteId + ' ' + this.state.noteTitle + ' ' + this.state.noteContent);
                this.props.editData({id: this.state.noteId, noteTitle: this.state.noteTitle, noteContent: this.state.noteContent});
                this.props.changeDisplayForm(this.state.noteId);
                this.props.alertOn("Sửa thành công", "success");
                setTimeout(()=>{this.setState({
                    noteId: '',
                    noteTitle: '',
                    noteContent: ''
                })}, 1000)
            })
        }
        else {
            var note = {
                title: title,
                content: content
            };
            setTimeout(()=>{this.setState({
                noteId: '',
                noteTitle: '',
                noteContent: ''
            })}, 500)
            this.props.addData(note);
            this.props.alertOn("Thêm thành công", "info");
        }


    }


    displayForm = () => {

        if (this.props.displayForm === false) {

            return "d-none"
        }

        return "block"
    }

    displayTitleForm = ()=>{
        if (this.props.editObject.id){
            return "Sửa ghi chú"
        }   
        
        return "Tạo mới ghi chú"
    }

    render() {
        return (
            <form className={"col-4 " + this.displayForm()}>
                <h2 className="bg-dark text-white text-center">{this.displayTitleForm()}</h2>
                <div className="form-group">
                    <label htmlFor="noteTitle">Tiêu đề</label>
                    <input onChange={(event) => this.isChange(event)} type="text" name="noteTitle" id="noteTitle" className="form-control" defaultValue={this.props.editObject.title} />
                </div>
                <div className="form-group">
                    <label htmlFor="noteTitle">Nội dung</label>
                    <input onChange={(event) => this.isChange(event)} type="text" name="noteContent" id="noteContent" className="form-control" defaultValue={this.props.editObject.content} />
                </div>
                <button type="reset" onClick={() => this.addNote(this.state.noteTitle, this.state.noteContent)} name="btnSave" id="btnSave" className="btn btn-primary btn-lg btn-block">Lưu</button>
            </form>
        )
    }

}

const mapStateToProps = (state, ownProps) => {
    return {
        editObject: state.editObject,
        displayForm: state.displayForm
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        addData: (getItem) => {
            dispatch({ type: "ADD_DATA", getItem })
        },
        editData: (noteItem) => {
            dispatch({ type: "EDIT_DATA", noteItem })
        },
        changeDisplayForm: (noteId) => {
            dispatch({
                type: "CHANGE_DISPLAY_FORM", noteId
            })
        },
        alertOn: (alertContent, alertType) => {
            dispatch({type:"ALERT_ON", alertContent, alertType})
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NoteForm)