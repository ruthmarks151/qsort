import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import {NavbarContext} from "../../components/NavbarContainer";
import BigInfoPage from "./BigInfoPage";
import OnboardingSort from "./OnboardingSort"
import {useParams} from 'react-router-dom';
import SelfResult from "./SelfResult";
import OnboardingAnalysis from "./OnboardingAnalysis";

export default function GettingStarted() {
    const {step} = useParams();

    React.useContext(NavbarContext).setTitle("Hello There!");
    return (
        <React.Fragment>
            {(() => {
                switch (step) {
                    case "self":
                        return <OnboardingSort/>;
                    case "selfResult":
                        return <SelfResult/>;
                    case "ideal":
                        return <OnboardingSort ideal/>;
                    case "idealResult":
                        return <OnboardingAnalysis/>;
                    case "congruence":
                        return "Congruence is a thing!";
                    default:
                        return <BigInfoPage
                            title="Who do you think you are?"
                            body={[
                                "How we see ourselves has a massive impact on how we feel and how we act.",
                                "These beliefs are often implicit, and are hard to think about all at once.",
                                "Congruency offers a ten minute self assessment that can give you a better understanding of how you think about yourself."
                            ]}
                            primaryText="Yeah, I'll spend 10 minutes to learn about myself"
                            primaryLink={"/self"}
                            secondaryText="I dunno, what are you going to tell me?"
                            secondaryLink={"/congruence"}
                        />
                }
            })()}

        </React.Fragment>
    );
}