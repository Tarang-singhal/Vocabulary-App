import React from "react";
import Word from "./word/Word"
class Words extends React.Component{

    render(){
        return(
            <div style={{marginTop: "80px"}}>
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