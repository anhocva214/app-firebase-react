import React, { Component } from 'react';
import './App.css';
import Header from './Components/Header';
import NoteForm from './Components/NoteForm';
import NoteList from './Components/NoteList';
import AlrertInfo from './Components/AlrertInfo';


class App extends Component {
  render(){
    return (
      <div className="App">
        <AlrertInfo/>
        <header>
          <Header/>
        </header>
        <main>
          <div className="container">
            <div className="row"> 
              <NoteList/>
              <NoteForm/>
            </div>
          </div>
        </main>
      </div>
    );
  }
  
}

export default App;
