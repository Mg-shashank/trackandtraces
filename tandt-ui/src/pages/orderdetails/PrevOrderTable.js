import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination';

const useStyles = makeStyles({table: { minWidth: 650,},});

export default function PrevOrderTable(props) {
  //const[disabled,setdisabled]=useState(false)
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  // const classes = useStyles();
  const {rowses} = props;
  return (
    <Paper>
    <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell style={{fontWeight:'bold'}}>Order Id</TableCell>
              <TableCell style={{fontWeight:'bold'}}>Order Status</TableCell>
              </TableRow>
          </TableHead>
          <TableBody>
          {props.rowses.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row =>  (   
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">{row.orderid}</TableCell>                
                <TableCell>{row.orderstatus}</TableCell>
                </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
      rowsPerPageOptions={[5, 7]}
      component="div"
      count={[10]}
      rowsPerPage={rowsPerPage}
      page={page}
      onChangePage={handleChangePage}
      onChangeRowsPerPage={handleChangeRowsPerPage}
    />
    </Paper>
  );
}
