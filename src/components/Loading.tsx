import {CircularProgress} from "@material-ui/core";
import React from "react";

export default function Loading() {
    return <div style={{textAlign: "center", marginTop: "50vh", height: "100vh"}}>
        <CircularProgress style={{height: 80, width: 80}}/>
    </div>
}