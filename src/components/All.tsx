import React, { useMemo, useState } from "react";
import { Column } from "./Column";
import { Flex } from "./Flex";
import { Button, Input, Typography } from "@mui/material";
import { useAtom } from "jotai";
import { store } from "../store";
import { Checkboxs } from "./Checkbox";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";

const All = () => {
    const [value, setValue] = useState("");
    const [myTodo, setMyTodo] = useAtom(store.todoAtom);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const id = useMemo(() => uuidv4(), [myTodo]);
    const addTodo = () => {
        if (value === "") {
            return;
        }
        setMyTodo([...myTodo, { id, name: value, status: "all" }]);
        setValue("");
        toast.success("Task is added");
    };

    const deleteTodo = (id: string) => {
        const newTodo = myTodo.filter((todo) => todo.id !== id);
        setMyTodo(newTodo);
        toast.info("Task is deleted");
    };
    const onActive = (id: string) => {
        const newTodo = [...myTodo];
        const index = newTodo.findIndex((todo) => todo.id === id);
        newTodo[index] = {
            ...newTodo[index],
            status: newTodo[index].status === "all" ? "active" : "all",
        };
        setMyTodo(newTodo);
        toast.success("Task is active");
    };
    return (
        <Column>
            <Flex width={"100%"} gap={2}>
                <Flex
                    sx={{
                        flex: 1,
                        width: "100%",
                        border: "1px solid #909090",
                        borderRadius: 3,
                        pl: 2,
                        height: 40,
                    }}
                >
                    <Input
                        placeholder="Add details"
                        sx={{
                            fontSize: 14,
                            height: "100%",
                            width: "100%",
                            ":hover:not(.Mui-disabled, .Mui-error):before": {
                                borderBottom: "none",
                            },
                            "&::before": {
                                borderBottom: "none",
                            },
                            "&::after": {
                                borderBottom: "none",
                            },
                        }}
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                    />
                </Flex>
                <Button variant="outlined" onClick={addTodo}>
                    Add
                </Button>
            </Flex>
            <Column>
                <>
                    {myTodo.length > 0 &&
                        myTodo.map((item, index) => {
                            if (item.status === "all") {
                                return (
                                    <Flex
                                        key={index}
                                        justifyContent={"space-between"}
                                        pt={2}
                                    >
                                        <Flex>
                                            <Flex>
                                                <Checkboxs
                                                    onActive={() =>
                                                        onActive(item.id)
                                                    }
                                                />
                                            </Flex>
                                            <Typography
                                                fontWeight={500}
                                                sx={{
                                                    maxWidth: "400px",
                                                }}
                                            >
                                                {item.name}
                                            </Typography>
                                        </Flex>
                                        <Flex>
                                            <Button
                                                onClick={() =>
                                                    deleteTodo(item.id)
                                                }
                                            >
                                                Delete
                                            </Button>
                                        </Flex>
                                    </Flex>
                                );
                            } else {
                                return null;
                            }
                        })}
                </>
            </Column>
        </Column>
    );
};

export default All;
