import React, { useMemo, useState } from "react";
import { Column } from "./Column";
import { Flex } from "./Flex";
import { Button, Input, Typography } from "@mui/material";
import { useAtom } from "jotai";
import { store } from "../store";
import { Checkboxs } from "./Checkbox";
import { toast } from "react-toastify";

const Active = () => {
    const [myTodo, setMyTodo] = useAtom(store.todoAtom);
    const onCompleted = (id: string) => {
        const newTodo = [...myTodo];
        const index = newTodo.findIndex((todo) => todo.id === id);
        newTodo[index] = {
            ...newTodo[index],
            status: newTodo[index].status === "active" ? "completed" : "active",
        };
        setMyTodo(newTodo);
        toast.success("Task is completed");
    };

    const deleteTodo = (id: string) => {
        const newTodo = myTodo.filter((todo) => todo.id !== id);
        setMyTodo(newTodo);
        toast.info("Task is deleted");
    };
    return (
        <Column>
            <>
                {myTodo.length > 0 &&
                    myTodo.map((item, index) => {
                        if (item.status === "active") {
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
                                        <Flex>
                                            <Checkboxs
                                                onActive={() =>
                                                    onCompleted(item.id)
                                                }
                                            />
                                        </Flex>
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

export default Active;
