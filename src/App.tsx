import React, {useState} from 'react';
import firebase, {auth} from "firebase";
import {StyledFirebaseAuth} from 'react-firebaseui';

import './App.css';
import {Route, Link, BrowserRouter as Router} from 'react-router-dom'
import SortSelects from './components/SortSelects'
import * as firebaseui from "firebaseui";
import NavbarContainer, {useStyles} from "./components/NavbarContainer";
import {DashboardBody} from "./pages/DashboardBody/DashboardBody";
import Analysis from "./pages/Analysis/Analysis";
import {DoSort} from "./pages/DoSort/DoSort";
import {SortSelectionContext} from "./components/SortSelectionContext";
import SignInSide from "./SignInSide";
import {CircularProgress} from "@material-ui/core";
import GettingStarted from "./pages/GettingStarted/GettingStarted";
import Loading from "./components/Loading";

// Configure FirebaseUI.
const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
    // signInSuccessUrl: '/signedIn',
    callbacks: {
        // Avoid redirects after sign-in.
        signInSuccessWithAuthResult: (x: any) => {
            return false
        }
    },

    // We will display Google and Facebook as auth providers.
    signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    ]
};

function LoginSwitcher(props: { loggedIn: JSX.Element, loggedOut: JSX.Element }) {
    const [user, setUser] = React.useState<firebase.User | null>(null);
    const [waiting, setWaiting] = React.useState<boolean>(true);
    React.useEffect(() => {
        firebase.auth().onAuthStateChanged((u) => {
            setUser(u);
            setWaiting(false);
        });

    }, []);

    if (waiting) {
        return <Loading/>
    } else if (user == null) {
        return props.loggedOut
    } else {
        return props.loggedIn
    }

}

function App(): JSX.Element {
    const sideStyle = {alignSelf: "flex-end", margin: "auto", flexGrow: 1, flexBasis: 0};
    const classes = useStyles();
    return (
        <Router>
            <NavbarContainer>
                <LoginSwitcher
                    loggedIn={<React.Fragment>
                        <Route path={["/dashboard", "/"]} exact>
                            <DashboardBody/>
                        </Route>
                        <Route path="/dosort">
                            <SortSelects>
                                <DoSort/>
                            </SortSelects>
                        </Route>
                        <Route path="/compare">
                            <SortSelects>
                                <Analysis/>
                            </SortSelects>
                        </Route>
                    </React.Fragment>

                    }
                    loggedOut={<React.Fragment>
                        <Route path="/login">
                            <SignInSide uiConfig={uiConfig}/>
                        </Route>
                        <Route path={["/:step", "/"]}>
                            <GettingStarted/>
                        </Route>
                    </React.Fragment>/*

                <div className="App">
                    <header className="App-header">
                <span style={sideStyle}>

                </span>
                        <h1 style={{margin: 'auto'}}>Q Sorter</h1>
                        <span style={sideStyle}>

                </span>
                    </header>
                </div>
            */}/>
            </NavbarContainer>
        </Router>
    );
}

export default App;
