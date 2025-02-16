<?php

class CourseController {
    public function Add(...$course){
        $title = $course["title"] ?? null;
        $list = $course["list"] ?? null;

        if (!$title || !$list) {
            http_response_code(400);
            echo json_encode([
                "message" => "One or more values are not defined.",
                "status" => 400
            ]);
            exit;
        }

        $config = new Config();
        $courseManager = new Course(BDD::getInstance($config->getConfig()));

        $courseManager->initCourse([
            "title" => $title,
            "list" => $list,
        ]);

        $newCourse = $courseManager->getAllProperties();

        if ($courseManager->add(
            $newCourse["title"],
            $newCourse["list"],
            )) {
            http_response_code(200);
            $response = json_encode([
                "message" => "Adding the shopping list to the database",
                "status" => 200
            ]);
            echo $response;
            exit;
        }

        http_response_code(400);
        $response = json_encode([
            "message" => "Error adding shopping list to database",
            "status" => 400
            ]);
        echo $response;
        exit;
    }

    public function ShowList(){
        $configManager = new Config();
        $courseManager = new Course(BDD::getInstance($configManager->getConfig()));
        $courses = $courseManager->getList();
        if (!$courses) {
        http_response_code(400);
        echo json_encode([
            "message" => "No shopping list found",
            "status" => 400
        ]);
        exit;
        }

        http_response_code(200);
        echo json_encode([
        "message" => "Shopping list.",
        "status" => 200,
        "courses" => $courses
        ]);
        exit;
    }

    public function Show(...$params){
        $id = $params["id"];

        if (!$id) {
        http_response_code(400);
        echo json_encode([
            "message" => "Id parameters invalid.",
            "status" => 400
        ]);
        exit;
        }

        $config = new Config();
        $courseManager = new Course(BDD::getInstance($config->getConfig()));

        $course = $courseManager->getById($id);
        if (!$course) {
        http_response_code(400);
        echo json_encode([
            "message" => "An error has occurred while retrieving the shopping list.",
            "status" => 400
        ]);
        exit;
        }
        
        http_response_code(200);
        echo json_encode([
        "message" => "Shopping list found.",
        "status" => 200,
        "course" => $course
        ]);
        exit;
    }

    public function Update(...$course){
        $id = $course["id"] ?? null;
        $title = $course["title"] ?? null;
        $list = $course["list"] ?? null;
        
        if (!$id|| !$title || !$list
        ) {
        http_response_code(400);
        echo json_encode([
            "message" => "The parameters are invalids.",
            "status" => 400
        ]);
        exit;
        }

        $config = new Config();
        $courseManager = new Course(BDD::getInstance($config->getConfig()));

        if (!$courseManager->update([
        "id" => $id,
        "title" => $title,
        "list" => $list,
        ])) {
        http_response_code(400);
        echo json_encode([
            "message" => "An error has occurred while updating the shopping list..",
            "status" => 400
        ]);
        exit;
        }

        http_response_code(200);
        echo json_encode([
        "message" => "Shopping list update done.",
        "status" => 200
        ]);
        exit;
    }

    public function Delete(...$params){
        $id = $params["id"];

        $config = new Config();
        $courseManager = new Course(BDD::getInstance($config->getConfig()));

        if (!$courseManager->deleteById($id)) {
        http_response_code(400);
        echo json_encode([
            "message" => "Deleting the shopping list failed.",
            "status" => 400
        ]);
        exit;
        }

        http_response_code(200);
        echo json_encode([
        "message" => "Shopping list n°{$id} has been removed.",
        "status" => 200
        ]);
        exit;
    }
}