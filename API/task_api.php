<?php

require_once "../crud1/conexion.php";
#FINAL DE CONECCION A DB

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('content-type: application/json; charset=utf-8');
#FINAL DE HEADERS DE CORS Y JSON FORMAT


    switch ($_SERVER['REQUEST_METHOD']) {
        case 'GET':
             if (isset($_GET['id'])) {
                $id = $_GET['id'];
                $sql = "SELECT * FROM todolist WHERE id = $id";
                $res = $conexion->query($sql);
                print_r(json_encode($res->fetch_all(MYSQLI_ASSOC)));
            }
            else{
            $_GET = json_decode(file_get_contents("php://input"), true);
            $sql = "SELECT * FROM todolist";
            $res = $conexion->query($sql);
          print_r(json_encode($res->fetch_all(MYSQLI_ASSOC)));
            } 
            break;

        case 'POST':
           $_POST = json_decode(file_get_contents("php://input"),true);

           if (isset($_POST['title']) and isset($_POST['description'])) {
               $title = $_POST['title'];
               $description = $_POST['description'];
               $sql = "INSERT INTO todolist(title, description) VALUES('$title', '$description')";

               if($conexion->query($sql) === true){
                echo "Datos insertado correctament";
               }else{
                   die("Error al inssertar datos: ". $conexion->error);
               }
           }
            break;
        case 'PUT':
            $_GET = json_decode(file_get_contents("php://input"),true);
            if (isset($_GET['id'])) {
                if (isset($_GET['title']) or isset($_GET['description'])) {
                    $id = $_GET['id']; 
                    $title = $_GET['title'];
                    $description = $_GET['description'];
                    $sql= " UPDATE todolist SET title = '$title', description='$description' WHERE id = $id";
                    if ($conexion->query($sql)===true) {
                        echo "Task updated succesfully";
                    }else{
                        die("No hemos podido actualizar sus datos: ". $conexion->error);
                    }
                }
            }
          # print_r($_GET);
            break;
        case 'DELETE':
        $_GET = json_decode(file_get_contents("php://input"), true);
        if (isset($_GET['id'])) {
            $id = $_GET['id'];
            $sql = "DELETE FROM todolist WHERE id = $id";
            if($conexion->query($sql)===true){
                echo "Tarea Eliminada correctamente";
            }else{
                die("Error al eliminar tarea: ". $conexion->error);
            }
        }
            break;
    
    }

?>