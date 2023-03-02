import React from "react";
import Paper from "@material-ui/core/Paper"
import Modal from '@material-ui/core/Modal';
import CloseIcon from '@material-ui/icons/Close';
import Styles from "./styles/Styles";
const useStyles = Styles;


function Word(props) {
    const classes = useStyles();

    //state to store the the modal open and close boolean
    const [open, setOpen] = React.useState(false);

    //function to close modal
    const handleOpen = () => {
        setOpen(true);
    }

    //function to open modal
    const handleClose = () => {
        setOpen(false);
    };
    const data = props.word;

    //Defining the body of word details modal
    const body = (
        <>
            <Paper className={classes.paper}>
                <CloseIcon onClick={handleClose} className={classes.cross} />
                <p className={classes.Word}>{data.word}</p>
                <p><span className={classes.Category}>({data.results[0].lexicalEntries[0].lexicalCategory.text})</span> {data.results[0].lexicalEntries[0].entries[0].senses[0].definitions[0]}</p>
                <br />
                <span className={classes.Category2}>Other definitions and their examples</span>
                <hr />
                <div className={classes.otherDefinitions}>

                    {/* Travelling inside the data and printing details */}
                    {data.results.map((result, i) => {
                        return <div key={i}>{result.lexicalEntries && result.lexicalEntries.map((objects, i) => {
                            return <div key={i}>{objects.entries && objects.entries.map((entery, i) => {
                                return <div key={i}>{entery.senses && entery.senses.map((sense, i) => {
                                    return <div key={i}>
                                        {sense.definitions && sense.definitions.map((definition, i) => {
                                            return <li key={i}>{definition}
                                                <ul type="circle">
                                                    {sense.examples ?
                                                        sense.examples.map((example, i) => {
                                                            return <li key={i}>{example.text}</li>
                                                        }) : null
                                                    }
                                                </ul>
                                            </li>
                                        })}
                                    </div>
                                })}</div>
                            })}</div>
                        })}</div>
                    })}
                </div>
            </Paper>
        </>
    );

    //Return full page modal containg details of a specific word
    return (
        <>
            <Paper onClick={handleOpen} className={classes.Tile} elevation={4}>
                <p className={classes.Word}>{data.word}</p>
                <p><span className={classes.Category}>({data.results[0].lexicalEntries[0].lexicalCategory.text})</span> {data.results[0].lexicalEntries[0].entries[0].senses[0].definitions[0]}</p>
            </Paper>
            <Modal
                open={open}
                onClose={handleClose}
                className={classes.modal}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                disableAutoFocus={true}
            >
                {body}
            </Modal>
        </>
    )
}

export default Word;