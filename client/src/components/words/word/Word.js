import React from "react";
import Paper from "@material-ui/core/Paper"
import Classes from "./Word.module.css"
class Word extends React.Component{
    render(){
        return(
            <Paper className={Classes.Tile}>  
                <p className={Classes.Word}>{this.props.word.word}</p>
                <p>{this.props.word.definition.slice(0,50)}...</p>
            </Paper>
        )
    }
}

export default Word;