import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { Link } from 'react-router-dom';


import { Paper, Table, TableBody, Toolbar, Tooltip, TableCell, Checkbox, IconButton, Typography } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import AddBoxIcon from '@material-ui/icons/AddBox';

const TableToolbar = (props) => (
  <Toolbar>
    {props.numSelected && (
      <div style={{display: 'inherit'}}>
        {props.checkCircleIcon && <Tooltip title="Publish">
          <IconButton aria-label="done" onClick={props.operation}>
            <CheckCircleIcon />
          </IconButton>
        </Tooltip>}
        {props.deleteIcon && <Tooltip title="Delete">
          <IconButton aria-label="delete" onClick={props.operation}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>}
      </div>
    ) }
  </Toolbar>
);


const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});

const  DataTable = (props) => {
  const classes = useStyles();
  const [ page, setPage ] = useState(0);
  const [ rowsPerPage, setRowsPerPage ] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div style={{ width: '90%', height: 400, padding: '5% 5%' }}>
      <Paper className={classes.root}>
        <Typography variant="h6" id="tableTitle" component="div">
          {props.tableName}
        </Typography>

        { props.checkbox &&  <TableToolbar 
          numSelected={props.selectedRow}
          operation={props.operation}
          deleteIcon={props.deleteIcon}
          checkCircleIcon={props.checkCircleIcon}
        /> }
        <TableContainer className={classes.container}>
          { props.addElement && <Link to='/api/categories/createcategory'>
            <IconButton aria-label="add" style={{textDecoration: 'none'}}>
              <AddBoxIcon />
              <Typography color="inherit">Add Category</Typography>
            </IconButton> 
          </Link> 
          }
          <Table stickyHeader aria-label="sticky table">
            <TableHead>

              <TableRow>
                { props.checkbox &&         
                  <TableCell padding="checkbox">
                  </TableCell>
                }

                {props.columns.map((column) => (

                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {props.rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {

                props.helper?.(row);

                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row._id} >
                      { props.checkbox &&         
                        <TableCell padding="checkbox">
                          <Checkbox

                            checked={props.selectedRow === row._id}
                            onChange={(event) => props.handleSelectedRow(row._id)}
                            inputProps={{ 'aria-label': 'select all desserts' }}
                          />

                        </TableCell>
                      }

                      {props.columns.map((column) => {
                          const value = row[column.id];
                          return (
                              <TableCell key={column.id} align={column.align}>
                                  { typeof value === 'boolean' ? (value ? 'Yes' : 'No') : value  }
                              </TableCell>
                          );
                      })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={props.rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}


export default DataTable;