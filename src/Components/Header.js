import React, { Component } from 'react';
import {connect} from 'react-redux';

class Header extends Component {

    addNote = (event)=>{
        event.preventDefault();
        this.props.resetData();
        this.props.changeDisplayForm();
    }

    render() {
        return (
            <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-5">
                <a className="navbar-brand" href="/">Navbar</a>
                <button className="navbar-toggler d-lg-none" type="button" data-toggle="collapse" data-target="#collapsibleNavId" aria-controls="collapsibleNavId" aria-expanded="false" aria-label="Toggle navigation" />
                <div className="collapse navbar-collapse justify-content-end" id="collapsibleNavId">
                    <ul className="navbar-nav mt-2 mt-lg-0">
                        <li className="nav-item active">
                            <a className="nav-link" href="/">Home <span className="sr-only">(current)</span></a>
                        </li>
                        <li className="nav-item">
                            <a onClick={(event)=> this.addNote(event)} className="nav-link" href="/">Thêm ghi chú</a>
                        </li>
                    </ul>
                </div>
            </nav>
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
        changeDisplayForm: () => {
            dispatch({type: "CHANGE_DISPLAY_FORM"})
        },
        resetData: () => {
            dispatch({type: "RESET_DATA"})
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)