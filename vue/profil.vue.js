function profil_vue(){
    let body = document.querySelector("body");
    body.innerHTML = "";

    // Bouton accueil
    button_accueil(body);

    let profil_section = create_element("section",body,"porfilSection");

    // récupère la session de l'utilisateur connecté
    get_session().then(session => {
        //console.log(session['user']);
        user=session['user'];
        role=session['role'];

        // prénom nom utilisateur
       let nomtitre = create_element("h1",profil_section,"",user['name']+" "+user['surname']);

        // contient l'affichage des infos personnelles du user
        let divInfoProfil = create_element("div",profil_section,"divInfoProfil");
        
        // affichage des informations
        create_info_profil(divInfoProfil,user);

        if(role=='teacher'){
            create_info_teacher(profil_section,user);
        }else if(role=='student'){
            create_info_student(profil_section,user);
        }
    })
}


// boutton accueil
function button_accueil(parent){
    let header = create_element("header", parent, "ProfilHeader");

    let boutonAccueil = create_element("button", header, "homeButtonProfil","Accueil");
    boutonAccueil.addEventListener("click", () => create_main_vue()); // A décommenter

    // Deconnexion
    let boutonDeconnexion = create_element("button",header,"","Se déconnecter");
    /*boutonDeconnexion.addEventListener("click", function() {
        window.location.href = "http://51.68.91.213/info3/page_authentification.php";
      });*/
      boutonDeconnexion.addEventListener("click", () => deconnexion());
}

async function deconnexion() {
    try {
        const response = await fetch('json/deconnexion.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        //const result = await response.json();
        const textResponse = await response.text(); // Récupère la réponse en texte brut
        console.log("Réponse brute : ", textResponse);  // Affiche la réponse dans la console

        const result = JSON.parse(textResponse); // Convertir le texte en JSON

        if (result.success) {
            // Rediriger vers la page de connexion après la deconnexion
            window.location.href = "http://51.68.91.213/info3/page_authentification.php";
        }
    } catch (error) {
        console.error('Erreur de déconnexion:', error);
    }
}

function create_info_profil(parent, user){
    parent.innerHTML="";

    // mail
    create_element("p",parent,"","Adresse mail : "+user['mail']);
    // mot de passe
    create_element("p",parent,"","Mot de passe : "+user['password']);

    // Bouton pour modifier mail et mdp
    let boutonModifier = create_element("button",parent,"","Modifier");
    boutonModifier.addEventListener("click", () => create_form_info_profil(divInfoProfil, user));

}

function create_form_info_profil(parent,user){
    parent.innerHTML="";
    let role = user['role'];

    // mail
    let mailLabel = create_element("label",parent,"","Adresse mail : ");
    let mailInput = create_element("input", parent, "mailInput");
    mailInput.name = "mailInput";
    mailInput.value = user['mail'];

    // mot de passe
    let passwordLabel = create_element("label",parent,"","Mot de passe : ");
    let passwordInput = create_element("input", parent, "passwordInput");
    passwordInput.name = "passwordInput";
    passwordInput.value = user["password"];

    // Bouton pour modifier mail et mdp
    let boutonModifier = create_element("button",parent,"","Modifier");
    boutonModifier.addEventListener("click", () => update_user(user));
    
}

function create_info_teacher(parent, user){

    subjects = user['subject'];
    classes = user['class'];

    let divInfoTeacher = create_element("div",parent,"divInfoTeacher");

    // Affichage matière
    create_info_element(divInfoTeacher,subjects,"Matiere");

    // Affichage classes
    create_info_element(divInfoTeacher,classes,"Classe");

}

function create_info_element(parent,elements,nomElement){
    if(elements.length<=1){
        create_element("h2",parent,"",nomElement);
    }else{
        create_element("h2",parent,"",nomElement+"s");
    }

    create_liste(parent,elements);
}

function create_liste(parent,elements){
    let liste = create_element("ul",parent,"");

    elements.forEach(element => {
        create_element("li",liste,"",element['name']);
    });
}

function create_info_student(parent,user){

    // Affichage classe
    let divClass = create_element("div",parent,"");
    create_element("h2",divClass,"","Ma classe : ");
    create_element("p",divClass,"",user['class_name']);

    // Affichage cours
}

// ----------------------------------
// ------ RÉCUPÉRATION DONNEES ------
// ----------------------------------


// Modifie le user dans la base de donnée
async function update_user(user) {

    role = user['role'];
    let new_user = {};

    if(role=='student'){
        new_user = { // contenu du nouveau student
            type : 'student',
            name : user['name'],
            surname : user["surname"],
            mail : document.querySelector("#mailInput").value,
            password : document.querySelector("#passwordInput").value,
            id : user["id"],
            class_name : user['class_name']
        }
    }else if(role=='teacher'){
        new_user = { // contenu du nouveau teacher
            type : 'teacher',
            name : user['name'],
            surname : user["surname"],
            mail : document.querySelector("#mailInput").value,
            password : document.querySelector("#passwordInput").value,
            id : user["id"]
        }
    }else if(role=='admin'){
        new_user = { // contenu du nouveau teacher
            type : 'admin',
            name : user['name'],
            surname : user["surname"],
            mail : document.querySelector("#mailInput").value,
            password : document.querySelector("#passwordInput").value,
            id : user["id"]
        }
    }

    
    try {
        // Modifier le user
        const res = await fetch('json/json.php', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',  // JSON dans le body
            },
            body: JSON.stringify(new_user)   // Convertir l'objet en JSON
        });


        // On met à jour la session puis on rafraichit la page
       update_session(new_user).then(result => {
        profil_vue();
    });

    } catch (error) {
        console.error('Erreur:', error);
    }
}

async function update_session(new_teacher) {

    try {
        const response = await fetch('json/update_session.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(new_teacher),
        });

        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Erreur de mise à jour:', error);
        return null;
    }
}