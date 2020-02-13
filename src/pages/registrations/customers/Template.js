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
import axios from "axios";
import { Redirect } from "react-router-dom";

import async from "../../../components/Async";

const FormCustomers = async(() => import("./Form"));

const NavLink = React.forwardRef((props, ref) => (
  <RouterNavLink innerRef={ref} {...props} />
));
const Divider = styled(MuiDivider)(spacing);
const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

class TemplateCustomers extends React.Component {
  state = {
    redirect: false,
    initialValues: {},
    load: false
  };

  async componentDidMount() {
    const { load } = this.state;
    const { match } = this.props;

    if (match.path.split("/")[3] === "edit" && !load) {
      const result = await axios.get(
        `http://destineja-orders-api.herokuapp.com/api/customers/${match.params.id}`
      );

      console.log(result.data);

      this.setState({
        initialValues: {
          name: result.data.name,
          companyName: result.data.companyName,
          identityDocument: result.data.identityDocument,
          nameContact: result.data.contacts[0].name,
          emailContact: result.data.contacts[0].value,
          streetAdmin: result.data.addresses[0].street,
          numberAdmin: result.data.addresses[0].number,
          complementAdmin: result.data.addresses[0].complement,
          neighborhoodAdmin: result.data.addresses[0].neighborhood,
          cityAdmin: result.data.addresses[0].city.name,
          stateAdmin: result.data.addresses[0].state.name,
          zipCodeAdmin: result.data.addresses[0].zipCode,
          streetCollect: result.data.addresses[1].street,
          numberCollect: result.data.addresses[1].number,
          complementCollect: result.data.addresses[1].complement,
          neighborhoodCollect: result.data.addresses[1].neighborhood,
          cityCollect: result.data.addresses[1].city.name,
          stateCollect: result.data.addresses[1].state.name,
          zipCodeCollect: result.data.addresses[1].zipCode
        },
        load: true
      });
    } else {
      this.setState({
        load: true
      });
    }
  }

  onSubmit = values => {
    const { match } = this.props;

    const request = {
      name: values.name,
      companyName: values.companyName,
      contacts: [
        {
          type: "Email",
          name: values.nameContact,
          value: values.emailContact
        }
      ],
      identityDocument: values.identityDocument,
      addresses: [
        {
          type: "Business",
          street: values.streetAdmin,
          number: values.numberAdmin,
          complement: values.complementAdmin,
          zipCode: values.zipCodeAdmin,
          neighborhood: values.neighborhoodAdmin,
          city: {
            name: values.cityAdmin
          },
          state: {
            name: values.stateAdmin
          }
        },
        {
          type: "Billing",
          street: values.streetCollect,
          number: values.numberCollect,
          complement: values.complementCollect,
          zipCode: values.zipCodeCollect,
          neighborhood: values.neighborhoodCollect,
          city: {
            name: values.cityCollect
          },
          state: {
            name: values.stateCollect
          }
        }
      ]
    };

    if (match.path.split("/")[3] === "edit") {
      axios.put(
        `http://destineja-orders-api.herokuapp.com/api/customers/${match.params.id}`,
        request
      );
    } else {
      axios.post(
        "http://destineja-orders-api.herokuapp.com/api/customers/",
        request
      );
    }

    this.setState({ redirect: true });
  };

  render() {
    const { redirect, initialValues, load } = this.state;
    const { match } = this.props;

    return (
      <React.Fragment>
        {redirect ? (
          <Redirect to="/registrations/customers" />
        ) : (
          <React.Fragment>
            <Typography variant="h3" gutterBottom display="inline">
              Adicionar cliente
            </Typography>

            <Breadcrumbs aria-label="Breadcrumb" mt={2}>
              <Link component={NavLink} exact to="/">
                Cadastros
              </Link>
              <Link component={NavLink} exact to="/">
                Clientes
              </Link>
              <Typography>
                {match.path.split("/")[3] === "edit" ? "Editar" : "Novo"}
              </Typography>
            </Breadcrumbs>

            <Divider my={6} />

            <Grid container spacing={6}>
              <Grid item xs={12}>
                {load && (
                  <FormCustomers
                    initialValues={initialValues}
                    onSubmit={this.onSubmit}
                  />
                )}
              </Grid>
            </Grid>
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

export default TemplateCustomers;
