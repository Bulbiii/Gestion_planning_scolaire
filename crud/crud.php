<?php
 /*

 --------- RECAP ----------

 Salle :

- select_classroom($conn,$num) :
    Array ( [num] => 2 
            [specificity] => INFO )
- selectSpecificity_classroom($conn, $specificity) -> tableau des classroom d'une specificity donnée
- selectAll_classroom($conn) -> tableau de classroom
- delete_classroom($conn, $num)
- update_classroom($conn, $num, $specificity)
- insert_classroom($conn, $num, $specificity)

Courses :

- select_courses($conn,$id) :
    Array ( [id] => 1 
            [day] => monday 
            [date] => 2025-02-11 
            [recurrent] => 1 
            [h_start] => 08:00:00 
            [h_end] => 10:00:00 
            [class_name] => 3C 
            [subject] => Array ( [id] => 1 
                                 [name] => Math 
                                 [nb_hours] => 00:00:02 
                                 [specificity] => ) 
            [teacher] => Array ( [id] => 1 
                                 [name] => Michel 
                                 [surname] => Jackson ) 
            [classroom] => Array ( [num] => 1 
                                   [specificity] => math ) )
- selectAll_courses($conn) -> tableau de courses
- select_courses_week($conn,$id,$d_start,$d_end) -> tableau des courses d'une classe ou d'un prof entre deux dates données
- insert_courses($conn, $day, $date, $recurrent,$h_start,$h_end,$subject_id,$teacher_id,$class_name,$classroom_num)
- update_courses($conn,$id, $day,$date,$recurrent,$h_start,$h_end,$subject_id,$teacher_id,$class_name,$classroom_num)
- delete_courses($conn, $id)

Constrainte :

- select_constraint($conn,$id) :
    Array ( [id] => 1 
            [day] => Lundi 
            [date] => 2025-02-04 
            [h_start] => 08:00:00 
            [h_end] => 15:00:00 
            [description] => Piscine 
            [recurrent] => 0
            [id_teacher] => 1 )
- selectAll_constraint($conn) -> tableau de toutes les constraint
- selectAll_teacher_constraint($conn,$id_teacher) -> tableau de toutes les contraintes d'un prof
- insert_constraint($conn,$day,$date,$h_start,$h_end,$desc,$recurrent, $id_teacher)
- update_constraint($conn,$id,$day,$date,$h_start,$h_end,$description,$recurrent)
- delete_constraint($conn,$id)

Subject :

- select_subject($conn,$id) :
    Array ( [id] => 2 
            [name] => Info 
            [nb_hours] => 00:01:28 
            [specificity] => INFO )
- selectAll_subject($conn) -> tableau de subject
- update_subject($conn,$id,$name,$nb_hours,$specificity)
- insert_subject($conn,$name,$nb_hours,$specificity)
- delete_constraint($conn,$id)

Classe :

- selectAll_class($conn) :
    Array ( [0] => Array ( [name] => 3C ) 
            [1] => Array ( [name] => 4A ) 
            [2] => Array ( [name] => 5B ) )
- insert_class($conn,$name)
- delete_class($conn,$name)
- update_class($conn,$ancien_name,$nouv_name)

Class_Teacher :

- insert_class_teacher($conn,$teacher_id,$class_name)
- delete_class_teacher($conn,$teacher_id,$class_name)

Teacher_Subject

- insert_teacher_subject($conn,$id_teacher,$id_subject)
- delete_teacher_subject($conn,$id_teacher,$id_subject)


*/

// ---------- SALLE ----------

// sélectionne toutes les salles
function selectAll_classroom($conn){
    $result = mysqli_query($conn,"select * from classroom");
    
    $tab=[] ; 
	while($row=mysqli_fetch_assoc($result)){
		$tab[]=$row ;	
	}
	return $tab;
}

// Sélectionne les salles en fonction de leur spécificité (info,chimie etc.)
function selectSpecificity_classroom($conn, $specificity){
    $result = mysqli_query($conn,"SELECT * from classroom WHERE specificity='$specificity'");
    
    $tab=[] ; 
	while($row=mysqli_fetch_assoc($result)){
		$tab[]=$row ;	
	}
	return $tab;
}

// Sélectionne une salle
function select_classroom($conn,$num){
    $sql="SELECT * FROM classroom WHERE num=$num" ;
	if($ret=mysqli_query($conn, $sql)){
		$ret=mysqli_fetch_assoc($ret);
	}
	return $ret ;
}

// Supprime une salle
function delete_classroom($conn, $num){
	
	$sql="DELETE FROM classroom WHERE num=$num" ;
	$res=mysqli_query($conn,$sql);
    return $res;
}

// Modifie une salle
function update_classroom($conn, $num, $specificity){
	$sql="UPDATE classroom SET specificity='$specificity' WHERE num=$num";
	$res=mysqli_query($conn,$sql);
	return $res;
}

// Crée une salle
function insert_classroom($conn, $num, $specificity){
	
	$sql="INSERT INTO classroom(num,specificity) value($num,'$specificity')";
	$res=mysqli_query($conn,$sql);
    return $res;
}

// ---------- Cours ---------- En cours

// Sélectionne un cours
function select_courses($conn,$id){
    // récupère le cours
    $res_courses=mysqli_query($conn,"SELECT id,`day`,`date`,recurrent,h_start,h_end,class_name FROM courses WHERE id=$id");
    $courses=mysqli_fetch_assoc($res_courses);
    // récupère subject
    $subject=select_subject_courses($conn,$id);
    $courses['subject']=$subject;
    // récupère teacher
    $teacher=select_teacher_courses($conn,$id);
    $courses['teacher']=$teacher;
    // récupère classroom
    $classroom=select_classroom_courses($conn,$id);
    $courses["classroom"]=$classroom;

    return $courses;
}

// Sélectionne le subject d'un cours
function select_subject_courses($conn,$id){
    $res_subject=mysqli_query($conn,"SELECT s.id,s.name,s.nb_hours,s.specificity FROM `subject` s JOIN courses c ON s.id=c.subject_id WHERE c.id=$id");
    $subject=mysqli_fetch_assoc($res_subject);
    return $subject;
}

// Sélectionne le teacher d'un cours
function select_teacher_courses($conn,$id){
    $res_teacher=mysqli_query($conn,"SELECT t.id,t.name,t.surname FROM teacher t JOIN courses c ON t.id=c.teacher_id WHERE c.id=$id");
    $teacher=mysqli_fetch_assoc($res_teacher);
    return $teacher;
}

// Sélectionne la classroom d'un cours
function select_classroom_courses($conn,$id){
    $res_classroom=mysqli_query($conn,"SELECT cl.num,cl.specificity FROM classroom cl JOIN courses co ON cl.num=co.classroom_num WHERE co.id=$id");
    $classroom=mysqli_fetch_assoc($res_classroom);
    return $classroom;
}

// Selectionne tous les courses
function selectAll_courses($conn){
    $sql="SELECT id,`day`,`date`,recurrent,h_start,h_end,class_name FROM courses";
    $res=mysqli_query($conn,$sql);

    $courses=[] ; 
	while($cours=mysqli_fetch_assoc($res)){
        $id_cours=$cours['id']; // On récupère l'id du cours courant
        // On récupère le subject
        $subject=select_subject_courses($conn,$id_cours); 
        $cours["subject"]=$subject; 
		// On récupère le teacher
        $teacher=select_teacher_courses($conn,$id_cours);
        $cours['teacher']=$teacher;
        // On récupère la salle
        $classroom=select_classroom_courses($conn,$id_cours);
        $cours['classroom']=$classroom;
        
        $courses[]=$cours ; // On range le teacher courant dans le tableau
	}
	return $courses;
}

// récupère les cours de la semaine d'une classse ou d'un prof
function select_courses_week($conn,$id,$d_start,$d_end){
    $res=[];
    if(is_int($id)){ // si id est un entier, c'est un prof
        $res=select_courses_week_teacher($conn,$id,$d_start,$d_end);
    }elseif(is_string($id)){ // si id est un string, c'est une classe
        $res=select_courses_week_class($conn,$id,$d_start,$d_end);
    }
    return $res;
}

// récupère les cours de la semain d'une classe
function select_courses_week_class($conn,$num_class,$d_start,$d_end){
    // on vérifie que d_start et d_end sont dans le bon format et on change si besoin
    if(!($d_start instanceof DateTime)) {
        $d_start = new DateTime($d_start);
    }
    if(!($d_end instanceof DateTime)) {
        $d_end = new DateTime($d_end);
    }

    $sql="SELECT id,`day`,`date`,recurrent,h_start,h_end,class_name FROM courses";
    $res=mysqli_query($conn,$sql);

    $courses=[] ; 
	while($cours=mysqli_fetch_assoc($res)){
        $id_cours=$cours['id']; // On récupère l'id du cours courant
        // On récupère le subject
        $subject=select_subject_courses($conn,$id_cours); 
        $cours["subject"]=$subject; 
		// On récupère le teacher
        $teacher=select_teacher_courses($conn,$id_cours);
        $cours['teacher']=$teacher;
        // On récupère la salle
        $classroom=select_classroom_courses($conn,$id_cours);
        $cours['classroom']=$classroom;


        // on vérifie que le num de la classe et la date correspondent aux paramètres (si le cours est récurrent, on ne regarde pas la date)
        if($cours['class_name']==$num_class && ($cours['recurrent']==1 || (new DateTime($cours['date'])<=$d_end && new DateTime($cours['date'])>=$d_start))){
            $courses[]=$cours ; // On range le teacher courant dans le tableau
        }
	}
	return $courses;
}

// récupère les cours de la semain d'un prof
function select_courses_week_teacher($conn,$id_teacher,$d_start,$d_end){
    // on vérifie que d_start et d_end sont dans le bon format et on change si besoin
    if(!($d_start instanceof DateTime)) {
        $d_start = new DateTime($d_start);
    }
    if(!($d_end instanceof DateTime)) {
        $d_end = new DateTime($d_end);
    }

    $sql="SELECT id,`day`,`date`,recurrent,h_start,h_end,class_name FROM courses";
    $res=mysqli_query($conn,$sql);

    $courses=[] ;
    // On parcourt tous les cours
	while($cours=mysqli_fetch_assoc($res)){
        $id_cours=$cours['id']; // On récupère l'id du cours courant
        // On récupère le subject
        $subject=select_subject_courses($conn,$id_cours); 
        $cours["subject"]=$subject; 
		// On récupère le teacher
        $teacher=select_teacher_courses($conn,$id_cours);
        $cours['teacher']=$teacher;
        // On récupère la salle
        $classroom=select_classroom_courses($conn,$id_cours);
        $cours['classroom']=$classroom;


        // on vérifie que l'id_teacher et la date correspondent aux paramètres (si le cours est récurrent, on ne regarde pas la date)
        if($cours['teacher']['id']==$id_teacher && ($cours['recurrent']==1 || ( new DateTime($cours['date'])>=$d_start && new DateTime($cours['date'])<=$d_end ) ) ){
            $courses[]=$cours ; // On range le teacher courant dans le tableau
        }
	}
	return $courses;
}

// Crée un cours
function insert_courses($conn, $day, $date, $recurrent,$h_start,$h_end,$subject_id,$teacher_id,$class_name,$classroom_num){
	$sql="INSERT INTO courses(`day`,`date`,recurrent,h_start,h_end,subject_id,teacher_id,class_name,classroom_num) value('$day','$date',$recurrent,'$h_start','$h_end',$subject_id,$teacher_id,'$class_name',$classroom_num)";
	$res=mysqli_query($conn,$sql);
    return $res;
}

// Modifie un cours
function update_courses($conn,$id, $day,$date,$recurrent,$h_start,$h_end,$subject_id,$teacher_id,$class_name,$classroom_num){
    $sql="UPDATE `courses` SET `day`='$day',`date`='$date',recurrent=$recurrent,`h_start`='$h_start',`h_end`='$h_end',subject_id=$subject_id,teacher_id=$teacher_id,class_name='$class_name',classroom_num=$classroom_num WHERE id=$id";
    $res=mysqli_query($conn,$sql);
    return $res;
}

// Supprime un cours
function delete_courses($conn, $id){
	
	$sql="DELETE FROM courses WHERE id=$id" ;
	$res=mysqli_query($conn,$sql);
    return $res;
}

// ---------- CONTRAINTE ----------

// Selectionne une contrainte
function select_constraint($conn,$id){
    $sql="SELECT * FROM `constraint` WHERE id=$id";
    if($res=mysqli_query($conn,$sql)){
        $res=mysqli_fetch_assoc($res);
    }
    return $res;
}

// Selectionne toutes les contraintes
function selectAll_constraint($conn){
    $sql="SELECT * FROM `constraint`";
    $res=mysqli_query($conn,$sql);

    $tab=[] ; 
	while($row=mysqli_fetch_assoc($res)){
		$tab[]=$row ;	
	}
	return $tab;
}

// Selectionne toutes les contraintes d'un prof
function selectAll_teacher_constraint($conn,$id_teacher){
    $sql="SELECT * FROM `constraint` WHERE id_teacher=$id_teacher";
    $res=mysqli_query($conn,$sql);

    $tab=[] ; 
	while($row=mysqli_fetch_assoc($res)){
		$tab[]=$row ;	
	}
	return $tab;
}

// Crée une contrainte
function insert_constraint($conn,$day,$date_start, $date_end,$h_start,$h_end,$desc,$recurrent, $id_teacher){
    $sql="INSERT INTO `constraint`(`day`, `date_start`, `date_end`,h_start,h_end, `description`,recurrent, id_teacher) value('$day','$date_start', '$date_end','$h_start','$h_end','$desc','$recurrent',$id_teacher)";
    $res=mysqli_query($conn,$sql);
    return $res;
}

// Modifie une contrainte
function update_constraint($conn,$id,$day,$date_start, $date_end,$h_start,$h_end,$description,$recurrent){
    $sql="UPDATE `constraint` SET `description`='$description',`day`='$day',`date_start`='$date_start', `date_end`='$date_end',h_start='$h_start',h_end='$h_end', recurrent=$recurrent WHERE id=$id";
    $res=mysqli_query($conn,$sql);
    return $res;
}

// Supprime une contrainte
function delete_constraint($conn,$id){
    $sql="DELETE FROM `constraint` WHERE id=$id";
    $res=mysqli_query($conn,$sql);
    return $res;
}


// ---------- Subject ----------

// Crée une matière
function insert_subject($conn,$name,$nb_hours,$specificity){
    $sql="INSERT INTO `subject`(`name`,nb_hours,specificity) value('$name',$nb_hours,'$specificity')";
    $res=mysqli_query($conn,$sql);
    return $res;
}

// Supprime une matière
function delete_subject($conn,$id){
    $sql="DELETE FROM `subject` WHERE id=$id";
    $res=mysqli_query($conn,$sql);
    return $res;
}

// Modifie une matière
function update_subject($conn,$id,$name,$nb_hours,$specificity){
    $sql="UPDATE `subject` SET `name`='$name',nb_hours=$nb_hours,specificity='$specificity' WHERE id=$id";
    $res=mysqli_query($conn,$sql);
    return $res;
}

// Sélectionne toutes les matières
function selectAll_subject($conn){
    $result = mysqli_query($conn,"SELECT * FROM `subject`");
    
    $tab=[] ; 
	while($row=mysqli_fetch_assoc($result)){
		$tab[]=$row ;	
	}
	return $tab;
}

// Sélectionne une matière
function select_subject($conn,$id){
    $sql="SELECT * FROM `subject` WHERE id=$id" ;
	if($ret=mysqli_query($conn, $sql)){
		$ret=mysqli_fetch_assoc($ret);
	}
	return $ret ;
}



// ---------- class ----------

// Crée une class
function insert_class($conn,$name){
    $sql="INSERT INTO class(`name`) value('$name')";
    $res=mysqli_query($conn,$sql);
    return $res;
}

// Supprime une class
function delete_class($conn,$name){
    $sql="DELETE FROM class WHERE `name`='$name'";
    $res=mysqli_query($conn,$sql);
    return $res;
}

// Modifie une class
function update_class($conn,$ancien_name,$nouv_name){
    $res=mysqli_query($conn,"UPDATE class SET `name`='$nouv_name' WHERE `name`='$ancien_name'");
    return $res;
}



// sélectionne toutes les class
function selectAll_class($conn){
    $result = mysqli_query($conn,"SELECT * FROM class");
    
    $tab=[] ; 
	while($row=mysqli_fetch_assoc($result)){
		$tab[]=$row ;	
	}
	return $tab;
}


// ---------- class_teacher ----------

// Crée une class_teacher
function insert_class_teacher($conn,$teacher_id,$class_name){
    $sql="INSERT INTO class_teacher(teacher_id,class_name) value($teacher_id,'$class_name')";
    $res=mysqli_query($conn,$sql);
    return $res;
}

// Supprime une class_teacher
function delete_class_teacher($conn,$teacher_id,$class_name){
    $sql="DELETE FROM class_teacher WHERE teacher_id=$teacher_id AND class_name='$class_name'";
    $res=mysqli_query($conn,$sql);
    return $res;
}


// ---------- teacher_subject ----------

// Crée une teacher_subject
function insert_teacher_subject($conn,$id_teacher,$id_subject){
    $sql="INSERT INTO teacher_subject(id_teacher,id_subject) value($id_teacher,$id_subject)";
    $res=mysqli_query($conn,$sql);
    return $res;
}

// Supprime une teacher_subject
function delete_teacher_subject($conn,$id_teacher,$id_subject){
    $sql="DELETE FROM teacher_subject WHERE id_teacher=$id_teacher AND id_subject=$id_subject";
    $res=mysqli_query($conn,$sql);
    return $res;
}