import React from 'react';
import AppBar from "./components/appbar/searchAppBar";
import Words from "./components/words/Words";
import SearchWords from "./components/searchWords/SearchWords"


class App extends React.Component{
  constructor(){
    super();
    this.state={
      c:[],
      showList: true,
      word:"",
      searchWord: ""
    }
  }

  componentDidMount= ()=>{
    const requestBody={
      query:`
        query{
          words{
            _id
            word
            results{
              lexicalEntries{
                lexicalCategory{
                  text
                }
                entries{
                  senses{
                    definitions
                    examples{
                      text
                    }
                    subsenses{
                      definitions
                      examples{
                        text
                      }
                    }
                  }
                }
              }
            }
          }
        }
      `
    }

    fetch("/graphql",{
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
    var word = this.state.word.toLowerCase();
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
            results{
              lexicalEntries{
                lexicalCategory{
                  text
                }
                entries{
                  senses{
                    definitions
                    examples{
                      text
                    }
                    subsenses{
                      definitions
                      examples{
                        text
                      }
                    }
                  }
                }
              }
            }
          }
        }
      `
    }

    // definition
    //         lexicalCategory

    fetch("/graphql",{
      method: "POST",
      body: JSON.stringify(requestBody),
      headers:{
        'Content-Type': 'application/json',
      }
    }).then((res)=>res.json())
    .then((c)=>{
        console.log(c);
        if(!c.data.addWord){
          throw new Error("Word not found!")
        }
        var object = c.data.addWord;
        var objects=[...this.state.c];
        objects.unshift(object);
        this.setState({
          c: objects
        })
    }).catch((err)=>{
      console.log(err);
      alert(err);
    });
  }

  handleSearchWord = (event) =>{
    // console.log(event.target.value);
    this.setState({
      searchWord: event.target.value.toLowerCase(),
      showList: false
    });
  }

  render(){
    return(
      <div>
        <AppBar submit={this.handleSubmit} searchWord={this.handleSearchWord} change={this.handleChange}/>
        <br/>
        <br/>
        {this.state.showList?
          <Words words={this.state.c} />
          :
          <SearchWords words={this.state.c} searchedWord={this.state.searchWord} />
        }
        {/* <AddNew submit={this.handleSubmit} change={this.handleChange}></AddNew> */}
      </div>
    )
  }
}

export default App;
