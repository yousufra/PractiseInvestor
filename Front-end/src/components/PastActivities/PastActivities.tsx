/* eslint-disable */
import { useEffect, MouseEvent, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {Table, TableBody, TableCell, TableContainer, TableFooter, TablePagination, TableHead, TableRow, Paper, IconButton, Box} from '@material-ui/core';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@material-ui/icons';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import LastPageIcon from '@material-ui/icons/LastPage';
import { useSelector, useDispatch } from 'react-redux';
import { PastActivity } from './PastActivity/PastActivity';
import { getAllActivities } from '../../actions/activity';

const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));

interface Props {
  count: any,
  page: any,
  rowsPerPage: any,
  onPageChange: any;
}

function TablePaginationActions({ count, page, rowsPerPage, onPageChange }: Props) {
  // determine types after done with tsx
  console.log(count, page, rowsPerPage, onPageChange);

  const classes = useStyles1();
  const theme = useTheme();

  const handleFirstPageButtonClick = (event: MouseEvent<HTMLElement>) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event: MouseEvent<HTMLElement>) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event: MouseEvent<HTMLElement>) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event: MouseEvent<HTMLElement>) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

const useStyles2 = makeStyles({
  table: {
    minWidth: 500,
  },
});

export default function CustomPaginationActionsTable() {
  const classes = useStyles2();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllActivities());
  }, [dispatch]);

  const activities = useSelector((state: any) => state.activities);

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, activities.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box m={1}>
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="custom pagination table">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell align="right">Company</TableCell>
            <TableCell align="right">Ticker</TableCell>
            <TableCell align="right">Action</TableCell>
            <TableCell align="right">Quantity</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Net Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? activities.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : activities
          ).map((activity, index) => (
              <PastActivity key={index} activity={activity} />
              ))}

          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={3}
              count={activities.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: { 'aria-label': 'rows per page' },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
    </Box>
  );
}
