import {noteData} from './firebaseConnect';

var redux = require('redux');

const noteInitialState = {
    displayForm: false,
    editObject: {},
    formId: '',
    alertStatus: false,
    alertContent: 'Hello success',
    alertType: 'success'
}
const allReducer = (state = noteInitialState, action) => {
    switch (action.type) {
        case "ADD_DATA":{
            // console.log('kết nối thành công, data: ', action.getItem);
            noteData.push(action.getItem);
            return state
        }

        case "EDIT_DATA":{
            noteData.child(action.noteItem.id).update({
                title: action.noteItem.noteTitle,
                content: action.noteItem.noteContent
            });
            return state
        }

        case "REMOVE_DATA":{
            noteData.child(action.noteId).remove();
            return state
        }

        case "RESET_DATA":{
            return {...state, editObject: {}}
        }

        case "GET_EDIT_DATA_FROM_LIST":{
            // console.log('data at Store: ', action.noteItem);
            return {...state, editObject: {id: action.noteItem.noteId, title: action.noteItem.noteTitle, content: action.noteItem.noteContent}}
        }

        case "CHANGE_DISPLAY_FORM":{
            if (state.formId === action.noteId || state.formId === ''){
                return {...state, displayForm: !state.displayForm, formId: action.noteId}
            }
            // console.log('action id: '+ action.noteId );
            // console.log('form id: '+ state.formId );
            return {...state, formId: action.noteId}
        }

        case "ALERT_ON":{
            console.log('đã on');
            return {...state, alertStatus: true, alertContent: action.alertContent, alertType: action.alertType}
        }

        case "ALERT_OFF":{
            return {...state, alertStatus: false}
        }
        
        default:
            return state
    }
}

var store = redux.createStore(allReducer);

export default store;
