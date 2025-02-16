import { useContext, useEffect, useState } from "react";
import { Link } from "react-router";
import DeleteCourse from "~/components/deleteCourse/DeleteCourse";
import { CourseContext } from "~/shared/contexts/CourseContext";
import type { CourseI } from "~/shared/interfaces/Course.interface";

export default function showCourses(){
    let { setCourse } = useContext(CourseContext);

    let [ courses, setCourses ] = useState([]);

    useEffect(() => {
        if (courses.length <= 0) {
            fetchCourses();
        }
    }, [courses]);

    const fetchCourses = async () => {
        await fetch("http://127.0.0.1:5500/course/get/list", {
            method: "GET",
            mode: "cors",
        })
        .then((response) => response.json())
        .then((datas) => {
            if (datas.status !== 200) {
                throw new Error("The status of the request is invalid.");
            }
    
            if (!datas.courses) {
                throw new Error("No shopping lists were returned.");
            }
    
            let coursesList = datas.courses.map((course: CourseI) => {
                console.table(course);
                course = {
                    id: course.id,
                    title: course.title,
                    list: course.list,
                    creation_date: course.creation_date,
                };
                return course;
            });
    
            setCourses(coursesList);
        })
        .catch((err) => console.error(err));
    };

    const updateCourseContext = (course: CourseI) => {setCourse(course)};

    return (
        <section className="main-sections">
            {courses.length > 0 &&
            courses.map((course: CourseI) => (
                <article className="main-articles" key={course.id}>
                    <h2 className="main-articles-title">{course.title}</h2>
                    <p>{course.list}</p>
                    <Link to={`/course/update/${course.id}`} onClick={() => updateCourseContext(course)}>
                        Update shopping list
                    </Link>
                    <DeleteCourse courseId={course.id} />
                </article>
            ))}
        </section>
    )
}