import React, {useState} from 'react';
import firebase, {auth} from "firebase";
import {StyledFirebaseAuth} from 'react-firebaseui';

import './App.css';

import Body from './components/Body'
import * as firebaseui from "firebaseui";

// Configure FirebaseUI.
const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
    // signInSuccessUrl: '/signedIn',
    callbacks: {
        // Avoid redirects after sign-in.
        signInSuccessWithAuthResult: (x: any) => { return false}
    },

    // We will display Google and Facebook as auth providers.
    signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    ]
};
function LoginOrName() {
    const [user, setUser] = React.useState<firebase.User | null>(null);

    React.useEffect(() => {
        firebase.auth().onAuthStateChanged((u) => {setUser(u)});
    }, []);

    if (user == null){
        return <StyledFirebaseAuth uiConfig={uiConfig}
                                   firebaseAuth={firebase.auth()}/>
    }else {
        return <h4>Hello, {user.displayName == null ? "friend" : user.displayName.split(' ')[0]}</h4>
    }

}
function App(): JSX.Element {
    const sideStyle = {alignSelf: "flex-end", margin: "auto", flexGrow: 1, flexBasis: 0};
    return (
        <div className="App">
            <header className="App-header">
                <span style={sideStyle}>

                </span>
                <h1 style={{margin: 'auto'}}>Q Sorter</h1>
                <span style={sideStyle}>
                    <LoginOrName/>
                </span>
            </header>
            <Body/>
        </div>
    );
}

export default App;
