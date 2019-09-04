import React, {Component} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import DoneIcon from '@material-ui/icons/Done';
import AddIcon from '@material-ui/icons/Add';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
    margin: {
      margin: theme.spacing(1),
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
    textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
    },
    root: {
      width: '100%',
      marginTop: theme.spacing(3),
      overflowX: 'auto',
    },
    paper: {
      marginTop: theme.spacing(3),
      width: '100%',
      overflowX: 'auto',
      marginBottom: theme.spacing(2),
    },
    table: {
      minWidth: 650,
    },
}));

function ccyFormat(num) {
  return `${num.toFixed(2)}`;
}

/*let codes = [{
  code: "123",
  name: "Some Test",
  price: 1.23
  }, {
  code: "123X",
  name: "Another Test",
  price: 2.34}]; */
  let codes = [];
/*
  codes.push({
    code: "123",
    name: "Some Test",
    price: 1.23});

  codes.push({
    code: "123X",
    name: "Another Test",
    price: 2.34}); */

function addLabLine() {
  codes.push({
    code: "111X",
    name: "hello",
    price: 1.56
  });
}


let rows = codes.map(function(lab){
  return (
    <TableRow>
      <TableCell>{lab.code}</TableCell>
      <TableCell align="right">{lab.name}</TableCell>
      <TableCell></TableCell>
      <TableCell align="right">{lab.price}</TableCell>
      <TableCell align="right"><IconButton aria-label="delete">
          <DeleteIcon fontSize="small" /></IconButton>
          </TableCell>
    </TableRow>
    );
});

let invoiceSubtotal = (codes.length > 0) ? codes.reduce((a,b) => a.price + b.price) : 0;
let ivFee = 5;
let invoiceTotal = invoiceSubtotal + ivFee;

class InputRow extends Component {

    render() {
      classes = this.props.classes;
      return(
        <TableRow>
          <TableCell><TextField id="id-form" label="ID" className={classes.textField} margin="normal"/></TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
          <TableCell align="right"><IconButton aria-label="add"><AddIcon fontSize="small" /></IconButton></TableCell>
        </TableRow>
      );
    }
}

function App() {

const classes = useStyles();

  return (
    <div>
      <Paper className={classes.paper}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Code</TableCell>
              <TableCell align="right">Name</TableCell>
              <TableCell></TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right"><IconButton aria-label="add"><AddIcon fontSize="small" /></IconButton></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows}

            <InputRow callback="addLabLine()"/>

            <TableRow>
              <TableCell rowSpan={3} />
              <TableCell rowSpan={3} />
              <TableCell align="left">Subtotal</TableCell>
              <TableCell align="right">{ccyFormat(invoiceSubtotal)}</TableCell>
              <TableCell/>
            </TableRow>
            <TableRow>
              <TableCell align="left">IV Fee</TableCell>
              <TableCell align="right">{ccyFormat(ivFee)}</TableCell>
              <TableCell/>
            </TableRow>
            <TableRow>
              <TableCell align="left">Total</TableCell>
              <TableCell align="right">{ccyFormat(invoiceTotal)}</TableCell>
              <TableCell/>
            </TableRow>
          </TableBody>
        </Table>
      </Paper>
      </div>
  );
}

export default App;
