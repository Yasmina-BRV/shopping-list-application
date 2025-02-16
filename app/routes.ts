import { type RouteConfig, index, layout, prefix, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),

    ...prefix("course", [
        layout("layouts/courseLayout.tsx", [
            route("add", "routes/showAddForm.tsx"),
            route("list", "routes/showCourses.tsx"),
            route("update/:id", "routes/showCourseCard.tsx")
        ]),        
    ])
] satisfies RouteConfig;
