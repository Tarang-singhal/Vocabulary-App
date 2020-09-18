import React from 'react';
import AppBar from "./components/appbar/searchAppBar";
import Words from "./components/words/Words";
import SearchWords from "./components/searchWords/SearchWords"


class App extends React.Component{
  //Constructor
  constructor(){
    super();

    //State of component
    this.state={
      c:[],
      showList: true,
      word:"",
      searchWord: ""
    }
  }

  //invoked when component mount successfully
  //It also make a graphQl API call to retrieve the data from backend
  componentDidMount= ()=>{

    //GraphQl API call structure
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
                  }
                }
              }
            }
          }
        }
      `
    }

    //Fetching data
    //all possible errors are handeled
    fetch("/graphql",{
      method: "POST",
      body: JSON.stringify(requestBody),
      headers:{
        'Content-Type': 'application/json',
      }
    })
      .then((res)=>res.json())

      //setting state using fetced data
      .then((data)=>{
        this.setState({
          c:data.data.words
        })
      }).catch((err)=>{
        alert(err);
      })
  }

  //invoked when a change occurs in search bar input field
  handleChange = event =>{
    this.setState({
      word: event.target.value
    })
  }

  //invoked when user tries to add a word in dictionary
  //it will send a GraphQl mutation request to add that word in database
  handleSubmit = () => {
    //Word enterd by user
    var word = this.state.word.toLowerCase();
    if(word.trim().length === 0){
      return;
    }

    //Request structure for mutation call
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
                  }
                }
              }
            }
          }
        }
      `
    }

    //sending word to backend side
    //all possible errors are handeled
    fetch("/graphql",{
      method: "POST",
      body: JSON.stringify(requestBody),
      headers:{
        'Content-Type': 'application/json',
      }
    }).then((res)=>res.json())
    .then((c)=>{
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

  //Search handler
  handleSearchWord = (event) =>{
    this.setState({
      searchWord: event.target.value.toLowerCase(),
      showList: false
    });
  }

  //will return list of word present in database 
  //along with other components
  render(){
    return(
      <div>
        <AppBar submit={this.handleSubmit} searchWord={this.handleSearchWord} change={this.handleChange}/>
        {this.state.showList?
          <Words words={this.state.c} />
          :
          <SearchWords words={this.state.c} searchedWord={this.state.searchWord} />
        }
      </div>
    )
  }
}

export default App;
