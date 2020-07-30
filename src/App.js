import React, { useState, lazy, Suspense } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import { makeStyles } from "@material-ui/core/styles";
import Slider from "@material-ui/core/Slider";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

import { importMDX } from "mdx.macro";

// const Content = lazy(() => importMDX("./InfoText.mdx"));

const useStyles = makeStyles((theme) => ({
  root: {
    maxHeight: "100vw",
  },
  image: {
    backgroundImage:
      "url(https://pingidentity.com/content/dam/ping-6-2-assets/open-graph-images/2019/P14C-Build-OG.png)",
    backgroundRepeat: "no-repeat",
    backgroundColor: "#576877",
    backgroundSize: "cover",
    backgroundPosition: "center",
    maxHeight: "20vw",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    height: "100%",
    flexDirection: "column",
    alignItems: "stretch",
    justifyContent: "flex-start",
    color: "#2E4355",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "#2E4355",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(10),
  },
  submit: {
    backgroundColor: "#2E4355",
    margin: theme.spacing(3, 0, 2),
  },
  typography: {
    color: "#2E4355",
    fontSize: "1rem",
  },
  errorMessage: {
    color: "red",
  },
  infoPaperContainer: {
    maxHeight: "100%",
    overflow: "auto",
  },
  info: {
    height: "100%",
    maxHeight: "100%",
    color: "#2E4355",
    margin: "0",
    padding: "0",
  },
}));

export default function App() {
  // Use the above styles.
  const classes = useStyles();

  // State variables and setters.
  const [numChars, setNumChars] = useState(32);
  const [randomStr, setRandomStr] = useState("");
  const [codeVerifier, setCodeVerifier] = useState("");
  const [codeChallenge, setCodeChallenge] = useState("");
  const [codeChallengeMethod, setCodeChallengeMethod] = useState("S256");
  const [anchorEl, setAnchorEl] = useState(null);
  const [jotError, setJotError] = useState(null);

  const open = Boolean(anchorEl);
  const id = open ? "popover" : undefined;

  const handleSubmit = (event) => {
    event.preventDefault();

    try {
      generateRandomStr();
    } catch (e) {
      // Gets the reason for failure.
      let msg = e.message.split(". ")[1];
      console.error(msg);
      setJotError(msg);
      setAnchorEl(event.currentTarget);
    }
  };

  const handleNumCharsChange = (event, newValue) => {
    setNumChars(newValue);
    event.preventDefault();
  };

  const handleCodeChallengeMethodChange = (event, newValue) => {
    setCodeChallengeMethod(newValue);
    event.preventDefault();
  };

  const generateRandomStr = () => {
    let dj = "";
    setCodeVerifier(dj);
  };

  const generateCodeVerifier = () => {};

  const generateCodeChallenge = () => {};

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />

      <Grid
        item
        container
        xs={12}
        component={Paper}
        elevation={6}
        square
        style={{ height: "100%" }}
      >
        <Grid item container className={classes.paper} direction="column">
          <Grid
            item
            container
            xs={12}
            justify="center"
            style={{
              flex: "0 1 0",
            }}
          >
            <Avatar className={classes.avatar}>
              <LockOpenIcon />
            </Avatar>
          </Grid>

          {/* Title */}
          <Grid item xs={12} style={{ flex: "0 1 0" }}>
            <Typography component="h3" variant="h3" align="center">
              PKCE Code Generator
            </Typography>
          </Grid>

          <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <Grid
              item
              container
              direction="column"
              justify="flex-between"
              alignItems="stretch"
              xs={12}
              style={{ flex: "10 0 auto" }}
            >
              <Grid item xs={12} style={{ flex: "1 0 auto" }}>
                <Typography>Number of Characters</Typography>

                <Box style={{ paddingTop: "30px" }}>
                  <Slider
                    value={numChars}
                    min={43}
                    max={256}
                    onChange={handleNumCharsChange}
                    valueLabelDisplay="on"
                    aria-labelledby="continuous-slider"
                  />
                </Box>
              </Grid>
              <Grid item xs={12} style={{ flex: "1 0 auto" }}>
                <Typography>Code Challenge Method</Typography>

                <Box>
                  <FormControl required component="fieldset">
                    <RadioGroup
                    row
                      aria-label="code-challenge-method"
                      name="code-challenge-method"
                      value={codeChallengeMethod}
                      onChange={handleCodeChallengeMethodChange}
                    >
                      <FormControlLabel
                        value="Plain"
                        control={<Radio />}
                        label="Plain"
                      />
                      <FormControlLabel
                        value="S256"
                        control={<Radio />}
                        label="SHA-256"
                      />
                    </RadioGroup>
                  </FormControl>
                </Box>
              </Grid>

              {/* Generate Button */}
              <Grid item xs={12} style={{ flex: "1 0 auto" }}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Generate New
                </Button>
              </Grid>
              <Grid item xs={12} style={{ flex: "10 0 auto" }}>
                {/* Random String */}
                <Typography>Random String</Typography>
                <Box
                  border={1}
                  borderRadius={5}
                  borderColor="#576877"
                  height="100%"
                  minHeight="10vh"
                  marginTop="0rem"
                  marginBottom="1rem"
                  padding="0"
                >
                  <Typography>{randomStr}</Typography>
                </Box>
              </Grid>
              <Grid item xs={12} style={{ flex: "10 0 auto" }}>
                <Typography>Code-Verifier</Typography>
                <Box
                  border={1}
                  borderRadius={5}
                  borderColor="#576877"
                  height="100%"
                  minHeight="10vh"
                  marginTop="0rem"
                  marginBottom="1rem"
                  padding="0"
                >
                  <Typography>43 chars</Typography>
                </Box>
              </Grid>
              <Grid item xs={12} style={{ flex: "10 0 auto" }}>
                <Typography>Code-Challenge</Typography>
                <Box
                  border={1}
                  borderRadius={5}
                  borderColor="#576877"
                  height="100%"
                  minHeight="20vh"
                  marginTop="0rem"
                  marginBottom="0rem"
                >
                  <Typography>code challenge</Typography>
                </Box>
              </Grid>
              <Grid item xs={12} style={{ flex: "10 0 auto" }}>
                <Typography>Code-Challenge-Method</Typography>
                <Box
                  border={1}
                  borderRadius={5}
                  borderColor="#576877"
                  height="100%"
                  minHeight="20vh"
                  marginTop="0rem"
                  marginBottom="0rem"
                >
                  <Typography>Plain, S256</Typography>
                </Box>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </Grid>
  );
}
