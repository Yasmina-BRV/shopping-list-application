import { Outlet } from "react-router";
import CourseProvider from "~/shared/contexts/CourseContext";

export default function CourseLayout(){
    return (
        <CourseProvider children={<Outlet />} />
    )
    
}