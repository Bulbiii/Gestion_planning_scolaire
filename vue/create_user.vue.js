function create_user_vue(){
    let body = document.querySelector("body");
    body.innerHTML = "";

    // Bouton accueil
    bouton_accueil(body);

    
    // Titre
    let titreCreate = create_element("h1",body,"titreCreate","Ajouter un étudiant");

    // Création des boutons
    let divButton = create_element("div",body,"divButton");
    let boutonCreerStudent = create_element("button",divButton,"createStudentButton","Ajouter un étudiant");
    let boutonCreerTeacher = create_element("button",divButton,"createTeacherButton","Ajouter un professeur");
    let boutonCreerAdmin = create_element("button",divButton,"createAdminButton","Ajouter un administrateur");

    // Création section
    let inputSection = create_element("section", body, "createInputSection");
    creation_form_student(inputSection);

    // Action des boutons
    boutonCreerStudent.addEventListener("click", () => creation_form_student(inputSection));
    boutonCreerStudent.addEventListener("click", () => titreCreate.innerHTML = "Ajouter un étudiant");
    boutonCreerTeacher.addEventListener("click", () => creation_form_teacher(inputSection));
    boutonCreerTeacher.addEventListener("click", () => titreCreate.innerHTML = "Ajouter un professeur");
    boutonCreerAdmin.addEventListener("click", () => creation_form_admin(inputSection));
    boutonCreerAdmin.addEventListener("click", () => titreCreate.innerHTML = "Ajouter un administrateur");
}

// boutton accueil
function bouton_accueil(parent){
    let header = create_element("header", parent, "CreateHeader");

    let boutonAccueil = create_element("button", header, "homeButtonCreate","Accueil");
    boutonAccueil.style.zIndex = "10"; 
    boutonAccueil.addEventListener("click", () => create_main_vue() );
}

// Crée le formulaire pour les student
function creation_form_student(container,action='add',user=null){
    container.innerHTML = "";

    // contient le form
    let parent = create_element("div",container,"divStudent");

    // input pour le nom
    let nomLabel = create_element("label",parent, "...", "Nom : ");
    let nomInput = create_element("input", parent, "nomStudentInput");
    nomInput.name = "nomStudentInput";

    // input pour le prénom
    let prenomLabel = create_element("label",parent, "...", "Prenom : ");
    let prenomInput = create_element("input", parent, "prenomStudentInput");
    prenomInput.name = "prenomStudentInput";

    // input pour le mail
    let mailLabel = create_element("label",parent, "...", "Mail : ");
    let mailInput = create_element("input", parent, "mailStudentInput");
    mailInput.name = "mailStudentInput";

    // input pour le mdp
    let mdpLabel = create_element("label",parent, "...", "Mot de passe : ");
    let mdpInput = create_element("input", parent, "mdpStudentInput");
    mdpInput.name = "mdpStudentInput";

    // select pour les classes disponibles
    let classLabel = create_element("label",parent, "...", "Classe : ");
    let classSelect = create_element("select", parent, "classeStudentSelect");
    get_classes().then(classes => { // On récupère les classes puis on crée les options
        classes.forEach(className => {
            let option = create_element("option", classSelect, "option_" + className['name'], className['name']);
            option.value = className['name'];
        });

        if (action !== 'add') {
            classSelect.value = user['class_name']; // on choisit la valeur à afficher si l'action n'est pas add (put)
        }
    });

    // Bouton + affichage info pour la modification
    if(action=='add'){// Bouton ajouter
        let boutonAjouter = create_element("button",parent,"buttonCreateStudent","Ajouter");
        boutonAjouter.addEventListener("click", () => add_student());
    }else{ // Buton modifier
        nomInput.value = user['surname'];
        prenomInput.value = user['name'];
        mailInput.value = user['mail'];
        mdpInput.value = user['password'];
        let boutonModifier = create_element("button",parent,"buttonPutStudent","Modifier");
        boutonModifier.addEventListener("click", () => modify_student(user['id']));
    }

    // Liste des étudients
    create_student_list(parent);
}


// Crée le formulaire pour les admin
function creation_form_admin(container,action='add',user=null){
    container.innerHTML = "";

    // contient le form
    let parent = create_element("div",container,"divAdmin");

    // input pour le nom
    let nomLabel = create_element("label",parent, "...", "Nom : ");
    let nomInput = create_element("input", parent, "nomAdminInput");
    nomInput.name = "nomAdminInput";

    // input pour le prénom
    let prenomLabel = create_element("label",parent, "...", "Prenom : ");
    let prenomInput = create_element("input", parent, "prenomAdminInput");
    prenomInput.name = "prenomAdminInput";

    // input pour le mail
    let mailLabel = create_element("label",parent, "...", "Mail : ");
    let mailInput = create_element("input", parent, "mailAdminInput");
    mailInput.name = "mailAdminInput";

    // input pour le mdp
    let mdpLabel = create_element("label",parent, "...", "Mot de passe : ");
    let mdpInput = create_element("input", parent, "mdpAdminInput");
    mdpInput.name = "mdpAdminInput";

    if(action=='add'){ // si l'action est add, on met le bouton en mode créer
        // Bouton ajouter
        let boutonAjouter = create_element("button",parent,"buttonCreateAdmin","Ajouter");
        boutonAjouter.addEventListener("click", () => add_admin());
    }else{ // sinon, bouton modifier + input avec les infos de l'admin
        nomInput.value = user['surname'];
        prenomInput.value = user['name'];
        mailInput.value = user['mail'];
        mdpInput.value = user['password'];
        let boutonModifier = create_element("button",parent,"buttonPutAdmin","Modifier");
        boutonModifier.addEventListener("click", () => modify_admin(user['id']));
    }

    create_admin_list(parent);

}

// Crée le formulaire pour les teacher
function creation_form_teacher(container,action='add',user=null){
    container.innerHTML = "";

    // contient le form
    let parent = create_element("div",container,"divTeacher");

    // input pour le nom
    let nomLabel = create_element("label",parent, "...", "Nom : ");
    let nomInput = create_element("input", parent, "nomTeacherInput");
    nomInput.name = "nomteacherInput";

    // input pour le prénom
    let prenomLabel = create_element("label",parent, "...", "Prenom : ");
    let prenomInput = create_element("input", parent, "prenomTeacherInput");
    prenomInput.name = "prenomTeacherInput";

    // input pour le mail
    let mailLabel = create_element("label",parent, "...", "Mail : ");
    let mailInput = create_element("input", parent, "mailTeacherInput");
    mailInput.name = "mailTeacherInput";

    // input pour le mdp
    let mdpLabel = create_element("label",parent, "...", "Mot de passe : ");
    let mdpInput = create_element("input", parent, "mdpTeacherInput");
    mdpInput.name = "mdpTeacherInput";

    // checkbox pour les classes disponibles
    let classLabel = create_element("label",parent, "...", "Classes : ");
    
    get_classes().then(classes => {
        classes.forEach(classe => {
            let className = classe['name'];

            let classCheckbox = create_element("input",parent,className+"_checkbox");
            classCheckbox.type = "checkbox";
            classCheckbox.name = "teacher_classe_checkbox";
            classCheckbox.value = classe['name'];

            let classLabel = create_element("label",parent,"",className);
            classLabel.for = className+"_checkbox";
        });

        return get_subject();
    }).then(subjects => {

        // checkbox pour les matières disponibles
        let subjectsLabel = create_element("label",parent, "...", "Matières : ");

        subjects.forEach(subject => {
            // récupèration des données du subject
            let subjectName = subject['name'];
            let subjectId = subject['id'];

            // création de la chackbox
            let subjectCheckbox = create_element("input",parent,subjectName+"_checkbox");
            subjectCheckbox.type = "checkbox";
            subjectCheckbox.name = "teacher_subject_checkbox";
            subjectCheckbox.value =  subjectId;

            // création du label
            let subjectLabel = create_element("label",parent,'',subjectName);
            subjectLabel.for = subjectName+"_checkbox";
        });

        if(action=='add'){// Bouton ajouter
        let boutonAjouter = create_element("button",parent,"buttonCreateTeacher","Ajouter");
        boutonAjouter.addEventListener("click", () => add_teacher());
        }else{ // Pour la modification
            nomInput.value = user['surname'];
            prenomInput.value = user['name'];
            mailInput.value = user['mail'];
            mdpInput.value = user['password'];

            let classes_teacher = user['class'];
            // parcourt de toutes les classes du teacher pour cocher leur checkbox
            classes_teacher.forEach(class_teacher => {
                document.querySelector("#"+CSS.escape(class_teacher['name']+"_checkbox")).checked = true;
            })
            
            let subjects_teacher = user['subject'];
            // parcourt de toutes les matières du teacher pour cocher leur checkbox
            subjects_teacher.forEach(subject_teacher => {
                document.querySelector("#"+CSS.escape(subject_teacher['name']+"_checkbox")).checked = true;
            })
    
            // Création du bouton
            let boutonModifier = create_element("button",parent,"buttonPutTeacher","Modifier");
            boutonModifier.addEventListener("click", () => modify_teacher(user['id']));
        }

        // affiche la liste des profs
        create_teacher_list(parent);
    });
}

// --------------------------------------
// ------ RÉCUPÉRATION INFORMATION ------
// --------------------------------------

// récupère les classes
async function get_classes() {
    try {
        const response = await axios.get("/info3/json/json.php", {
            params: { // on récupère toutes les classes
                table: "class",
                type: "all",
            }
        });
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la requête Axios :", error);
        return []; // renvoie tableau vide si erreur
    }
}

// récupère les subject
async function get_subject() {
    try {
        const response = await axios.get("/info3/json/json.php", {
            params: { // on récupère toutes les matières
                table: "subject",
                type: "all",
            }
        });
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la requête Axios des subjects :", error);
        return []; // renvoie tableau vide si erreur
    }
}

// récupère un teacher avec son mail et son mdp
async function get_teacher_mail_mdp(mail_teacher,mdp_teacher) {
    try {
        const response = await axios.get("/info3/json/json.php", {
            params: { // on récupère toutes les matières
                table: "user",
                type: "completByMail",
                mail: mail_teacher,
                mdp: mdp_teacher
            }
        });
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la requête Axios pour le teacher par mail et mdp :", error);
        return []; // renvoie tableau vide si erreur
    }
}

// récupère les admin
async function get_admin() {
    try {
        const response = await axios.get("/info3/json/json.php", {
            params: { // on récupère tous les admin
                table: "admin",
                type: "all",
            }
        });
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la requête Axios des admin :", error);
        return []; // renvoie tableau vide si erreur
    }
}

// récupère les student
async function get_student() {
    try {
        const response = await axios.get("/info3/json/json.php", {
            params: { // on récupère tous les admin
                table: "student",
                type: "all",
            }
        });
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la requête Axios des student :", error);
        return []; // renvoie tableau vide si erreur
    }
}

// récupère les student
async function get_teacher() {
    try {
        const response = await axios.get("/info3/json/json.php", {
            params: { // on récupère tous les admin
                table: "teacher",
                type: "all",
            }
        });
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la requête Axios des teacher :", error);
        return []; // renvoie tableau vide si erreur
    }
}

// -------------------------------
// ------ SUPPRESSION TABLE ------
// -------------------------------

// Supprime l'admin dans la base de donnée
function delete_user(id_user,role_user) {
    fetch('json/json.php', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ type: role_user, id: id_user }) 
    })
    .then(res => res.json())
    .then(data => { // quand la suppression est terminée, on fait la suite
        console.log("Suppression du user : ", data);
        // raffraichissement de la page
        switch(role_user) {
            case 'admin':
                creation_form_admin(document.querySelector("#createInputSection")); 
                break;
            case 'student':
                creation_form_student(document.querySelector("#createInputSection")); 
                break;
            case 'teacher':
                creation_form_teacher(document.querySelector("#createInputSection")); 
                break;
          }
    })
    .catch(error => console.error('Erreur:', error));
}

// supprime une classe pour un prof dans la base de donnée
async function delete_all_class_teacher(id_teacher){

    let info_add = {
        type: 'class_teacher',
        teacher_id: id_teacher,
        all : 'all'
    }
    
    fetch('json/json.php', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',  // JSON dans le body
        },
        body: JSON.stringify(info_add)   // Convertir l'objet en JSON
    })
    .then(res => res.json())
    .then(data => console.log("Suppression des classes d'un prof : ",data))
    .catch(error => console.error('Erreur:',error));
}

// suppression des matières pour un prof dans la base de donnée
async function delete_all_teacher_subject(teacher_id){

    let info_add = {
        type: 'teacher_subject',
        id_teacher: teacher_id,
        all : 'all'
    }
    
    fetch('json/json.php', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',  // JSON dans le body
        },
        body: JSON.stringify(info_add)   // Convertir l'objet en JSON
    })
    .then(res => res.json())
    .then(data => console.log("Suppression des matières d'un prof : ",data))
    .catch(error => console.error('Erreur:',error));
}

// --------------------------------
// ------ MODIFICATION TABLE ------
// --------------------------------

// Modifie l'admin dans la base de donnée
function modify_admin(id_admin){

    let admin = { // contenu du nouvel admin
        type : 'admin',
        name : document.querySelector("#prenomAdminInput").value,
        surname : document.querySelector("#nomAdminInput").value,
        mail : document.querySelector("#mailAdminInput").value,
        password : document.querySelector("#mdpAdminInput").value,
        id : id_admin
    }

    fetch('json/json.php', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',  // JSON dans le body
        },
        body: JSON.stringify(admin)   // Convertir l'objet en JSON
    })
    .then(res => res.json())
    .then(data => {
        console.log("Modification de l'admin : ",data);
        creation_form_admin(document.querySelector("#createInputSection"));
    })
    .catch(error => console.error('Erreur:',error));
}

// Modifie le student dans la base de donnée
function modify_student(id_student){

    let student = { // contenu du nouvel étudiant
        type : 'student',
        name : document.querySelector("#prenomStudentInput").value,
        surname : document.querySelector("#nomStudentInput").value,
        mail : document.querySelector("#mailStudentInput").value,
        password : document.querySelector("#mdpStudentInput").value,
        class_name : document.querySelector("#classeStudentSelect").value,
        id : id_student
    }

    fetch('json/json.php', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',  // JSON dans le body
        },
        body: JSON.stringify(student)   // Convertir l'objet en JSON
    })
    .then(res => res.json())
    .then(data => {
        console.log("Modification de l'étudiant : ",data);
        creation_form_student(document.querySelector("#createInputSection"));
    })
    .catch(error => console.error('Erreur:',error));
}

// Modifie le professeur dans la base de donnée
async function modify_teacher(id_teacher) {

    let mail_teacher = document.querySelector("#mailTeacherInput").value;
    let mdp_teacher = document.querySelector("#mdpTeacherInput").value;

    let teacher = { // contenu du nouvel étudiant
        type : 'teacher',
        name : document.querySelector("#prenomTeacherInput").value,
        surname : document.querySelector("#nomTeacherInput").value,
        mail : mail_teacher,
        password :mdp_teacher,
        id : id_teacher
    }
    
    try {
        // Modifier le professeur
        const res = await fetch('json/json.php', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',  // JSON dans le body
            },
            body: JSON.stringify(teacher)   // Convertir l'objet en JSON
        });

        // On supprime les classes et matières actuelles
        await delete_all_class_teacher(id_teacher);
        await delete_all_teacher_subject(id_teacher);
        

        // On ajoute les classes
        const classesTeacher = Array.from(document.querySelectorAll('input[name="teacher_classe_checkbox"]:checked'));
        await Promise.all(classesTeacher.map(classe => add_class_teacher(classe.value, id_teacher)));

        // On ajoute les matières
        const subjectTeacher = Array.from(document.querySelectorAll('input[name="teacher_subject_checkbox"]:checked'));
        await Promise.all(subjectTeacher.map(subject => add_teacher_subject(subject.value, id_teacher)));

        // On rafraichit la page
        creation_form_teacher(document.querySelector("#createInputSection"));

    } catch (error) {
        console.error('Erreur:', error);
    }
}

// ----------------------------
// ------ CRÉATION TABLE ------
// ----------------------------

// Crée l'admin dans la base de donnée
function add_admin(){

    let admin = { // contenu du nouvel admin
        type : 'admin',
        name : document.querySelector("#prenomAdminInput").value,
        surname : document.querySelector("#nomAdminInput").value,
        mail : document.querySelector("#mailAdminInput").value,
        password : document.querySelector("#mdpAdminInput").value
    }

    fetch('json/json.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',  // JSON dans le body
        },
        body: JSON.stringify(admin)   // Convertir l'objet en JSON
    })
    .then(res => res.json())
    .then(data => {
        console.log("Création de l'utilisateur : ",data);
        creation_form_admin(document.querySelector("#createInputSection"));
    })
    .catch(error => console.error('Erreur:',error));
}

// Crée le student dans la base de donnée
function add_student(){

    let student = { // contenu du nouvel étudiant
        type : 'student',
        name : document.querySelector("#prenomStudentInput").value,
        surname : document.querySelector("#nomStudentInput").value,
        mail : document.querySelector("#mailStudentInput").value,
        password : document.querySelector("#mdpStudentInput").value,
        class_name : document.querySelector("#classeStudentSelect").value
    }

    fetch('json/json.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',  // JSON dans le body
        },
        body: JSON.stringify(student)   // Convertir l'objet en JSON
    })
    .then(res => res.json())
    .then(data => {
        console.log("Création de l'étudiant : ",data);
        creation_form_student(document.querySelector("#createInputSection"));
    })
    .catch(error => console.error('Erreur:',error));
}

// Crée le professeur dans la base de donnée
async function add_teacher() {

    let mail_teacher = document.querySelector("#mailTeacherInput").value;
    let mdp_teacher = document.querySelector("#mdpTeacherInput").value;

    let teacher = { // contenu du nouvel étudiant
        type : 'teacher',
        name : document.querySelector("#prenomTeacherInput").value,
        surname : document.querySelector("#nomTeacherInput").value,
        mail : mail_teacher,
        password :mdp_teacher,
    }
    
    try {
        // 1. Crée le professeur
        const res = await fetch('json/json.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',  // JSON dans le body
            },
            body: JSON.stringify(teacher)   // Convertir l'objet en JSON
        });

        // on récupère la réponse de la création du prof
        const data = await res.json();
        console.log("Création du professeur : ", data);

        // on récupère le teacher et son id
        const user_teacher = await get_teacher_mail_mdp(mail_teacher, mdp_teacher);
        const id_teacher = user_teacher['id'];

        // On ajoute les classes
        const classesTeacher = Array.from(document.querySelectorAll('input[name="teacher_classe_checkbox"]:checked'));
        await Promise.all(classesTeacher.map(classe => add_class_teacher(classe.value, id_teacher)));

        // On ajoute les matières
        const subjectTeacher = Array.from(document.querySelectorAll('input[name="teacher_subject_checkbox"]:checked'));
        await Promise.all(subjectTeacher.map(subject => add_teacher_subject(subject.value, id_teacher)));

        // On rafraichit la page
        creation_form_teacher(document.querySelector("#createInputSection"));

    } catch (error) {
        console.error('Erreur:', error);
    }
}

// ajoute une classe pour un prof dans la base de donnée
function add_class_teacher(class_name, id_teacher){

    let info_add = {
        type: 'class_teacher',
        teacher_id: id_teacher,
        class_name: class_name
    }
    
    fetch('json/json.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',  // JSON dans le body
        },
        body: JSON.stringify(info_add)   // Convertir l'objet en JSON
    })
    .then(res => res.json())
    .then(data => console.log("Ajout de la classe d'un prof : ",data))
    .catch(error => console.error('Erreur:',error));
}


// ajoute une matière pour un prof dans la base de donnée
function add_teacher_subject(id_subject, teacher_id){

    let info_add = {
        type: 'teacher_subject',
        id_teacher: teacher_id,
        id_subject: id_subject
    }
    
    fetch('json/json.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',  // JSON dans le body
        },
        body: JSON.stringify(info_add)   // Convertir l'objet en JSON
    })
    .then(res => res.json())
    .then(data => console.log("Ajout de la matière d'un prof : ",data))
    .catch(error => console.error('Erreur:',error));
}

// ---------------------------------
// ------ Création des listes ------
// ---------------------------------

// affiche la liste des admin
async function create_admin_list(parent){
    
    let adminTable = create_element("table", parent, "adminTable");

    // Crée l'entête du tableau
    let titres = ["Nom", "Prénom", "Mail", "Modifier", "Supprimer"];
    create_user_header(adminTable,titres);

    // Crée les contenu du tableau
    let categories = ['surname','name','mail'];
    get_admin().then(admins => {
        add_user_table_content(adminTable,admins,categories);
    })
}

// affiche la liste des admin
async function create_student_list(parent){
    
    let studentTable = create_element("table", parent, "studentTable");

    // Crée l'entête du tableau
    let titres = ["Nom", "Prénom", "Mail", "Classe","Modifier", "Supprimer"];
    create_user_header(studentTable,titres);

    // Crée les contenu du tableau
    let categories = ['surname','name','mail','class_name'];
    get_student().then(students => {
        add_user_table_content(studentTable,students,categories);
    })
}

// affiche la liste des teacher
async function create_teacher_list(parent){
    
    let teacherTable = create_element("table", parent, "teacherTable");

    // Crée l'entête du tableau
    let titres = ["Nom", "Prénom", "Mail", "Modifier", "Supprimer"];
    create_user_header(teacherTable,titres);

    // Crée les contenu du tableau
    let categories = ['surname','name','mail'];
    get_teacher().then(teachers => {
        add_user_table_content(teacherTable,teachers,categories);
    })
}

// // Crée l'entête du tableau
function create_user_header(parent,titres){
    let row = create_element("tr", parent, "UserListHeader");

    titres.forEach(header_title => {
        create_element("th", row, header_title + "HeaderUser", header_title);
    });
}

// Crée le contenu du tableau
function add_user_table_content(parent, users, categories){
    users.forEach(user => {
        let row = create_element("tr", parent, "rowUser" + user["id"]);
        
        add_user_row_content(row, user, categories);
    });
}

// Crée les lignes
function add_user_row_content(parent, user, categories){
    
    categories.forEach(categorie => {
        create_element("td", parent, "", user[categorie]);
    })

    add_user_list_action(parent,user);
}

function add_user_list_action(parent,user){
    id_user = user['id'];
    role_user = user['role'];

    // Modifier
    let modifyCell = create_element("td", parent, "");
    let modifyButton = create_element("button", modifyCell, "","Modifier");
    switch(role_user){
        case 'admin':
            modifyButton.addEventListener("click", () => creation_form_admin(document.querySelector("#createInputSection"),'put',user));
            modifyButton.addEventListener("click", () => document.querySelector("#titreCreate").innerHTML = "Modifier un administrateur")
            break;
        case 'student':
            modifyButton.addEventListener("click", () => creation_form_student(document.querySelector("#createInputSection"),'put',user));
            modifyButton.addEventListener("click", () => document.querySelector("#titreCreate").innerHTML = "Modifier un étudiant")
            break;
        case 'teacher':
            modifyButton.addEventListener("click", () => creation_form_teacher(document.querySelector("#createInputSection"),'put',user));
            modifyButton.addEventListener("click", () => document.querySelector("#titreCreate").innerHTML = "Modifier un professeur")
            break;
    }

    // Supprimer
    let deleteCell = create_element("td", parent, "");
    let deleteButton = create_element("button", deleteCell, "","Supprimer");
    deleteButton.addEventListener("click", () => delete_user(id_user,role_user));

}