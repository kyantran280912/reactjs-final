import React, { useEffect } from "react";
import Todos from "./components/Todos";
import { Typography } from "@mui/material";
import { Column } from "./components/Column";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
    return (
        <>
            <ToastContainer />
            <Column className="App" alignItems={"center"}>
                <Typography variant="h2">#Todo</Typography>
                <Todos />
            </Column>
        </>
    );
}

export default App;
