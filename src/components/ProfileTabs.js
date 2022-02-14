import React from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const StyledButton = withStyles({
  root: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    borderRadius: 3,
    border: 0,
    color: "white",
    height: 48,
    padding: "0 30px",
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)"
  },
  label: {
    textTransform: "capitalize"
  }
})(Button);

const StyledTab = withStyles({
  root: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    borderRadius: 3,
    border: 0,
    color: "white",
    height: 48,
    padding: "0 30px",
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    "&$selected": {
      backgroundColor: "blue"
    }
  },
  label: {
    textTransform: "capitalize"
  }
})(Tab);

export default function SimpleTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Tabs value={value} onChange={handleChange} >
        {/* <Tab label="공개 스팟" style={{ width: "30%" }} />
        <Tab label="비밀 스팟" style={{ width: "30%" }} /> */}
        <StyledTab label="tab 1" />
        <StyledTab label="tab 1" />
        <StyledTab label="tab 2" />
      </Tabs>

      <div>{value}</div>

      <StyledButton>styled button</StyledButton>
    </>
  );
}
