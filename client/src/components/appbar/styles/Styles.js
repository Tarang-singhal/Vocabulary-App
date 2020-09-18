import { fade, makeStyles } from '@material-ui/core/styles';

var Styles = makeStyles((theme) => ({
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
        marginLeft: theme.spacing(2),
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

  export default Styles;