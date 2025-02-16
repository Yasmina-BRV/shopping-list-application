import { useNavigate } from "react-router";
import type { Route } from "../+types/root";
import { useContext } from "react";
import { CourseContext } from "~/shared/contexts/CourseContext";
import type { CourseI } from "~/shared/interfaces/Course.interface";

export async function showCourseCard({ params, }: Route.ComponentProps) {
    const { id } = params;

    let navigate = useNavigate();

    let {title, list, course, setCourse, creation_date} = useContext(CourseContext);

    const submitUpdateForm = async (e: any) => {
        e.preventDefault();
        if ( !course.pseudo || !course.title ) {
            throw new Error(
                "Some statistics are invalid."
            );
        }
    
        await fetch("http://localhost:5500/course/update", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            mode: "cors",
            body: JSON.stringify(course)
        })
        .then(response => response.json())
        .then(datas => {
            if(datas.status !== 200){
                throw new Error("The status of the request is invalid.");
            }
    
            navigate("/course/list");
        })
        .catch(err=>console.error(err));

        
    };
    
    return (
        <form action="#" method="POST" onSubmit={submitUpdateForm}>
            <label htmlFor="title">T</label>
            <input
                type="text"
                name="title"
                defaultValue={course.title}
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
                defaultValue={course.list}
                onChange={(e) => {
                    let newList = e.target.value ?? null;
                    setCourse((course: CourseI) => {
                    course.title = newList;
                    return course;
                    });
                }}
                required
            />
            <input 
                type="hidden"
                value={id}
                name="id"
            />
            <button type="submit">Update shopping list</button>
        </form>
        );
}