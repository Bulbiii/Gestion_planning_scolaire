// tt = timetable

function create_edt(){
    let container = document.querySelector("body");

    let ttSection = create_element("section", container, "timetableSection");
    let ttGrid = create_element("div", ttSection, "ttGrid");

    add_grid_corner(ttGrid); // top left corner
    add_days(ttGrid); // days titles (top)
    add_time_titles(ttGrid); // time titles (left)
    
    add_cells(ttGrid); // empty cells (middle)
    add_courses(schedule); // add courses in empty cells
    
}


function add_days(grid){
    for (let i = 0; i < days.length; i++) {
        let day = days[i];
        
        let dayP = create_element("p", grid, "day_" + i, day);

        dayP.style.gridColumnStart = i + 2; /* start at 1 */
        dayP.style.gridRowStart = 1;

        dayP.classList.add("cell");
    }
}

function add_grid_corner(grid){
    let corner = create_element("p", grid, "corner");

    corner.classList.add("cell");

    corner.style.gridColumnStart = 1;
    corner.style.gridRowStart = 1;
}


function add_time_titles(grid){
    for (let hour = 8; hour < 20; hour++) {
        let hourP = create_element("p", grid, "hour_" + hour, hour + "h00");
        
        hourP.style.gridRowStart = hour - 6 /* -8 because hour start at 8, + 1 because 'gridRowStart' starts at 1 and + 1 because first row is for the days titles */
        hourP.style.gridColumnStart = 1;

        hourP.classList.add("timeTitle");
        hourP.classList.add("cell");
    }
}

function add_cells(grid){
    for (columnIndex=0; columnIndex < 5; columnIndex++){
        for (rowIndex=0; rowIndex < 12; rowIndex++){
            let cell = create_element("button", grid, "cell_"+days[columnIndex]+"_"+rowIndex, columnIndex+"_"+rowIndex);
            cell.disabled = true;

            cell.style.gridColumnStart = columnIndex + 2; /* start at 1 and index 1 = time title */
            cell.style.gridRowStart = rowIndex + 2; /* start at 1 and index 1 = day */

            cell.classList.add("cell");
        }
    }
}


function add_courses(schedule){
    for (const day in schedule) {
        for (const hour in schedule[day]){
            let cell = document.querySelector("#cell_"+day+"_"+(hour - 8)); //  hour start at 8 
            cell.disabled = false; // activation du bouton
            cell.addEventListener("click", select_course); // creating popup

            cell.innerHTML = schedule[day][hour]; // course's name
        }
    }
}


function select_course(){
    let tt = document.querySelector("#timetableSection");

    // permet de desactiver les interactions avec les elements non concernes
    create_element("div", tt, "blockBackground");
    // popup d'information du cours
    let popup = create_element("article", tt, "popupArticle");

    // ajout du contenu de la popup
    add_popup_content(popup, this.innerHTML);

    let closePopupButton = create_element("button", popup, "closePopupButton", "X");
    closePopupButton.addEventListener("click", close_popup);
}


function add_popup_content(popup, courseTitle){
    // Intitule du cours
    let title = create_element("h2", popup, "popupTitle", courseTitle);

    // Decription du cours
    let desc = create_element("p", popup, "popupDesc", "Texte temporaire très intéressant");

    // Heure de debut et de fin
    let startHour = create_element("p", popup, "popupStartHour", "Heure départ : 8h00");
    let endHour = create_element("p", popup, "popupEndHour", "Heure de fin : 9h00");

    // salle du cours
    let room = create_element("p", popup, "popupRoom", "Room : 8C");
}


function close_popup(){
    let tt =document.querySelector("#timetableSection");

    let popup = document.querySelector("#popupArticle");
    tt.removeChild(popup);

    let blockBackground = document.querySelector("#blockBackground");
    tt.removeChild(blockBackground);
}