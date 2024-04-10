import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import * as React from "react";
import { SxProps } from "@mui/system";
import { Column } from "./Column";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            <Box>{children}</Box>
        </div>
    );
}

export function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    };
}

interface BasicTab {
    label: string[];
    children: React.ReactNode[];
    sxContainer?: SxProps;
    sxTabs?: SxProps;
}

export default function TabCustom({
    label,
    children,
    sxContainer,
    sxTabs,
}: BasicTab) {
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Column gap={4} sx={{ width: "100%" }}>
            <Box
                sx={{
                    "& .MuiTabs-indicator": {
                        display: "none",
                        backgroundColor: "transparent",
                    },
                }}
            >
                <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="basic tabs example"
                    sx={{
                        "& .MuiTabs-flexContainer": {
                            gap: 2,
                            borderBottom: "1px solid #E0E0E0",
                        },
                        ...sxContainer,
                    }}
                >
                    {label.map((tab, i) => (
                        <Tab
                            key={i}
                            label={tab}
                            {...a11yProps(i)}
                            sx={{
                                color: "text.primary",
                                width: "calc((100% / 3) - 16px)",
                                "&.Mui-selected": {
                                    color: "text.primary",
                                    "& span": {
                                        backgroundColor: "primary.main",
                                        height: "1px",
                                        bottom: 0,
                                        top: "auto",
                                    },
                                },
                                "&.MuiTab-textColorPrimary": {
                                    fontSize: "15px",
                                    fontWeight: 500,
                                },
                                ...sxTabs,
                            }}
                        />
                    ))}
                </Tabs>
            </Box>
            {children.map((child, i) => (
                <CustomTabPanel value={value} index={i} key={i}>
                    {child}
                </CustomTabPanel>
            ))}
        </Column>
    );
}
