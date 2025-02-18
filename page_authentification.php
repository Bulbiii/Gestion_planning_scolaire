<?php
include 'db/db_connect.php';
include 'crud/utilisateur.php';

session_start() ;
if(isset($_POST['mail']) && isset($_POST['passwd'])){


    $mail=$_POST['mail'];
    $mdp=$_POST['passwd'];

    // On récupère le user correspondant aux mail/mdp saisis
    $user_temp = select_user_mail_mdp($conn,$mail,$mdp);

    // On récupère ...
	if(isset($user_temp)){

        $role=$user_temp['role'];
        $id_user=$user_temp['id'];

        if($role=="teacher"){ // le teacher
            $user=select_teacher_id_user($conn,$id_user);
        }elseif($role=="student"){ // le student
            $user=select_student_id_user($conn,$id_user);
        }elseif($role=="admin"){ // l'admin
            $user=select_admin_id_user($conn,$id_user);
        }


        $_SESSION["role"]=$role;
        $_SESSION["user"]=$user;

        // redirection
        header("Location: index.php");
    } else {
        // redirection
        header("Location: page_authentification.php?invalide=true");
    }
	
}	


?>
<html>
	<head>
	<meta charset="UTF-8">
	<title>authentification</title>
  	<!--<link rel="stylesheet" href="style.css">-->
	</head>

	<body>
	<div>
		<form  method="POST" action="page_authentification.php">
			<div id='authentification'>
				<center><h2>Connexion</h2></center>
				<?php
        			if(isset($_GET['invalide'])){
          			echo("<p>mail ou mot de passe incorrect</p>");
        			}
        		?>
				<p>Mail</p>	<input class='input_connexion' type="text" name="mail">
				<p>Mot de passe</p>	<input class='input_connexion' type="password" name="passwd"><br>
				<input class='bouton_connexion' type="submit" value="Me connecter">
			</div>
		</form>
	</div>
	</body>
</html>

<?php
include 'db/db_disconnect.php';