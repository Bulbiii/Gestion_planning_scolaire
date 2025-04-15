window.addEventListener("load", _ => {
    theme_startup();
})

function theme_startup(){
    const savedTheme = localStorage.getItem("theme");



    if (savedTheme === "dark" || savedTheme === "light") {
        document.body.classList.add(savedTheme);
    } else {
        // Thème par défaut si rien de sauvegardé

        document.body.classList.add("dark"); // ou "light", selon ta préférence

        localStorage.setItem("theme", "dark");
    }
}

function create_header(container, classes){
    let header = document.querySelector("#mainFrameHeader");

    if (header == null){
        header = create_element("header", container, "mainFrameHeader");
    } else{
        header.innerHTML = "";
    }

    let leftHeaderContainer = create_element("div", header, "leftHeaderContainer");

    create_theme_changer_header(leftHeaderContainer);

    create_date_info_header(leftHeaderContainer);

    create_week_info_header(header);

    create_user_info_header(header, classes);

}

function create_theme_changer_header(container) {



    let div = create_element("div", container, "themeContainer");


    div.className = "containerrrs"; 





    let label = create_element("label", div, "themeSwitchLabel");


    label.className = "switch"; 





    let input = document.createElement("input");


    input.type = "checkbox";


    input.id = "toggle";


    label.appendChild(input);





    let span = document.createElement("span");


    span.className = "slider";


    label.appendChild(span); 





    // Appliquer le thème de l'utilisateur dès le début


    const savedTheme = localStorage.getItem("theme");


    if (savedTheme === "dark") {


        input.checked = true;


        document.body.classList.add("dark");


        document.body.classList.remove("light");


    } else if (savedTheme === "light") {


        input.checked = false;


        document.body.classList.add("light");


        document.body.classList.remove("dark");


    } else {


        // Si pas de thème sauvegardé, par défaut "dark"


        document.body.classList.add("dark");


        localStorage.setItem("theme", "dark");


    }


    // Changer le thème en fonction de l'état du bouton


    input.addEventListener("change", () => {


        if (input.checked) {


            document.body.classList.add("dark");


            document.body.classList.remove("light");


            localStorage.setItem("theme", "dark");


        } else {


            document.body.classList.add("light");


            document.body.classList.remove("dark");


            localStorage.setItem("theme", "light");


        }


    });

}



function change_theme(){
    let a = 1;
}


function create_date_info_header(container){
    // contain date's infos
    let dateInfoContainer = create_element("div", container, "dateInfoContainer");

    // dates
    let dates = get_week_dates();

    // start date
    let startDateTab = dates.start.split("-");
    let startDate = startDateTab[2] + "/" + startDateTab[1] + "/" + startDateTab[0];
    create_element("p", dateInfoContainer, "startDateInfoHeader", startDate);

    // separator between dates
    create_element("p", dateInfoContainer, "separatorInfoContainer", "-")

    // end date
    let endDateTab = dates.end.split("-");
    let endDate = endDateTab[2] + "/" + endDateTab[1] + "/" + endDateTab[0];
    create_element("p", dateInfoContainer, "endDateInfoHeader", endDate);
}


function create_week_info_header(container){
    // contain week's info
    let weekInfoContainer = create_element("div", container, "weekInfoContainer");
    // week number
    create_element("p", weekInfoContainer, "weekInfoHeader", "Semaine " + get_week_number());
}



function create_user_info_header(container, classes){
    // contain user's info
    let userInfoContainer = create_element("div", container, "userInfoContainer");

    // user's class
    create_element("p", userInfoContainer, "classInfoHeader", get_class_name(classes));

    // user's name
    let user_name = create_element("p", userInfoContainer, "nameInfoHeader");
    get_user_name().then(name => {
        user_name.innerHTML = name;
    });

    // user's profil
    let boutonProfil = create_element("button",userInfoContainer,"profilInfoHeader","Profil");
    boutonProfil.style.zIndex = "10"; 
    boutonProfil.addEventListener("click", () => profil_vue());
}