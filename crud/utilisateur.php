<?php
/*
--------- RECAP ----------

User :

- select_user_mail_mdp($conn,$mail,$mdp) -> selectionne un user à partir de mail et mdp :
    Array ( [id] => 2 
            [role] => teacher 
            [mail] => mich.jack@mail.fr 
            [password] => azerty )
- select_user($conn,$id) -> renvoie pareil à partir de l'id

Student :

- select_student($conn,$id) :
    Array ( [id] => 7 
            [name] => Jean 
            [surname] => Dupont 
            [class_name] => 3C 
            [user_id] => 10 
            [role] => student 
            [mail] => jeandu93@mail.fr 
            [password] => password )
- selectAll_student($conn) -> tableau de student
- select_student_id_user($conn,$id_user) -> récupère un student à partir de son id_user
- insert_student($conn,$name,$surname,$classe_name,$mail,$password) 
- update_student($conn,$id,$name,$surname,$class_name,$mail,$password)
- delete_student($conn,$id)

Teacher :

- select_teacher($conn,$id) :
    Array ( [id] => 1 
            [name] => Michel 
            [surname] => Jackson 
            [id_user] => 2 
            [role] => teacher 
            [mail] => mich.jack@mail.fr 
            [password] => azerty 
            [subject] => Array ( [0] => Array ( [id] => 1 
                                                [name] => Math 
                                                [nb_hours] => 00:00:02 
                                                [specificity] => ) 
                                 [1] => Array ( [id] => 2 
                                                [name] => Info 
                                                [nb_hours] => 00:01:28 
                                                [specificity] => INFO ) ) 
            [class] => Array ( [0] => Array ( [name] => 3C ) 
                               [1] => Array ( [name] => 4A ) ) 
            [constraint] => Array ( [0] => Array ( [id] => 1
                                                   [day] => Lundi 
                                                   [date] => 2025-02-04 
                                                   [h_start] => 08:00:00 
                                                   [h_end] => 15:00:00 
                                                   [recurrent]  => 1
                                                   [description] => Piscine ) 
                                    [1] => Array ( [id] => 3
                                                   [day] => Mercredi 
                                                   [date] => 2025-01-12 
                                                   [h_start] => 08:00:00 
                                                   [h_end] => 10:00:00 
                                                   [recurrent] => 0
                                                   [description] => Grasse matiné ) ) ) 
- selectAll_teacher($conn) -> tableau de prof
- select_teacher_id_user($conn,$id_user) -> sélectionne un teacher à partir de son id user
- insert_teacher($conn,$name,$surname,$mail,$password)
- update_teacher($conn,$id,$name,$surname,$mail,$password)
- delete_teacher($conn,$id)

Admin :

- select_admin($conn,$id) :
    Array ( [id] => 1 
            [name] => Ludovic 
            [surname] => Herve 
            [user_id] => 16 
            [role] => admin 
            [mail] => ludo.herve@mail.fr 
            [password] => aaaaa )
- selectAll_admin($conn) -> tableau d'admin
- select_admin_id_user($conn,$id_user) -> sélectionne un admin à partir de son id user
- insert_admin($conn,$name,$surname,$mail,$password)
- update_admin($conn,$id,$name,$surname,$mail,$password)
- delete_admin($conn,$id)

Autre :

- emplois_temps_accessible($conn,$id,$role) -> renvoie un tableau constitué des id_teacher ou class_name correspondants aux edt accessibles par $id
    Array ( [0] => 1 
            [1] => 3C 
            [2] => 4A )
            

*/


// ---------- UTILISATEUR ----------

// Crée un utilisateur
function insert_user($conn,$mail,$mdp,$role){
    $sql="INSERT INTO user(mail,`password`,`role`) value ('$mail','$mdp','$role')";
    $res=mysqli_query($conn,$sql);
    return $res;
}

// Selectionne un utilisateur en fonction de son mail et mdp
function select_user_mail_mdp($conn,$mail,$mdp){
    $sql="SELECT * FROM `user` WHERE mail='$mail' AND `password`='$mdp'" ;
	if($ret=mysqli_query($conn, $sql)){
		$ret=mysqli_fetch_assoc($ret);
	}
	return $ret ;
}

// Selectionne un utilisateur en fonction de son id
function select_user($conn,$id){
    $sql="SELECT * FROM `user` WHERE id=$id" ;
	if($ret=mysqli_query($conn, $sql)){
		$ret=mysqli_fetch_assoc($ret);
	}
	return $ret ;
}

// Selectionne un utilisateur complet en fonction de son mail et mdp
function select_user_complet_mail_mdp($conn,$mail,$mdp){
    // on récupère le user
    $user_tmp = select_user_mail_mdp($conn,$mail,$mdp);

    // on récupère le role et l'id_user
    $role=$user_tmp['role'];
    $id_user=$user_tmp['id'];

    // on récupère la version complète du user
    if($role=="teacher"){ // ... le teacher
        $user=select_teacher_id_user($conn,$id_user);
    }elseif($role=="student"){ // ... le student
        $user=select_student_id_user($conn,$id_user);
    }elseif($role=="admin"){ // ... l'admin
        $user=select_admin_id_user($conn,$id_user);
    }

    return $user;
}



// ---------- student ----------

// Crée un étudient + son profil utilisateur
function insert_student($conn,$name,$surname,$classe_name,$mail,$password){
    $res_user = insert_user($conn,$mail,$password,"student"); // On crée l'utilisateur
    if($res_user){ // Si le user est crée :
        $user = select_user_mail_mdp($conn,$mail,$password); // on récupère user
        $id_user = $user['id']; // on récupère l'id du user
        
        // On crée l'étudiant
        $sql="INSERT INTO student(`name`,surname,user_id,class_name) value ('$name','$surname',$id_user,'$classe_name')";
        $res=mysqli_query($conn,$sql);
        $res_user = $res;
    }
    return $res_user;
}

// Modifie un student
function update_student($conn,$id,$name,$surname,$class_name,$mail,$password){
    $student=select_student($conn,$id);
    $id_user=$student["user_id"];

    // On modifie `student`
    $res_student=mysqli_query($conn,"UPDATE student SET `name`='$name',surname='$surname',class_name='$class_name' WHERE id=$id");

    // On modifie `user`
    $res_user=mysqli_query($conn,"UPDATE `user` SET `password`='$password',mail='$mail' WHERE id=$id_user");

    return $res_student && $res_user;
}

// Sélectionne un student
function select_student($conn,$id){
    $sql="SELECT s.id,s.name,s.surname,s.class_name,s.user_id,u.role,u.mail,u.password FROM student s JOIN user u ON u.id=s.user_id WHERE s.id=$id" ;
	if($ret=mysqli_query($conn, $sql)){
		$ret=mysqli_fetch_assoc($ret);
	}
	return $ret ;
}

// Sélectionne un student
function select_student_id_user($conn,$id_user){
    $sql="SELECT s.id,s.name,s.surname,s.class_name,s.user_id,u.role,u.mail,u.password FROM student s JOIN user u ON u.id=s.user_id WHERE s.user_id=$id_user" ;
	if($ret=mysqli_query($conn, $sql)){
		$ret=mysqli_fetch_assoc($ret);
	}
	return $ret ;
}

// Selectionne tous les students
function selectAll_student($conn){
    $sql="SELECT s.id,s.name,s.surname,s.class_name,s.user_id,u.role,u.mail,u.password FROM student s JOIN user u ON u.id=s.user_id";
    $res=mysqli_query($conn,$sql);

    $tab=[] ; 
	while($row=mysqli_fetch_assoc($res)){
		$tab[]=$row ;	
	}
	return $tab;
}

// Supprime un student
function delete_student($conn,$id){
    $student=select_student($conn,$id);
    $id_user=$student['user_id'];

    $res_student=mysqli_query($conn,"DELETE FROM `student` WHERE id=$id");
    if($res_student){
        $res_user=mysqli_query($conn,"DELETE FROM `user` WHERE id=$id_user");
    }

    return $res_student && $res_user;
}

// ---------- teacher ----------

// Crée un prof + son profil utilisateur
function insert_teacher($conn,$name,$surname,$mail,$password){
    $res_user = insert_user($conn,$mail,$password,"teacher"); // On crée l'utilisateur
    if($res_user){ // Si le user est crée :
        $user = select_user_mail_mdp($conn,$mail,$password); // on récupère user
        $id_user = $user['id']; // on récupère l'id du user
       
        // On crée le prof
        $sql="INSERT INTO teacher(`name`,surname,id_user) value ('$name','$surname',$id_user)";
        $res=mysqli_query($conn,$sql);
        $res_user = $res;
    }
    return $res_user;
}

// Modifie un teacher
function update_teacher($conn,$id,$name,$surname,$mail,$password){
    $teacher=select_teacher($conn,$id);
    $id_user=$teacher["id_user"];

    // On modifie `teacher`
    $res_teacher=mysqli_query($conn,"UPDATE teacher SET `name`='$name',surname='$surname' WHERE id=$id");
    if($res_teacher){ 
        // On modifie `user`
        $res_user=mysqli_query($conn,"UPDATE `user` SET `password`='$password',mail='$mail' WHERE id=$id_user");
    }

    return $res_teacher && $res_user;
}

// Sélectionne un prof
function select_teacher($conn,$id){
    // On récupère les données du prof + user
    $sql_teacher="SELECT t.id,t.name,t.surname,t.id_user,u.role,u.mail,u.password FROM teacher t JOIN user u ON u.id=t.id_user WHERE t.id=$id" ;
	if($teacher=mysqli_query($conn, $sql_teacher)){
		$teacher=mysqli_fetch_assoc($teacher);
	}

    // On récupère les subject du prof
    $subjects=selectAll_subject_teacher($conn,$id);
    $teacher["subject"]=$subjects;

    // On récupère les classes du prof
    $class=selectAll_class_teacher($conn,$id);
    $teacher["class"]=$class;

    // On récupère les contraintes du prof
    $constraints=selectAll_constraint_teacher($conn,$id);
    $teacher["constraint"]=$constraints;

	return $teacher ;
}

// Sélectionne un prof à partir de son id user
function select_teacher_id_user($conn,$id_user){
    // On récupère les données du prof + user
    $sql_teacher="SELECT t.id,t.name,t.surname,t.id_user,u.role,u.mail,u.password FROM teacher t JOIN user u ON u.id=t.id_user WHERE t.id_user=$id_user" ;
	if($teacher=mysqli_query($conn, $sql_teacher)){
		$teacher=mysqli_fetch_assoc($teacher);
	}

    // On récupère l'id du prof
    $id=$teacher['id'];

    // On récupère les subject du prof
    $subjects=selectAll_subject_teacher($conn,$id);
    $teacher["subject"]=$subjects;

    // On récupère les classes du prof
    $class=selectAll_class_teacher($conn,$id);
    $teacher["class"]=$class;

    // On récupère les contraintes du prof
    $constraints=selectAll_constraint_teacher($conn,$id);
    $teacher["constraint"]=$constraints;

	return $teacher ;
}

// Sélectionne toutes les matières d'un prof en fonction de l'id de ce dernier
function selectAll_subject_teacher($conn,$id){
    $result = mysqli_query($conn,"SELECT s.id,s.name,s.nb_hours,s.specificity FROM `subject` s JOIN teacher_subject ts ON s.id=ts.id_subject WHERE ts.id_teacher=$id");
    
    $tab=[] ; 
	while($row=mysqli_fetch_assoc($result)){
		$tab[]=$row ;	
	}
	return $tab;
}

// Sélectionne toutes les classes d'un prof en fonction de l'id de ce dernier
function selectAll_class_teacher($conn,$id){
    $result = mysqli_query($conn,"SELECT c.name FROM `class` c JOIN class_teacher ct ON c.name=ct.class_name WHERE ct.teacher_id=$id");
    
    $tab=[] ; 
	while($row=mysqli_fetch_assoc($result)){
		$tab[]=$row ;	
	}
	return $tab;
}

// Selectionne toutes les contraintes d'un prof
function selectAll_constraint_teacher($conn,$id_teacher){
    $sql="SELECT `id`,`day`,`date_start`,`date_end`,h_start,h_end,recurrent,`description` FROM `constraint` WHERE id_teacher=$id_teacher";
    $res=mysqli_query($conn,$sql);

    $tab=[] ; 
	while($row=mysqli_fetch_assoc($res)){
		$tab[]=$row ;	
	}
	return $tab;
}

// Selectionne tous les teacher
function selectAll_teacher($conn){
    $sql="SELECT t.id,t.name,t.surname,t.id_user,u.role,u.mail,u.password FROM teacher t JOIN user u ON u.id=t.id_user";
    $res=mysqli_query($conn,$sql);

    $teachers=[] ; 
	while($teacher=mysqli_fetch_assoc($res)){
        $id_teacher=$teacher['id']; // On récupère l'id du teacher courant
        // Subject
        $subjects=selectAll_subject_teacher($conn,$id_teacher); // On récupère ses subjects
        $teacher["subject"]=$subjects; // On ajoute les subjects
		// Class
        $class=selectAll_class_teacher($conn,$id_teacher); // On récupère ses class
        $teacher["class"]=$class; // On ajoute les class
        // Constraint
        $constraints=selectAll_constraint_teacher($conn,$id_teacher); // On récupère les contraintes
        $teacher["constraint"]=$constraints; // On ajoute les contraintes
        
        $teachers[]=$teacher ; // On range le teacher courant dans le tableau
	}
	return $teachers;
}

// Supprime un prof
function delete_teacher($conn,$id_teacher){
    $teacher=select_teacher($conn,$id_teacher); // On récupère le user correspondant au teacher
    $id_user=$teacher['id_user']; // On récupère l'id user

    $res_subject=mysqli_query($conn,"DELETE FROM teacher_subject WHERE id_teacher=$id_teacher");// Supprime teacher_subject
    $res_class=mysqli_query($conn,"DELETE FROM class_teacher WHERE teacher_id=$id_teacher"); // Supprime class_teacher
    $res_teacher=mysqli_query($conn,"DELETE FROM  `teacher` WHERE id=$id_teacher"); // Supprime teacher
    $res_user=mysqli_query($conn,"DELETE FROM `user` WHERE id=$id_user"); // Supprime utilisateur

    return $res_teacher && $res_user && $res_subject && $res_class;
}


// ---------- admin ----------

// Crée un admin + son profil utilisateur
function insert_admin($conn,$name,$surname,$mail,$password){
    $res_user = insert_user($conn,$mail,$password,"admin"); // On crée l'utilisateur
    if($res_user){ // Si le user est crée :
        $user = select_user_mail_mdp($conn,$mail,$password); // on récupère user
        $id_user = $user['id']; // on récupère l'id du user
       
        // On crée l'admin
        $sql="INSERT INTO `admin`(`name`,surname,user_id) value ('$name','$surname',$id_user)";
        $res=mysqli_query($conn,$sql);
        $res_user = $res;
    }
    return $res_user;
}

// Modifie un admin
function update_admin($conn,$id,$name,$surname,$mail,$password){
    $admin=select_admin($conn,$id);
    $id_user=$admin["user_id"];

    // On modifie `admin`
    $res_admin=mysqli_query($conn,"UPDATE `admin` SET `name`='$name',surname='$surname' WHERE id=$id");

    // On modifie `user`
    $res_user=mysqli_query($conn,"UPDATE `user` SET `password`='$password',mail='$mail' WHERE id=$id_user");

    return $res_admin && $res_user;
}

// Sélectionne un admin
function select_admin($conn,$id){
    $sql="SELECT a.id,a.name,a.surname,a.user_id,u.role,u.mail,u.password FROM `admin` a JOIN user u ON u.id=a.user_id WHERE a.id=$id" ;
	if($ret=mysqli_query($conn, $sql)){
		$ret=mysqli_fetch_assoc($ret);
	}
	return $ret ;
}

// Sélectionne un admin à partir de son id user
function select_admin_id_user($conn,$id_user){
    $sql="SELECT a.id,a.name,a.surname,a.user_id,u.role,u.mail,u.password FROM `admin` a JOIN user u ON u.id=a.user_id WHERE a.user_id=$id_user" ;
	if($ret=mysqli_query($conn, $sql)){
		$ret=mysqli_fetch_assoc($ret);
	}
	return $ret ;
}

// Selectionne tous les students
function selectAll_admin($conn){
    $sql="SELECT a.id,a.name,a.surname,a.user_id,u.role,u.mail,u.password FROM `admin` a JOIN user u ON u.id=a.user_id";
    $res=mysqli_query($conn,$sql);

    $tab=[] ; 
	while($row=mysqli_fetch_assoc($res)){
		$tab[]=$row ;	
	}
	return $tab;
}

// Supprime un admin
function delete_admin($conn,$id){
    $admin=select_admin($conn,$id);
    $id_user=$admin['user_id'];

    $res_admin=mysqli_query($conn,"DELETE FROM `admin` WHERE id=$id");
    if($res_admin){
        $res_user=mysqli_query($conn,"DELETE FROM `user` WHERE id=$id_user");
    }

    return $res_admin && $res_user;
}


// Autre

function emplois_temps_accessible($conn,$id,$role){

    $res=[];
    // Pour le prof, on prend toutes ses classes et son id
    if($role==="teacher"){
        $teacher=select_teacher($conn,$id);
        $res=[$id]; // id
        foreach ($teacher["class"] as $class) { // class
            array_push($res,$class["name"]);
        }
    }
    // Pour l'étudiant, on ne prend que sa classe
    elseif($role==="student") {
        $student=select_student($conn,$id);
        $res=[$student['class_name']];
    }
    // Pour l'admin, on prend toutes les classes et tous les profs
    elseif($role==="admin") {
        $teachers=selectAll_teacher($conn);
        $classes=selectAll_class($conn);
        foreach ($classes as $class) { // class
            array_push($res,$class["name"]);
        }
        foreach ($teachers as $teacher) { // teacher
            array_push($res,$teacher["id"]);
        }
    }

    return $res;
}