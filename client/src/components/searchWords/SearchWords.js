import React from "react";
import Word from "../words/word/Word"
class SearchWords extends React.Component{
    render(){
        return(
            <div>
                {
                    
                    this.props.words.map((word)=>{
                        var str = word.word.toString();
                        return str.indexOf(this.props.searchedWord)!==-1
                        ?
                            <Word key={word._id} word={word}/>
                        :
                            null
                    })
                }
            </div>
        )
    }
}

export default SearchWords;