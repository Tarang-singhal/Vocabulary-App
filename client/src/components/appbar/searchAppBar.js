import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Modal from '@material-ui/core/Modal';
import Paper from "@material-ui/core/Paper";
import TextField from '@material-ui/core/TextField';
import { FormHelperText } from '@material-ui/core';
import Button from '@material-ui/core/Button';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
    display: 'block',
    marginLeft: theme.spacing(1.5),
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '60%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: '30%',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
  },
  fab: {
    position: 'fixed',
    bottom: theme.spacing(4),
    right: theme.spacing(4),
  },
  modal:{
    maxWidth: 350,
    padding: theme.spacing(2,2),
    marginTop: theme.spacing(20),
    outline: "none",
    display: 'flex',
    flexDirection: 'column',
    margin: 'auto'
  },
  form:{
    margin: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper:{
    "&:focus": {
      outline: "none"
    },
    padding: theme.spacing(3,3)
  }
}));

export default function SearchAppBar(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleModel = () =>{
    setOpen(true);
  }
  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit= (event) =>{
    event.preventDefault();
    props.submit();
    handleClose();
  }
  const body = (
    <Paper className={classes.paper}>
        <form onSubmit={handleSubmit} className={classes.form}>
          <TextField autoFocus={true} onChange={(event)=>props.change(event)} label="Word..." />
          <FormHelperText>Enter a new Word</FormHelperText>
          <Button type="submit" variant="contained" color="primary">ADD</Button>
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
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
        </Toolbar>
      </AppBar>


      <Fab className={classes.fab} color="primary" onClick={handleModel}><AddIcon/></Fab>



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
