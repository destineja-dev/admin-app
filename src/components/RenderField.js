import React from "react";
import styled from "styled-components";
import {
  FormControl as MuiFormControl,
  FormHelperText,
  Input,
  InputLabel
} from "@material-ui/core";
import { spacing } from "@material-ui/system";

const FormControl = styled(MuiFormControl)(spacing);

const RenderField = ({ input, name, id, label, meta: { touched, error } }) => (
  <FormControl fullWidth mb={3}>
    <InputLabel htmlFor={name}>{label}</InputLabel>
    <Input {...input} name={name} id={id} type="text" placeholder={label} />
    {touched && error && <FormHelperText>{touched && error}</FormHelperText>}
  </FormControl>
);

export default RenderField;
