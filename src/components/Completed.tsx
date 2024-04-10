import React, { useMemo, useState } from "react";
import { Column } from "./Column";
import { Flex } from "./Flex";
import { Button, Checkbox, Input, Typography } from "@mui/material";
import { useAtom } from "jotai";
import { store } from "../store";
import { Checkboxs } from "./Checkbox";
import { toast } from "react-toastify";
const Completed = () => {
    const [myTodo, setMyTodo] = useAtom(store.todoAtom);
    const deleteTodo = (id: string) => {
        const newTodo = myTodo.filter((todo) => todo.id !== id);
        setMyTodo(newTodo);
        toast.info("Task is deleted");
    };
    const deleteAll = () => {
        const newTodo = myTodo.filter((todo) => todo.status !== "completed");
        setMyTodo(newTodo);
        toast.info("All task is deleted");
    };
    return (
        <Column>
            <Flex justifyContent={"flex-end"}>
                <Button
                    onClick={() => deleteAll()}
                    sx={{
                        backgroundColor: "#ab4040",
                        color: "white",
                        "&:hover": {
                            opacity: 0.8,
                            backgroundColor: "#ab4040",
                        },
                    }}
                >
                    Delete All
                </Button>
            </Flex>
            <>
                {myTodo.length > 0 &&
                    myTodo.map((item, index) => {
                        if (item.status === "completed") {
                            return (
                                <Flex
                                    key={index}
                                    justifyContent={"space-between"}
                                    pt={2}
                                    sx={{
                                        maxWidth: "100%",
                                    }}
                                >
                                    <Flex>
                                        <Checkbox checked color="success" />
                                        <Typography fontWeight={500}>
                                            {item.name}
                                        </Typography>
                                    </Flex>
                                    <Flex>
                                        <Button
                                            onClick={() => deleteTodo(item.id)}
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
    );
};

export default Completed;
