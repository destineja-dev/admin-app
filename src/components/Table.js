import React from "react";
import styled from "styled-components";
import { NavLink as RouterNavLink } from "react-router-dom";
import {
  Button,
  Checkbox,
  IconButton,
  InputBase,
  Card as MuiCard,
  Paper as MuiPaper,
  Table,
  TableBody,
  TableCell,
  TablePagination,
  TableRow,
  Toolbar,
  Tooltip,
  Typography
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import { spacing } from "@material-ui/system";
import SearchIcon from "@material-ui/icons/Search";
import axios from "axios";
import { Delete as DeleteIcon } from "@material-ui/icons";

import EnhancedTableHead from "./TableHead";

const NavLink = React.forwardRef((props, ref) => (
  <RouterNavLink innerRef={ref} {...props} />
));
const Card = styled(MuiCard)(spacing);
const Paper = styled(MuiPaper)(spacing);

const Spacer = styled.div`
  flex: 1 1 100%;
`;
const TableWrapper = styled.div`
  overflow-y: auto;
  max-width: calc(100vw - ${props => props.theme.spacing(12)}px);
`;

const desc = (a, b, orderBy) => {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
};
const stableSort = (array, cmp) => {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
};
const getSorting = (order, orderBy) => {
  return order === "desc"
    ? (a, b) => desc(a, b, orderBy)
    : (a, b) => -desc(a, b, orderBy);
};
const dateFormat = number => {
  const num = number.toString();
  const day = num.substring(8, 10);
  const month = num.substring(5, 7);
  const year = num.substring(0, 4);
  return `${day}/${month}/${year}`;
};
const documentFormat = number => {
  const num = number.toString();
  const first = num.substring(0, 2);
  const second = num.substring(2, 5);
  const third = num.substring(5, 8);
  const fourth = num.substring(8, 12);
  const fifth = num.substring(12, 14);
  return `${first}.${second}.${third}/${fourth}-${fifth}`;
};

class EnhancedTable extends React.Component {
  state = {
    order: "asc",
    orderBy: "name",
    selected: [],
    data: [],
    page: 0,
    rowsPerPage: 10,
    query: []
  };

  async componentDidMount() {
    const result = await axios.get(
      "http://destineja-orders-api.herokuapp.com/api/customers/"
    );
    this.setState({ data: result.data, query: result.data });
  }

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = "desc";

    if (this.state.orderBy === property && this.state.order === "desc") {
      order = "asc";
    }

    this.setState({ order, orderBy });
  };

  handleSelectAllClick = event => {
    if (event.target.checked) {
      this.setState(state => ({ selected: state.data.map(n => n.id) }));
      return;
    }
    this.setState({ selected: [] });
  };

  handleClick = (event, id) => {
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    this.setState({ selected: newSelected });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  isSelected = id => this.state.selected.indexOf(id) !== -1;

  handleSearch = (event, data) => {
    const result = data.filter(
      item =>
        item.name.toLowerCase().search(event.target.value.toLowerCase()) !== -1
    );

    this.setState({ query: result });
  };

  handleDelete = () => {
    const { selected, data } = this.state;
    for (let i = selected.length; i > 0; i--) {
      axios.delete(
        `http://destineja-orders-api.herokuapp.com/api/customers/${
          selected[i - 1]
        }`
      );
      data.splice(data.indexOf(selected[i - 1]), 1);
      selected.splice(selected.indexOf(selected[i - 1]), 1);
    }
    this.setState({ data, selected });
  };

  render() {
    const {
      data,
      order,
      orderBy,
      selected,
      rowsPerPage,
      page,
      query
    } = this.state;
    const emptyRows =
      rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

    return (
      <Card mb={6}>
        <Paper>
          <Toolbar>
            {selected.length > 0 ? (
              <Typography
                style={{ flex: "1 1 100%" }}
                color="inherit"
                variant="subtitle1"
              >
                {selected.length === 1
                  ? `${selected.length} selecionado`
                  : `${selected.length} selecionados`}
              </Typography>
            ) : (
              <div style={{ display: "flex", flexGrow: 1 }}>
                <InputBase
                  style={{ marginLeft: "10px", flex: 1 }}
                  placeholder="Pesquisar"
                  inputProps={{ "aria-label": "pesquisar" }}
                  onChange={event => this.handleSearch(event, data)}
                />
                <Tooltip title="Pesquisar">
                  <IconButton
                    type="submit"
                    style={{ padding: 10 }}
                    aria-label="pesquisar"
                  >
                    <SearchIcon />
                  </IconButton>
                </Tooltip>
              </div>
            )}
            <Spacer />
            <div>
              {selected.length > 0 ? (
                <Tooltip title="Deletar">
                  <IconButton
                    aria-label="Deletar"
                    onClick={() => this.handleDelete()}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              ) : (
                <NavLink
                  to="/registrations/customers/new"
                  href="/registrations/customers/new"
                  style={{ textDecoration: "none" }}
                >
                  <Button
                    style={{ marginRight: "10px" }}
                    variant="contained"
                    color="primary"
                  >
                    Adicionar
                  </Button>
                </NavLink>
              )}
            </div>
          </Toolbar>
          <TableWrapper>
            <Table aria-labelledby="tableTitle">
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={this.handleSelectAllClick}
                onRequestSort={this.handleRequestSort}
                rowCount={data.length}
              />
              <TableBody>
                {stableSort(
                  query === [] ? data : query,
                  getSorting(order, orderBy)
                )
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map(n => {
                    const isSelected = this.isSelected(n.id);
                    return (
                      <TableRow
                        hover
                        onClick={event => this.handleClick(event, n.id)}
                        role="checkbox"
                        aria-checked={isSelected}
                        tabIndex={-1}
                        key={n.id}
                        selected={isSelected}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox checked={isSelected} />
                        </TableCell>
                        <TableCell component="th" scope="row" padding="none">
                          {n.name}
                        </TableCell>
                        <TableCell align="right">{n.companyName}</TableCell>
                        <TableCell align="right">
                          {documentFormat(n.identityDocument)}
                        </TableCell>
                        <TableCell align="right">
                          {dateFormat(n.createdAt)}
                        </TableCell>
                        <TableCell align="right">
                          <Tooltip title="Editar">
                            <NavLink
                              to={`/registrations/customers/edit/${n.id}`}
                              href={`/registrations/customers/edit/${n.id}`}
                              style={{ textDecoration: "none" }}
                            >
                              <IconButton aria-label="editar">
                                <EditIcon />
                              </IconButton>
                            </NavLink>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 49 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableWrapper>
          <TablePagination
            rowsPerPageOptions={[]}
            component="div"
            count={query === [] ? data.length : query.length}
            rowsPerPage={rowsPerPage}
            page={page}
            backIconButtonProps={{
              "aria-label": "Previous Page"
            }}
            nextIconButtonProps={{
              "aria-label": "Next Page"
            }}
            onChangePage={this.handleChangePage}
            onChangeRowsPerPage={this.handleChangeRowsPerPage}
          />
        </Paper>
      </Card>
    );
  }
}

export default EnhancedTable;
