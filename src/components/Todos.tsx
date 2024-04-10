/* eslint-disable react/no-children-prop */

import { useAtom } from "jotai";
import { store } from "../store";
import Active from "./Active";
import All from "./All";
import { Column } from "./Column";
import Completed from "./Completed";
import TabCustom from "./Tabs";
import { useEffect } from "react";

const Todos = () => {
    const [myTodo] = useAtom(store.todoAtom);

    useEffect(() => {
        localStorage.setItem("todo", JSON.stringify(myTodo));
    }, [myTodo]);

    return (
        <Column width={"500px"} alignItems={"center"}>
            <TabCustom
                label={["All", "Active", "Completed"]}
                children={[
                    <All key={"All"} />,
                    <Active key={"active"}></Active>,
                    <Completed key={"completed"}></Completed>,
                ]}
            />
        </Column>
    );
};

export default Todos;
