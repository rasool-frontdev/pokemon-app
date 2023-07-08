import * as React from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import {
  AppBar,
  Tabs,
  Tab,
  Box,
  LinearProgress,
  Typography,
} from "@mui/material";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

export default function FullWidthTabs({ about, stats }) {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (_, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <Box sx={{ background: "#fff", width: "100%", height: '40vh' }}>
      <AppBar
        position="static"
        sx={{
          boxShadow: "none",
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          variant="fullWidth"
          aria-label="full width tabs example"
          sx={{
            background: "#fff",
            ".MuiTabs-indicator": {
              background: "#000",
            },
            ".Mui-selected": {
              color: "#000",
            },
          }}
        >
          <Tab
            sx={{ color: "#aaa", fontWeight: "600" }}
            label="Base stats"
            {...a11yProps(0)}
          />
          <Tab
            sx={{ color: "#aaa", fontWeight: "600" }}
            label="About"
            {...a11yProps(1)}
          />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          {stats?.map((s, i) => (
            <div key={i} className="row align-items-center">
              <div className="col-md-2">
                <p className="text-capitalize my-2">{s.stat.name}</p>
              </div>
              <div className="col-md-10">
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Box sx={{ width: "100%", mr: 1 }}>
                    <LinearProgress variant="determinate" value={s.base_stat > 100 ? 100 : s.base_stat} />
                  </Box>
                  <Box sx={{ minWidth: 35 }}>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                    >{`${s.base_stat > 100 ? 'over 100' : s.base_stat}%`}</Typography>
                  </Box>
                </Box>
              </div>
            </div>
          ))}
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <div>
            <h3>Abilities</h3>
            <ul>
              {about?.map((data, i) => (
                <li className="text-black" key={i}>
                  {data.ability.name}
                </li>
              ))}
            </ul>
          </div>
        </TabPanel>
      </SwipeableViews>
    </Box>
  );
}
