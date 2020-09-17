import React from 'react';
import Words from "./components/words/Words";
import AppBar from "./components/appbar/searchAppBar";


class App extends React.Component{
  constructor(){
    super();
    this.state={
      c:[],
      word:""
    }
  }

  componentDidMount= ()=>{
    const requestBody={
      query:`
        query{
          words{
            _id
            word
            definition
            lexicalCategory
          }
        }
      `
    }

    fetch("http://localhost:5000/graphql",{
      method: "POST",
      body: JSON.stringify(requestBody),
      headers:{
        'Content-Type': 'application/json',
      }
    })
      .then((res)=>res.json())
      .then((data)=>{
        this.setState({
          c:data.data.words
        })
        console.log(this.state.c);
      })
  }

  handleChange = event =>{
    this.setState({
      word: event.target.value
    })
  }

  handleSubmit = () => {
    var word = this.state.word;
    console.log(word);
    if(word.trim().length === 0){
      return;
    }

    const requestBody={
      query:`
        mutation{
          addWord(word:"${word}"){
            _id
            word
            definition
            lexicalCategory
          }
        }
      `
    }

    fetch("http://localhost:5000/graphql",{
      method: "POST",
      body: JSON.stringify(requestBody),
      headers:{
        'Content-Type': 'application/json',
      }
    })
      .then((res)=>res.json())
      .then((c)=>{
        var object = c.data.addWord;
        var objects=[...this.state.c];
        objects.unshift(object);
        this.setState({
          c: objects
        })
        console.log(c);
    }).catch((err)=>{
      console.log(err);
    })
  }

  render(){
    return(
      <div>
        <AppBar submit={this.handleSubmit} change={this.handleChange}/>
        <br/>
        <br/>
        <Words words={this.state.c} />
        {/* <AddNew submit={this.handleSubmit} change={this.handleChange}></AddNew> */}
      </div>
    )
  }
}

export default App;
