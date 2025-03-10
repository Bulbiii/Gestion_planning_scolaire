<?php

error_reporting(E_ALL);
ini_set('display_errors', '1');


include "../db/db_connect.php";
include "../crud/crud.php";
include "../crud/utilisateur.php";

// boolean pour indiquer si les données ont été récupérées ou non
$recupere=false;

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



if($recupere){
    /* Transforme le tableau associatif PHP en chaine JSON bien formé*/
    $donnees_str = json_encode($donnees);

    /* Notifie la navigateur que le type de donnees est JSON*/
    header('Content-Type: application/json; charset=utf-8');

    /* Ecrit les donnees au format JSON*/ 
    echo"${donnees_str}";
}else{
   $donnees_str = json_encode("erreur");//("erreur");
   header('Content-Type: application/json; charset=utf-8');
   echo"${donnees_str}";
} 



    ?>