import { atom } from "jotai";

export type TodosType = {
    id: string;
    name: string;
    status: "active" | "completed" | "all";
};

const getLocalStorage = (): TodosType[] => {
    const todo = localStorage.getItem("todo");
    if (todo) {
        return JSON.parse(todo);
    }
    return [];
};

const todoAtom = atom<TodosType[]>(getLocalStorage());

export const store = {
    todoAtom,
};
