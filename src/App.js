import React, { useState } from "react";
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
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import CryptoJS from "crypto-js";
import base64url from "base64url";
import CryptoRandomString from "crypto-random-string";

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
    width: "100%",
    maxWidth: "100%",
    maxHeight: "100%",
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
  thumbColorPrimary: {
    color: "#2E4355",
  },
  track: {
    color: "#2E4355",
  },
  valueLabel: {
    fontSize: ".8rem",
  },
}));

export default function App() {
  // Use the above styles.
  const classes = useStyles();

  // State variables and setters.
  const [numChars, setNumChars] = useState(128);
  const [codeVerifier, setCodeVerifier] = useState("");
  const [codeChallenge, setCodeChallenge] = useState("");
  const [codeChallengeMethod, setCodeChallengeMethod] = useState("S256");

  const handleSubmit = (event) => {
    let cVerifier = generateCodeVerifier();
    generateCodeChallenge(cVerifier);
    event.preventDefault();
  };

  const handleNumCharsChange = (event, newValue) => {
    setNumChars(newValue);
    event.preventDefault();
  };

  const handleCodeChallengeMethodChange = (event, newValue) => {
    setCodeChallengeMethod(newValue);
    event.preventDefault();
  };

  const generateRandomStr = function (length) {
    return CryptoRandomString({ length: length });
  };

  const generateCodeVerifier = () => {
    let randStr = generateRandomStr(numChars);
    setCodeVerifier(randStr);
    return randStr;
  };

  const generateCodeChallenge = (cVerifier) => {
    if (codeChallengeMethod === "S256") {
      let encrypted = CryptoJS.SHA256(base64url(cVerifier));
      setCodeChallenge(encrypted.toString(CryptoJS.enc.Hex));
    } else {
      setCodeChallenge(cVerifier);
    }
  };

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
        style={{ height: "100%", width: "100%", maxWidth: "100vw" }}
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
              alignItems="stretch"
              xs={12}
              style={{ flex: "10 0 auto" }}
            >
              <Grid item xs={12} style={{ flex: "1 0 auto" }}>
                <Typography>Number of Characters</Typography>

                <Box style={{ paddingTop: "30px" }}>
                  <Slider
                    classes={{
                      thumbColorPrimary: classes.thumbColorPrimary,
                      track: classes.track,
                      valueLabel: classes.valueLabel,
                    }}
                    value={numChars}
                    min={43}
                    max={128}
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
                        value="plain"
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
                  className={classes.submit}
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Generate New
                </Button>
              </Grid>

              <Grid item container xs={12} style={{ flex: "10 0 auto" }}>
                <Grid item xs={12}>
                  <Typography>
                    Code-Verifier ({codeVerifier ? codeVerifier.length : 0}{" "}
                    chars)
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Box
                    height="100%"
                    minHeight="10vh"
                    width="100%"
                    minWidth="100%"
                    maxWidth="100%"
                    marginTop="0rem"
                    marginBottom="0rem"
                    padding="0"
                    style={{}}
                  >
                    <TextField
                      variant="outlined"
                      fullWidth
                      value={codeVerifier}
                      multiline
                      placeholder="code-verifier"
                      inputProps={{ readOnly: true }}
                    />
                  </Box>
                </Grid>
              </Grid>
              <Grid item xs={12} style={{ flex: "10 0 auto" }}>
                <Typography>
                  Code-Challenge ({codeChallenge ? codeChallenge.length : 0}{" "}
                  chars)
                </Typography>
                <Box
                  height="100%"
                  minHeight="10vh"
                  marginTop="0rem"
                  marginBottom="0rem"
                >
                  <TextField
                    variant="outlined"
                    fullWidth
                    value={codeChallenge}
                    multiline
                    placeholder="code-challenge"
                    inputProps={{ readOnly: true }}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} style={{ flex: "10 0 auto" }}>
                <Typography>Code-Challenge-Method</Typography>
                <Box
                  height="100%"
                  minHeight="10vh"
                  marginTop="0rem"
                  marginBottom="0rem"
                >
                  <TextField
                    variant="outlined"
                    fullWidth
                    value={codeChallengeMethod}
                    multiline
                    placeholder="code-challenge"
                    inputProps={{ readOnly: true }}
                  />
                </Box>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </Grid>
  );
}
