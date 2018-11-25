import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import List from './components/List.jsx';
import ListItem from './components/ListItem.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      items: [],
      title:'tal'
    }
  }
  onChange(e) {
    this.setState({
      title: e.target.value
    });
  }

  search(data) {
    console.log('input is: ',this.state.title)
    
    $.ajax({
      url: '/addtodo',
      type: 'POST', 
      data: {title: this.state.title},
      success: (data) => {
        $.ajax({
          url: '/addtodo',
          type: 'GET',
          success: (data) => {
            // this.setState({
            //   items:data
            // })
            console.log(data,"ghjlfjkjhkdgj");
          },
          error: (err) => {
            console.log('err', err);
          }
        });
      },
      error: (err) => {
        console.log('err', err);
      }
    });
  }


  render () {
    return (<div>
      <h1>Todo List</h1>
      <input value={this.state.value} onChange={this.onChange.bind(this)} /> 
      <button onClick={this.search.bind(this)} > Add todo </button>      
      {/* <List items={this.state.items}/> */}
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));