import { Link } from "react-router";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "New React Router App" },
        { name: "description", content: "Welcome to my shopping list application!" },
    ];
}

export default function Home() {
    return <>
        <Link to="/course/add">Add a shopping list</Link>
        <Link to="/course/list">See shopping lists</Link>
    </>;
}
