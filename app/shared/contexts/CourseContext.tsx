import { createContext, useState } from "react";
import type { CourseI } from "../interfaces/Course.interface";

export const CourseContext = createContext<any>();

export default function CourseProvider({ children }: any) {
    let [course, setCourse] = useState<CourseI>({
        id: undefined,
        title: undefined,
        list: undefined,
        creation_date: undefined,
    });

    let [title, setTitle] = useState("");

    let [list, setList] = useState("");

    let [creation_date, setCreation_date] = useState("");

    return (
        <CourseContext.Provider
            value={{
                course,
                setCourse,
                title,
                setTitle,
                list,
                setList,
                creation_date,
            }}
        >
            {children}
        </CourseContext.Provider>
    )
}