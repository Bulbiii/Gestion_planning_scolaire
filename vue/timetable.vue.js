// tt = timetable

function create_tt(container, schedule){
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
            let cell = create_element("button", grid, "cell_"+days[columnIndex]+"_"+rowIndex);
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
            cell.disabled = false;
            cell.addEventListener("click", select_course); // creating popup

            cell.innerHTML = schedule[day][hour]; // course's name

            cell.classList.add("courseCell"); // allowing to erase cell when updating tt
        }
    }
}


function select_course(){
    let tt = document.querySelector("#timetableSection");

    // allow to disable interactions with unwanted elements
    create_element("div", tt, "blockBackground");
    // course's informations popup
    let popup = create_element("article", tt, "popupArticle");

    add_popup_content(popup, this.innerHTML);

    let closePopupButton = create_element("button", popup, "closePopupButton", "X");
    closePopupButton.addEventListener("click", close_popup);
}


function add_popup_content(popup, courseTitle){
    // course's title
    let title = create_element("h2", popup, "popupTitle", courseTitle);

    // course's description
    let desc = create_element("p", popup, "popupDesc", "Texte temporaire très intéressant");

    // start and end hour
    let startHour = create_element("p", popup, "popupStartHour", "Heure départ : 8h00");
    let endHour = create_element("p", popup, "popupEndHour", "Heure de fin : 9h00");

    // course's room
    let room = create_element("p", popup, "popupRoom", "Room : 8C");
}


function close_popup(){
    // popup's parent
    let tt =document.querySelector("#timetableSection");

    let popup = document.querySelector("#popupArticle");
    tt.removeChild(popup);

    let blockBackground = document.querySelector("#blockBackground");
    tt.removeChild(blockBackground);
}




function update_tt(weekNb){
    let cells = document.querySelectorAll(".courseCell");

    cells.forEach(cell => {
        cell.innerHTML = ""; // remove content
    });

    // temporary
    if (weekNb % 2 == 0){
        add_courses(schedule);
    } else {
        add_courses(schedule_bis) // schedule_bis is temporary
    }
}