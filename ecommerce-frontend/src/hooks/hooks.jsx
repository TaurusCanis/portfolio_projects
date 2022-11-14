import { useState } from "react";

export function useFormFields(initialState) {
    const [fields, setValues] = useState(initialState);

    function callFunction(e) {
        return;
    }

    function handleStateUpdate(e) {
        console.log("handleStateUpdate");
        setValues({
            ...fields,
            [e.target.name]: e.target.value,
        });
        return;
    }

    return [
        fields, 
        function (e) {
            if (typeof e == 'function') {
                console.log("call functions");
                console.log("e: ", e, " type: ", typeof e);
                // callFunction(e);
                // e.call(this);
                e();
            } else {
                handleStateUpdate(e);
            }
        }
    ];
}
