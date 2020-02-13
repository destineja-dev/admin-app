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

import EnhancedTable from "../../components/Table";

const NavLink = React.forwardRef((props, ref) => (
  <RouterNavLink innerRef={ref} {...props} />
));
const Divider = styled(MuiDivider)(spacing);
const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

let counter = 0;
const createData = (name, company, document, date, actions) => {
  counter += 1;
  return { id: counter, name, company, document, date, actions };
};
const data = [
  createData("Nome A", "Empresa A", 11161897000151, 20210510),
  createData("Nome B", "Empresa B", 11161897000151, 20210410),
  createData("Nome C", "Empresa C", 11161897000151, 20210403),
  createData("Nome D", "Empresa D", 11161897000151, 20210210),
  createData("Nome E", "Empresa E", 11161897000151, 20201210),
  createData("Nome F", "Empresa F", 11161897000151, 20201110),
  createData("Nome G", "Empresa G", 11161897000151, 20201010),
  createData("Nome H", "Empresa H", 11161897000151, 20200910),
  createData("Nome I", "Empresa I", 11161897000151, 20200810),
  createData("Nome J", "Empresa J", 11161897000151, 20200821),
  createData("Nome K", "Empresa K", 11161897000151, 20200510),
  createData("Nome L", "Empresa L", 11161897000151, 20200510),
  createData("Nome M", "Empresa M", 11161897000151, 20200710),
  createData("Nome N", "Empresa N", 11161897000151, 20200310),
  createData("Nome O", "Empresa O", 11161897000151, 20200210),
  createData("Nome P", "Empresa P", 11161897000151, 20200220),
  createData("Nome Q", "Empresa Q", 11161897000151, 20200207),
  createData("Nome R", "Empresa R", 11161897000151, 20200215),
  createData("Nome S", "Empresa S", 11161897000151, 20200110),
  createData("Nome T", "Empresa T", 11161897000151, 20200101)
];

const Destinations = () => {
  return (
    <React.Fragment>
      <Typography variant="h3" gutterBottom display="inline">
        Tabela de destinações
      </Typography>

      <Breadcrumbs aria-label="Breadcrumb" mt={2}>
        <Link component={NavLink} exact to="/">
          Cadastros
        </Link>
        <Typography>Destinações</Typography>
      </Breadcrumbs>

      <Divider my={6} />

      <Grid container spacing={6}>
        <Grid item xs={12}>
          <EnhancedTable data={data} />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default Destinations;
