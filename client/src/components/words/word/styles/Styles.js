import { makeStyles } from '@material-ui/core/styles';

var Styles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    modal:{
      width:'100%',
      outline: "none",
      display: 'flex',
      flexDirection: 'column',
      margin: 'auto',
      height: '100%',
      borderRadius: '10px'

    },
    paper:{
      "&:focus": {
        outline: "none"
      },
      padding: theme.spacing(3,3),
      height: '100%',
      overflow: 'auto'
    },
    otherDefinitions:{
      lineHeight: 2
    },
    cross:{
        top: '3%',
        left:'calc(100% - 70px)',
        fontSize: "30px",
        position: 'fixed'
    },
    Word:{
        fontSize: 26,
        fontFamily: "'Kumbh Sans', sans-serif",
        color: "blue"
    },
    Tile:{
        padding: theme.spacing(2,3),
        margin: theme.spacing(4,3),
        Height: 24,
        "&:hover":{
            backgroundColor: "#e6f2ff"
        },
        lineHeight: 1.25
    },
    Category:{
        opacity: 0.5,
        fontSize: 16,
        marginRight: theme.spacing(1)
    },
    Category2:{
      opacity: 0.7,
      fontSize: 18,
      marginRight: theme.spacing(1)
  }
  }));

  export default Styles;