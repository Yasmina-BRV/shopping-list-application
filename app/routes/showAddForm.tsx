import { Link } from "react-router";
import AddCourse from "~/components/addCourse/AddCourse";

export default function ShowAddForm(){
    return (
        <>
            <Link to="/">Back to homepage</Link>
            <AddCourse />
        </>
    )
}