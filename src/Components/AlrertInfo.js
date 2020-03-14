import React, { Component } from 'react';
import {Alert, AlertContainer} from 'react-bs-notifier';
import {connect} from 'react-redux';

class AlrertInfo extends Component {
    alertOnToOf = ()=>{
        this.props.alertOff();
    }

    render() {
        if (this.props.alertStatus === false) return null
        return (
            <AlertContainer position="bottom-right" >
                <Alert type={this.props.alertType} timeout={1000} onDismiss={()=>this.alertOnToOf()} >{this.props.alertContent}</Alert>
            </AlertContainer>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        alertContent: state.alertContent,
        alertType: state.alertType,
        alertStatus: state.alertStatus
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        alertOff: () => {
            dispatch({type:"ALERT_OFF"})
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AlrertInfo)