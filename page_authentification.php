<?php
include 'db/db_connect.php';
include 'crud/utilisateur.php';

session_start() ;
if(isset($_POST['mail']) && isset($_POST['passwd'])){


    $mail=$_POST['mail'];
    $mdp=$_POST['passwd'];

    // On récupère le user correspondant aux mail/mdp saisis
	$user = select_user_complet_mail_mdp($conn,$mail,$mdp);

	if(isset($user)){
		
        $_SESSION["role"]=$user['role']; // teacher / student / admin
        $_SESSION["user"]=$user; // toutes les infos de la personne connectée
		$_SESSION['id']=$user['id']; // l'id de la personne

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
  	<link rel="stylesheet" href="vue/style/style.css">
	</head>

	<body>
	<div>
		<form  method="POST" action="page_authentification.php">
			<div id='authentification'>
				<h2>Connexion</h2>
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