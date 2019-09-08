import React, {Component} from 'react';
import {useState} from 'react';
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
import {verifyLabCode, returnLabObject} from './Labs.js'

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

const InputRow = (props) => {

  const [IDNum, setIDNum] = useState("");
  const [IDVerified, setIDVerified] = useState(true);

  const classes = useStyles();

  const handleClick = () => {
    setIDVerified(verifyLabCode(IDNum));
    if(verifyLabCode(IDNum)) {
      props.onAddClick(IDNum);
      setIDNum("");
    }
  }

  return(
    <TableRow>

    <TableCell><TextField id="id-form" error={!IDVerified} onKeyPress= {(e) => { if (e.key === 'Enter') { handleClick() } }} label="ID" value={IDNum} onChange={e => setIDNum(e.target.value)} className={classes.textField} margin="normal"/></TableCell>
    <TableCell></TableCell>
    <TableCell></TableCell>
    <TableCell></TableCell>
    <TableCell align="right"><IconButton aria-label="add" onClick={() => { handleClick() } } ><AddIcon fontSize="small" /></IconButton></TableCell>

    </TableRow>
  );
}

function InputTable() {

  const [ItemRows, setItemRows] = useState([]);
  const [SubTotal, setSubTotal] = useState(0);
  const [IVFee, setIVFee] = useState(5.00);
  const [Total, setTotal] = useState(0);

  let invoiceSubtotal = (ItemRows.length > 0) ? ((ItemRows.length > 1) ? ItemRows.map((e) => e.price).reduce((a,b) => a + b) : ItemRows[0].price) : 0;
  let invoiceTotal = invoiceSubtotal + IVFee;

  const classes = useStyles();

  const addItemRow = (IDCode) => {
    let tempItem = returnLabObject(IDCode);
    setItemRows([
      ...ItemRows,
      {
        index: ItemRows.length + 1,
        code: IDCode,
        name: tempItem.name,
        price: tempItem.price
      }
    ]);
  };

  const deleteItemRow = (index) => {
    let newRow = ItemRows.filter(function(row) {
      return row.index != index;
    });
    setItemRows(newRow);
  }

  return(
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
          {ItemRows.map(function(lab, i){
            return (
              <TableRow key={i}>
                <TableCell>{lab.code}</TableCell>
                <TableCell align="right">{lab.name}</TableCell>
                <TableCell></TableCell>
                <TableCell align="right">{ccyFormat(lab.price)}</TableCell>
                <TableCell align="right"><IconButton aria-label="delete" onClick={() => {deleteItemRow(lab.index)}}>
                    <DeleteIcon fontSize="small" /></IconButton>
                    </TableCell>
              </TableRow>
              );
          })}

          <InputRow onAddClick={(ID) => addItemRow(ID)}/>

          <TableRow>
            <TableCell rowSpan={3} />
            <TableCell rowSpan={3} />
            <TableCell align="left">Subtotal</TableCell>
            <TableCell align="right">{ccyFormat(invoiceSubtotal)}</TableCell>
            <TableCell/>
          </TableRow>
          <TableRow>
            <TableCell align="left">IV Fee</TableCell>
            <TableCell align="right">{ccyFormat(IVFee)}</TableCell>
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
  );

}

function App() {

const classes = useStyles();

  return (
    <div>
      <InputTable/>
    </div>
  );
}

export default App;
