import React from "react";
import styled from "styled-components";
import { NavLink as RouterNavLink } from "react-router-dom";
import {
  Grid,
  Link,
  Breadcrumbs as MuiBreadcrumbs,
  Divider as MuiDivider,
  Typography
} from "@material-ui/core";
import { spacing } from "@material-ui/system";

import EnhancedTable from "../../../components/Table";

const NavLink = React.forwardRef((props, ref) => (
  <RouterNavLink innerRef={ref} {...props} />
));
const Divider = styled(MuiDivider)(spacing);
const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

class Customers extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Typography variant="h3" gutterBottom display="inline">
          Tabela de clientes
        </Typography>

        <Breadcrumbs aria-label="Breadcrumb" mt={2}>
          <Link component={NavLink} exact to="/">
            Cadastros
          </Link>
          <Typography>Clientes</Typography>
        </Breadcrumbs>

        <Divider my={6} />

        <Grid container spacing={6}>
          <Grid item xs={12}>
            <EnhancedTable />
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

export default Customers;
