<?php
    
class Course{
    private int $id;
    private string $title;
    private string $list;
    private string $creation_date;
    private $bdd;

    public function __construct($bdd = null){
        if(!is_null($bdd)){
        $this->setBdd($bdd);
        }
    }

    public function getId(): int{
        return $this->id;
    }

    public function setId(int $id){
        $this->id = $id;
    }

    public function getTitle(): string{
        return $this->title;
    }

    public function setTitle(string $title){
        $this->title = $title;
    }

    public function getList(): string{
        return $this->list;
    }

    public function setList(string $list){
        $this->list = $list;
    }

    public function getCreationDate(): string{
        return $this->creation_date;
    }
    
    public function setCreationDate(string $creation_date){
        $this->creation_date = $creation_date;
    }

    public function initCourse(array $course){
        $title = $course["title"];
        $list = $course["list"];
    }

    public function getAllProperties(){
        return [
        "title" => $this->getTitle(),
        "list" => $this->getList(),
        ];
    }

    public function add(string $title, string $list){
        $req = $this->bdd->prepare("INSERT INTO courses(title, list) VALUES(:title, :list)");
        $req->bindValue(":title", $title, PDO::PARAM_STR);
        $req->bindValue(":list", $list, PDO::PARAM_STR);
        if(!$req->execute()){
        return false;
        }
        $req->closeCursor();
        return true;
    }

    /*
    public function getList(){
        $req = $this->bdd->prepare("SELECT * FROM courses ORDER BY creation_date DESC");
        $req->execute();
        $courses = $req->fetchAll(PDO::FETCH_OBJ);
        if(!$courses){
            return null;
        }
        $req->closeCursor();
        return $courses;
    }
    */

    public function getById(int $id){
        $req = $this->bdd->prepare("SELECT * FROM courses WHERE id=:id");
        $req->bindValue(":id", $id, PDO::PARAM_INT);
        $req->execute();
        $course = $req->fetch(PDO::FETCH_OBJ);
        if(!$course){
        return null;
        }
        return $course;
    }

    public function update(array $course){
        $req = $this->bdd->prepare("UPDATE courses SET 
        title=:title,
        list=:list,
        WHERE id=:id
        ");
        $req->bindValue(":id", $course["id"], PDO::PARAM_INT);
        $req->bindValue(":title", $course["title"], PDO::PARAM_STR);
        $req->bindValue(":list", $course["list"], PDO::PARAM_STR);
        if(!$req->execute()){
        return false;
        }
        return true;
    }

    public function deleteById(int $id){
        return $this->bdd->exec("DELETE FROM courses WHERE id={$id}");
    }

    private function setBdd($bdd){
        $this->bdd = $bdd;
    }
}