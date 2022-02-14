// styles
import { FormControl, InputBase } from "@material-ui/core";
import { Input, TextField } from "@material-ui/core";
import * as React from "react";

import {
  createMuiTheme,
  ThemeProvider,
  makeStyles,
} from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#fa100a",
    },
    secondary: {
      light: "#0066ff",
      main: "#fff ",

      contrastText: "#ffcc00",
    },
  },
  overrides: {
    MuiOutlinedInput: {
      root: {
        "&:hover:not($disabled):not($focused):not($error) $notchedOutline": {
          border: "2px solid var(--primary)",
          transitionDuration: ".3s",
          color: "var(--primary)",
          height: "90",
        },
      },
    },
    MuiInputLabel: {
      color: 'red !important',
      shrink: {
        transform: "translate(8px, 8px) scale(0.75) !important",
      },
    },
    input: { padding: "10px 14px" },
    height: "90",
  },
});
const useStyles = makeStyles({
  root: {
    backgroundColor: "var(--input-bg) !important",
    "&.Mui-focused": {
      color: "var(--textColor)",
    },
  },
  input: {
    "&::selection": {
      color: "var(--textColor)",
    },
  },
});
const useLabelStyles = makeStyles({
  root: {
    color: 'red !important'
,    "&.Mui-focused": {
    },
  },
});

const TextInput = React.forwardRef(function OutlinedInput(props, ref) {
  const classes = useStyles();
  const labelClasses = useLabelStyles();
  const {
    fullWidth = false,
    inputComponent = "input",
    label,
    labelText = label,
    labelWidth = 0,
    multiline = false,
    notched,
    type,
    value,
    ...other
  } = props;

  return (
    <ThemeProvider theme={theme}>
      <TextField
        margin="normal"
        variant="outlined"
        label={label}
        labelText={label}
        fullWidth
        InputProps={{ classes: classes, notched: false }}
        InputLabelProps={{ classes: labelClasses }}
        inputComponent={inputComponent}
        multiline={multiline}
        ref={ref}
        type={type}
        {...other}
      />
    </ThemeProvider>
  );
});

export default TextInput;
