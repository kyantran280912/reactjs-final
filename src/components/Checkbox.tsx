import { Checkbox } from "@mui/material";
import React, { FC } from "react";

const label = { inputProps: { "aria-label": "Checkbox demo" } };
export const Checkboxs: FC<{
    onActive: () => void;
}> = ({ onActive }) => {
    const [checked, setChecked] = React.useState(false);
    const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(!checked);
        onActive();
    };
    return (
        <Checkbox
            {...label}
            checked={checked}
            onChange={(e) => handleCheckbox(e)}
            color="secondary"
        />
    );
};
