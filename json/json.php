<?php

error_reporting(E_ALL);
ini_set('display_errors', '1');


include "../db/db_connect.php";
include "../crud/crud.php";
include "../crud/utilisateur.php";

// boolean pour indiquer si les données ont été récupérées ou non
$recupere=false;

// SELECT avec la méthode GET

if(isset($_GET['table']) && isset($_GET['type'])){
    
    $table=$_GET['table'];
    $type=$_GET['type'];

    // récupère les salles
    if($table=='classroom'){ 
        if($type == "all"){ //Toutes les salles : all
            $donnees = selectAll_classroom($conn);
            $recupere=true;
        }elseif($type=="byId" && isset($_GET['id'])){ //1 salle selon son id : byId + id
            $id=$_GET['id'];
            $donnees = select_classroom($conn,$id);
            $recupere=true;
        }elseif($type=="bySpec" && isset($_GET['spec'])){//Salles selon leur specificitées : bySpec + spc
            $spec=$_GET['spec'];
            $donnees = selectSpecificity_classroom($conn,$spec);
            $recupere=true;
        }
    } 
    // récupère les cours
    elseif($table=="courses"){
        if($type=="all"){ //Tous les cours : all
            $donnees=selectAll_courses($conn);
            $recupere=true;
        }elseif($type=="byId" && isset($_GET['id'])){ //1 cours selon son id : byId + id
            $id=$_GET['id'];
            $donnees=select_courses($conn,$id);
            $recupere=true;
        }elseif($type=="week" && isset($_GET['id']) && isset($_GET['start'])  && isset($_GET['end']) ){ // Toues les cours entre d_start et d_end selon id (int-> teacher / string->class)
            $id=$_GET['id'];                                                                                                    // week + choix + id + d_start + d_end
            // on transforme id en int si c'est possible (pour les cours d'un teacher, sinon c'est d'une class)
            if (filter_var($id, FILTER_VALIDATE_INT) !== false) {
                $id = (int) $id;
            }                                                                            
            $d_start=$_GET['start'];
            $d_end=$_GET['end'];
            $donnees=select_courses_week($conn,$id,$d_start,$d_end);
            $recupere=true;
        }
    }
    // récupère les constraint
    elseif($table=="constraint"){
        if($type=="all"){ // Toutes les contraintes : all
            $donnees=selectAll_constraint($conn);
            $recupere=true;
        }elseif($type=="byId" && isset($_GET['id'])){ // 1 contrainte selon id : byId + id
            $id=$_GET['id'];
            $donnees=select_constraint($conn,$id);
            $recupere=true;
        }elseif($type=="byTeacher" && isset($_GET['id'])){ // contraintes selon l'id d'un teacher : byTeacher + id
            $id_teacher=$_GET['id'];
            $donnees=selectAll_teacher_constraint($conn,$id_teacher);
            $recupere=true;
        }elseif($type=="insert" && isset($_GET['day'], $_GET['date_start'], $_GET['date_end'], $_GET['h_start'], $_GET['h_end'], $_GET['desc'], $_GET['recurrent'], $_GET['id_teacher'])){
            $day=$_GET['day'];
            $date_start=$_GET['date_start'];
            $date_end=$_GET['date_end'];
            $h_start=$_GET['h_start'];
            $h_end=$_GET['h_end'];
            $desc=$_GET['desc'];

            $recurrent;
            if ($_GET['recurrent'] == "true"){
                $recurrent=1;
            } else {
                $recurrent=0;
            }
            
            $id_teacher=$_GET['id_teacher'];
            $donnees=insert_constraint($conn,$day,$date_start, $date_end,$h_start,$h_end,$desc,$recurrent, $id_teacher);
            $recupere=$donnees;
        }elseif($type=="update" && isset($_GET['id'], $_GET['day'], $_GET['date_start'], $_GET['date_end'], $_GET['h_start'], $_GET['h_end'], $_GET['desc'], $_GET['recurrent'], $_GET['id_teacher'])){
            $id=$_GET['id'];
            $day=$_GET['day'];
            $date_start=$_GET['date_start'];
            $date_end=$_GET['date_end'];
            $h_start=$_GET['h_start'];
            $h_end=$_GET['h_end'];
            $desc=$_GET['desc'];

            $recurrent;
            if ($_GET['recurrent'] == "true"){
                $recurrent=1;
            } else {
                $recurrent=0;
            }
            
            $id_teacher=$_GET['id_teacher'];
            $donnees=update_constraint($conn,$id,$day,$date_start, $date_end,$h_start,$h_end,$desc,$recurrent, $id_teacher);
            $recupere=$donnees;
        }elseif($type="delete" && isset($_GET['id'])){
            $id=$_GET['id'];
            $donnees=delete_constraint($conn,$id);
            $recupere=$donnees;
        }
    }
    // récupère les subject
    elseif($table=="subject"){
        if($type=="all"){ // toutes les subjects : all
            $donnees=selectAll_subject($conn);
            $recupere=true;
        }elseif($type=="byId" && isset($_GET['id'])){ // 1 subject selon id : byId + id 
            $id=$_GET['id'];
            $donnees=select_subject($conn,$id);
            $recupere=true;
        }
    }
    // récupère les classes
    elseif($table=="class"){
        $donnees=selectAll_class($conn);
        $recupere=true;
    }
    // récupère les user
    elseif($table=="user"){
        if($type=="byId" && isset($_GET['id'])){ // user selon id : byId + id
            $id=$_GET['id'];
            $donnees=select_user($conn,$id);
            $recupere=true;  
        }elseif($type="byMail" && isset($_GET['mail']) && isset($_GET['mdp'])){ // user selon mail/mdp : byMail + mail + mdp
            $mail=$_GET['mail'];
            $mdp=$_GET['mdp'];
            $donnees=select_user_mail_mdp($conn,$mail,$mdp);
            $recupere=true;
        }
    }
    // récupère student
    elseif($table=="student"){
        if($type=="all"){ // tous les student : all
            $donnees=selectAll_student($conn);
            $recupere=true;
        }elseif($type=="byId" && isset($_GET['id'])){ // student selon id : byId + id
            $id=$_GET['id'];
            $donnees=select_student($conn,$id);
            $recupere=true;
        }
    }
    // récupère teacher
    elseif($table=="teacher"){
        if($type=="all"){ // tous les teacher : all
            $donnees=selectAll_teacher($conn);
            $recupere=true;
        }elseif($type=="byId" && isset($_GET['id'])){ // teacher selon id : byId + id
            $id=$_GET['id'];
            $donnees=select_teacher($conn,$id);
            $recupere=true;
        }
    }
    // récupère admin
    elseif($table=="admin"){
        if($type=="all"){ // tous les admin : all
            $donnees=selectAll_admin($conn);
            $recupere=true;
        }elseif($type=="byId" && isset($_GET['id'])){ // admin selon id : byId + id
            $id=$_GET['id'];
            $donnees=select_admin($conn,$id);
            $recupere=true;
        }
    }
    // récupère les id (teacher ou class) correspondant aux emplois du temps accessible par l'utilisateur
    elseif($table=="edt" && isset($_GET['id']) && isset($_GET['type']) ){ // liste edt selon id et role (type) : id + type
            $id=$_GET['id'];
            $role=$_GET['type'];
            $donnees=emplois_temps_accessible($conn,$id,$role);
            $recupere=true;
    }
}



header('Content-Type: application/json');

// Vérifier la méthode HTTP de la requête
$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'PUT': // pour les UPDATE

        // Récupérer les données envoyées via PUT
        $input = json_decode(file_get_contents('php://input'), true);

        if (isset($input['type'])) {
            $type = $input['type'];  // Type : classroom / courses / subject / class / student

            $modif=false;
            // maj en fonction du type
            switch ($type) {
                // PUT CLASSROOM
                case 'classroom': 
                    if (isset($input['num']) && isset($input['specificity'])) {
                        $num = $input['num'];
                        $specificity = $input['specificity'];
                        $modif = update_classroom($conn, $num, $specificity);
                    }
                    break;
                // PUT COURSES
                case 'courses': 
                    if (isset($input['id']) && isset($input['day']) && isset($input['date'])  && isset($input['recurrent'])  && isset($input['h_start'])  && isset($input['h_end'])  && isset($input['subject_id'])  && isset($input['teacher_id'])  && isset($input['class_name'])  && isset($input['classroom_num']) ) {
                        $id = $input['id'];
                        $day = $input['day'];
                        $date = $input['date'];
                        $recurrent = $input['recurrent'];
                        $h_start = $input['h_start'];
                        $h_end = $input['h_end'];
                        $subject_id = $input['subject_id'];
                        $teacher_id = $input['teacher_id'];
                        $class_name = $input['class_name'];
                        $classroom_num = $input['classroom_num'];
                        $modif = update_courses($conn,$id, $day,$date,$recurrent,$h_start,$h_end,$subject_id,$teacher_id,$class_name,$classroom_num);
                    }
                    break;
                // PUT SUBJECT
                case 'subject' :
                    if(isset($input['id']) && isset($input['name']) && isset($input['nb_hours']) && isset($input['specificity']) ){
                        $id=$input['id'];
                        $name=$input['name'];
                        $nb_hours=$input['nb_hours'];
                        $specificity=$input['specificity'];
                        $modif = update_subject($conn,$id,$name,$nb_hours,$specificity);
                    }
                    break;
                // PUT CLASS
                case 'class':
                    if(isset($input['old_name']) && isset($input['new_name'])){
                        $old_name=$input['old_name'];
                        $new_name=$input['new_name'];
                        $modif = update_class($conn,$old_name,$new_name);
                    }
                    break;
                // PUT STUDENT
                case 'student':
                    if( isset($input['id']) && isset($input['name']) && isset($input['surname']) && isset($input['class_name']) && isset($input['mail']) && isset($input['password']) ){
                        $id=$input['id'];
                        $name=$input['name'];
                        $surname=$input['surname'];
                        $class_name=$input['class_name'];
                        $mail=$input['mail'];
                        $password=$input['password'];
                        $modif = update_student($conn,$id,$name,$surname,$class_name,$mail,$password);
                    }
            }
        }
        break;
    case 'POST': // INSERT
        // Récupérer les données envoyées via POST pour les insertions
        $input = json_decode(file_get_contents('php://input'), true);
    
        if (isset($input['type'])) {
            $type = $input['type'];  // Type : classroom / courses / subject / class / class_teacher / teacher_subject / student
    
            // insert en fonction du type
            switch ($type) {
                // POST CLASSROOM
                case 'classroom':
                    if (isset($input['num']) && isset($input['specificity'])) {
                        $num = $input['num'];
                        $specificity = $input['specificity'];
                        $modif =insert_classroom($conn, $num, $specificity);
                    }
                    break;
                // POST COURSES
                case 'courses':
                    if(isset($input['day']) && isset($input['date']) && isset($input['recurrent']) && isset($input['h_start']) && isset($input['h_end']) &&  isset($input['subject_id']) && isset($input['teacher_id']) && isset($input['class_name']) && isset($input['classroom_num']) ){
                        $day=$input['day'];
                        $date=$input['date'];
                        $recurrent=$input['recurrent'];
                        $h_start=$input['h_start'];
                        $h_end=$input['h_end'];
                        $subject_id=$input['subject_id'];
                        $teacher_id=$input['teacher_id'];
                        $class_name=$input['class_name'];
                        $classroom_num=$input['classroom_num'];
                        $modif = insert_courses($conn,$day,$date,$recurrent,$h_start,$h_end,$subject_id,$teacher_id,$class_name,$classroom_num);
                    }
                    break;
                // POST SUBJECT
                case 'subject':
                    if(isset($input['name']) && isset($input['nb_hours']) && isset($input['specificity']) ){
                        $name=$input['name'];
                        $nb_hours=$input['nb_hours'];
                        $specificity=$input['specificity'];
                        $modif = insert_subject($conn,$name,$nb_hours,$specificity);
                    }
                    break;
                // POST CLASS
                case 'class':
                    if(isset($input['name'])){
                        $name=$input['name'];
                        $modif = insert_class($conn,$name);
                    }
                    break;
                // POST CLASS_TEACHER
                case 'class_teacher':
                    if(isset($input['teacher_id']) && isset($input['class_name'])){
                        $teacher_id = $input['teacher_id'];
                        $class_name = $input['class_name'];
                        $modif = insert_class_teacher($conn,$teacher_id,$class_name);
                    }
                    break;
                // POST TEACHER_SUBJECT
                case 'teacher_subject':
                    if(isset($input['id_teacher']) && isset($input['id_subject'])){
                        $id_teacher=$input['id_teacher'];
                        $id_subject=$input['id_subject'];
                        $modif = insert_teacher_subject($conn,$id_teacher,$id_subject);
                    }
                    break;
                // POST STUDENT
                case 'student':
                    if( isset($input['name']) && isset($input['surname']) && isset($input['class_name']) && isset($input['mail']) && isset($input['password']) ){
                        $name=$input['name'];
                        $surname=$input['surname'];
                        $class_name=$input['class_name'];
                        $mail=$input['mail'];
                        $password=$input['password'];
                        $modif = insert_student($conn,$name,$surname,$class_name,$mail,$password);
                    }
                    break;
            }
        }
        break;
    case 'DELETE':
        // Récupérer les données envoyées via DELETE pour les suppressions
        $input = json_decode(file_get_contents('php://input'), true);
    
        if (isset($input['type'])) {
            $type = $input['type'];  // Type : classroom / courses / subject / class / class_teacher / teacher_subject / student
    
            // Gérer la suppression en fonction du type
            switch ($type) {
                // DELETE CLASSROOM
                case 'classroom':
                    if (isset($input['num'])) {
                        $num = $input['num'];
                        $modif = delete_classroom($conn, $num);
                    } 
                    break;
                // DELETE COURSES
                case 'courses':
                    if(isset($input['id'])){
                        $id=$input['id'];
                        $modif = delete_courses($conn,$id);
                    }
                    break;
                // DELETE SUBJECT
                case 'subject':
                    if(isset($input['id'])){
                        $id=$input['id'];
                        $modif = delete_subject($conn,$id);
                    }
                    break;
                // DELETE CLASS
                case 'class':
                    if(isset($input['name'])){
                        $name=$input['name'];
                        $modif = delete_class($conn,$name);
                    }
                    break;
                // DELETE CLASS_TEACHER
                case 'class_teacher':
                    if(isset($input['teacher_id']) && isset($input['class_name'])){
                        $teacher_id = $input['teacher_id'];
                        $class_name = $input['class_name'];
                        $modif = delete_class_teacher($conn,$teacher_id,$class_name);
                    }
                // DELETE TEACHER_SUBJECT
                case 'teacher_subject':
                    if(isset($input['id_teacher']) && isset($input['id_subject'])){
                        $id_teacher=$input['id_teacher'];
                        $id_subject=$input['id_subject'];
                        $modif = delete_teacher_subject($conn,$id_teacher,$id_subject);
                    }
                    break;
                // DELETE STUDENT
                case 'student':
                    if(isset($input['id'])){
                        $id=$input['id'];
                        $modif = delete_student($conn,$id);
                    }
                    break;
            }
        }

    }

    if($modif){
        $recupere=true;
        $donnees="modification ok";
    }




if($recupere){
    // Transforme le tableau associatif PHP en chaine JSON bien formé
    $donnees_str = json_encode($donnees);

    // Notifie la navigateur que le type de donnees est JSON
    header('Content-Type: application/json; charset=utf-8');

    // Ecrit les donnees au format JSON
    echo"${donnees_str}";
}else{
   $donnees_str = json_encode("erreur");//("erreur");
   header('Content-Type: application/json; charset=utf-8');
   echo"${donnees_str}";
} 


?>