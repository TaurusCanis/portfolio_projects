import { useEffect, useContext, useState } from "react";
import DataContext from "../DataContext";

export default function Success() {
    const { sessionId, clearSessionId } = useContext(DataContext);

    useEffect(() => clearSessionId(sessionId), []);
    
    return (
        <>
            <h2> Success!</h2>
        </>
    );
}