import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Modal from '@material-ui/core/Modal';
import Paper from "@material-ui/core/Paper";
import TextField from '@material-ui/core/TextField';
import { FormHelperText } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Styles from './styles/Styles';

const useStyles = Styles;

export default function SearchAppBar(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleModel = () => {
    setOpen(true);
  }
  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    props.submit();
    handleClose();
  }
  const body = (
    <Paper className={classes.paper}>
      <form onSubmit={handleSubmit} className={classes.form}>
        <TextField disabled={props.isLoading} autoFocus={true} onChange={(event) => props.change(event)} label="Word..." />
        <FormHelperText>Enter a new Word</FormHelperText>
        <Button disabled={props.isLoading} type="submit" variant="contained" color="primary">ADD</Button>
      </form>
    </Paper>
  );

  return (
    <div className={classes.root}>
      <AppBar>
        <Toolbar>
          <Typography className={classes.title} variant="h5" noWrap>
            Vocab
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              disabled={props.isLoading}
              inputProps={{ 'aria-label': 'search' }}
              onChange={props.searchWord}
            />
          </div>
        </Toolbar>
      </AppBar>


      <Fab className={classes.fab} color="primary" disabled={props.isLoading} onClick={handleModel}><AddIcon /></Fab>



      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        disableAutoFocus={true}
        className={classes.modal}
      >
        {body}
      </Modal>


    </div>
  );
}
