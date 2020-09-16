import React from 'react';
// import Classes from './App.module.css';

class App extends React.Component{
  constructor(){
    super();
    this.state={
      c:[]
    }
  }
  componentDidMount(){
    fetch("/api/c")
      .then((res)=>res.json())
      .then((c)=>{
        this.setState({c})
        console.log(this.state.c);
    });
      
  }
  render(){
    return(
      <div>
        hello! brother!!
      </div>
    )
  }
}

export default App;
