import { useContext, type FormEvent } from "react";
import { useNavigate } from "react-router";
import { CourseContext } from "~/shared/contexts/CourseContext";
import type { CourseI } from "~/shared/interfaces/Course.interface";

export default function AddCourse(){
    let {course, setCourse, title, list} = useContext(CourseContext);

    let navigate = useNavigate();

    const submitForm = async (e: FormEvent) => {
        e.preventDefault();
        if (!course.title || !course.list ) {
            throw new Error("Some statistics are invalid.");
        }
    
        await fetch("http://127.0.0.1:5500/course/add", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(course),
        })
        .then((response) => {
            return response.json();
        })
        .then((datas) => {
            if (datas.status !== 200) {
                throw new Error("The status of the request is invalid.");
            }
            navigate("/");
        })
        .catch((err) => console.error(`Error: ${err}`));
    };

    return (
        <form action="#" method="POST" onSubmit={submitForm}>
            <label htmlFor="title">Title</label>
            <input
                type="text"
                name="title"
                onChange={(e) => {
                    let newTitle = e.target.value ?? null;
                    setCourse((course: CourseI) => {
                        course.title = newTitle;
                        return course;
                    });
                }}
                required
            />
            <label htmlFor="list">List</label>
            <input
                type="text"
                name="list"
                onChange={(e) => {
                    let newList = e.target.value ?? null;
                    setCourse((course: CourseI) => {
                        course.list = newList;
                        return course;
                    });
                }}
                required
            />
            <button type="submit">Create shopping list</button>
        </form>
    )
}