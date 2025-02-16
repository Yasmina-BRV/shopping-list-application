import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export default function DeleteCourse({...props}: any){
    let navigate = useNavigate();

    let [id, setId] = useState("");

    useEffect(() => {
        if(!id){
        const {courseId} = props;
        setId(courseId);
        }
    }, [id]);

    const submitDeleteForm = async (e: any) => {
        e.preventDefault();
        await fetch("http://127.0.0.1:5500/course/delete", {
            method: "DELETE",
            headers: {
            "Content-Type": "application/json"
        },
            body: JSON.stringify({
                id: id
            })
        })
        .then(response => response.json())
        .then(datas => {
            if(datas.status !== 200){
                throw new Error("The status of the request is invalid.");
            }
            navigate("/");
        })
        .catch(err => console.error(err));
    }

    return(
        <form
            method="POST"
            onSubmit={submitDeleteForm}
        >
            <input type="hidden" value={id} name="id" />
            <button type="submit">
                Delete shopping list
            </button>
        </form>
        );
}