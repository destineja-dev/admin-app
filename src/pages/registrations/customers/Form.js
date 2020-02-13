import React from "react";
import styled from "styled-components";
import { reduxForm, Field } from "redux-form";
import {
  Grid,
  Button,
  Card as MuiCard,
  FormControl as MuiFormControl,
  CardContent,
  Input,
  InputLabel,
  Typography
} from "@material-ui/core";
import { spacing } from "@material-ui/system";

const Card = styled(MuiCard)(spacing);
const FormControl = styled(MuiFormControl)(spacing);

import RenderField from "../../../components/RenderField";

function FormCustomers({ handleSubmit }) {
  return (
    <form onSubmit={handleSubmit}>
      <Card mb={6}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Informações básicas:
          </Typography>

          <Grid container spacing={6}>
            <Grid item md={4}>
              <Field
                name="name"
                id="name"
                component={RenderField}
                label="Nome fantasia"
              />
            </Grid>
            <Grid item md={4}>
              <Field
                name="companyName"
                id="companyName"
                component={RenderField}
                label="Razão social"
              />
            </Grid>
            <Grid item md={4}>
              <Field
                name="identityDocument"
                id="identityDocument"
                component={RenderField}
                label="Cnpj"
              />
            </Grid>
          </Grid>

          <Typography variant="h6" gutterBottom>
            Informações de contato:
          </Typography>

          <Grid container spacing={6}>
            <Grid item md={4}>
              <Field
                name="nameContact"
                id="nameContact"
                component={RenderField}
                label="Nome"
              />
            </Grid>
            <Grid item md={4}>
              <Field
                name="emailContact"
                id="emailContact"
                component={RenderField}
                label="E-mail"
              />
            </Grid>
          </Grid>

          <Typography variant="h6" gutterBottom>
            Endereço administrativo:
          </Typography>

          <Grid container spacing={6}>
            <Grid item md={6}>
              <Field
                name="streetAdmin"
                id="streetAdmin"
                component={RenderField}
                label="Rua"
              />
            </Grid>
            <Grid item md={3}>
              <Field
                name="numberAdmin"
                id="numberAdmin"
                component={RenderField}
                label="Número"
              />
            </Grid>
            <Grid item md={3}>
              <Field
                name="complementAdmin"
                id="complementAdmin"
                component={RenderField}
                label="Complemento"
              />
            </Grid>
          </Grid>

          <Grid container spacing={6}>
            <Grid item md={3}>
              <Field
                name="neighborhoodAdmin"
                id="neighborhoodAdmin"
                component={RenderField}
                label="Bairro"
              />
            </Grid>
            <Grid item md={3}>
              <Field
                name="cityAdmin"
                id="cityAdmin"
                component={RenderField}
                label="Cidade"
              />
            </Grid>
            <Grid item md={3}>
              <Field
                name="stateAdmin"
                id="stateAdmin"
                component={RenderField}
                label="Estado"
              />
            </Grid>
            <Grid item md={3}>
              <Field
                name="zipCodeAdmin"
                id="zipCodeAdmin"
                component={RenderField}
                label="Cep"
              />
            </Grid>
          </Grid>

          <Typography variant="h6" gutterBottom>
            Endereço de coleta:
          </Typography>

          <Grid container spacing={6}>
            <Grid item md={6}>
              <Field
                name="streetCollect"
                id="streetCollect"
                component={RenderField}
                label="Rua"
              />
            </Grid>
            <Grid item md={3}>
              <Field
                name="numberCollect"
                id="numberCollect"
                component={RenderField}
                label="Número"
              />
            </Grid>
            <Grid item md={3}>
              <Field
                name="complementCollect"
                id="complementCollect"
                component={RenderField}
                label="Complemento"
              />
            </Grid>
          </Grid>

          <Grid container spacing={6}>
            <Grid item md={3}>
              <Field
                name="neighborhoodCollect"
                id="neighborhoodCollect"
                component={RenderField}
                label="Bairro"
              />
            </Grid>
            <Grid item md={3}>
              <Field
                name="cityCollect"
                id="cityCollect"
                component={RenderField}
                label="Cidade"
              />
            </Grid>
            <Grid item md={3}>
              <Field
                name="stateCollect"
                id="stateCollect"
                component={RenderField}
                label="Estado"
              />
            </Grid>
            <Grid item md={3}>
              <Field
                name="zipCodeCollect"
                id="zipCodeCollect"
                component={RenderField}
                label="Cep"
              />
            </Grid>
          </Grid>

          <Button type="submit" variant="contained" color="primary">
            Adcionar
          </Button>
        </CardContent>
      </Card>
    </form>
  );
}

export default reduxForm({
  form: "customers"
})(FormCustomers);
