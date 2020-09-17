import React from "react";
import Word from "./word/Word"
class Words extends React.Component{
    render(){
        return(
            <div>
                {
                    this.props.words.map((word)=>
                        <Word key={word._id} word={word}/>
                    )
                }
            </div>
        )
    }
}

export default Words;