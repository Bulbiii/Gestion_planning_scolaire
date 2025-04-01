// tt = timetable

window.addEventListener("load", _ => {
    update_tt();
})

async function create_tt(container){
    let ttSection = create_element("section", container, "timetableSection");
    let ttGrid = create_element("div", ttSection, "ttGrid");

    add_grid_corner(ttGrid); // top left corner
    add_days(ttGrid); // days titles (top)
    add_time_titles(ttGrid); // time titles (left)
    
    add_cells(ttGrid); // empty cells (middle)
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

            cell.classList.add("courseCell"); // allowing to erase cells when updating tt
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

    let popupContent = create_element("div", popup, "popupContent");

    // course's description
    let desc = create_element("p", popupContent, "popupDesc", "Texte temporaire très intéressant");

    // start and end hour
    let startHour = create_element("p", popupContent, "popupStartHour", "Heure départ : 8h00");
    let endHour = create_element("p", popupContent, "popupEndHour", "Heure de fin : 9h00");

    // course's room
    let room = create_element("p", popupContent, "popupRoom", "Salle : 8C");
}


function close_popup(){
    // popup's parent
    let tt =document.querySelector("#timetableSection");

    let popup = document.querySelector("#popupArticle");
    tt.removeChild(popup);

    let blockBackground = document.querySelector("#blockBackground");
    tt.removeChild(blockBackground);
}




function update_tt(){
    let cells = document.querySelectorAll(".courseCell");

    cells.forEach(cell => {
        cell.innerHTML = ""; // remove content
    });
    
    get_courses().then(schedule => {
        add_courses(schedule); // add courses in empty cells
    })

    let body = document.querySelector("body");
    create_header(body);
}

async function get_courses(){
    // class name
    let id = currentClass;

    let dates = get_week_dates();
    

    let res = axios.get("/info3/json/json.php", {
        params : {
            table : "courses",
            type : "week",  
            id : "4A",
            start : dates.start,
            end : dates.end
        }
    }).then(res => {
        let result;
        if (res.data == "erreur"){
            console.log("Erreur lors de l'importation des données");
        } else {
            result = rs_to_schedule(res.data);
            
        }
        return result;
    });

    return res;
}


function get_week_dates(){
    let weekNumberElement = document.querySelector("#currentWeekEntry");

    let startDate;
    let endDate;

    if (weekNumberElement == null) {
        let currentDate = new Date();
        // current day - day of the week (monday = 0, tuesday = 1, ...)
        let startDay = currentDate.getDate() - (currentDate.getDay() - 1 % 7); // -1 because getDay starts on Sunday
        
        startDate = new Date(currentDate.setDate(startDay));
        endDate = new Date(currentDate.setDate(startDay + 4));
    } else {
        let weekNumber = weekNumberElement.value;
        
        // week's date using week's number
        // source : https://stackoverflow.com/questions/16590500/calculate-date-from-week-number-in-javascript
        let dayNumber = (weekNumber - 1) * 7 - 1 // -1 because the first week is 1 not 0 ; + 1 because the first day is 1
        let year = new Date().getFullYear();
        
        // Start date
        startDate = new Date(year, 1, dayNumber) // will correct date
        
        // End date
        endDate = new Date(year, 1, dayNumber + 4) // + 4 to have friday
    }

    // Start and end date display
    let startDateStr = startDate.getFullYear() + "-" + (startDate.getMonth() + 1) + "-" + startDate.getDate(); // + 1 because month start at 0
    let endDateStr = endDate.getFullYear() + "-" + (endDate.getMonth() + 1) + "-" + endDate.getDate();    

    return {start : startDateStr, end : endDateStr};
}


function get_week_number(){
    let weekNumberElement = document.querySelector("#currentWeekEntry");
    let weekNumber;

    if (weekNumberElement == null || weekNumberElement.value == "") {
        // source : 
        // https://www.geeksforgeeks.org/how-to-get-the-current-weeknumber-of-the-year/
        let currentDate = new Date();

        
        // Number of days since January first of the current year
        let januaryFirstDate = new Date(currentDate.getFullYear(), 0, 1);
        
        // 1000 ms dans une seconde ;
        // 60 secondes dans une minute ;
        // 60 minutes dans une heure ; 
        // 24h dans une journée
        // => ms in a day
        // => (1000 * 60 * 60 * 24)
        // = 86400000
        // / (ms in a day) to get the number of days in a year
        let dayNumberSinceJanFst = Math.floor((currentDate.getTime() - januaryFirstDate.getTime()) / 86400000);
        // Math.floor to ignore the current date's time


        // monday = 0; tuesday = 1; ...
        let januaryFirstDay = januaryFirstDate.getDay() - 1 % 7; // -1 because getDay starts on Sunday

        // day number is added because the first week can start before january if january first isn't a monday
        // + 1 because the first week number is 1 not 0
        weekNumber = Math.floor((dayNumberSinceJanFst + januaryFirstDay) / 7) + 1;
    } else {
        weekNumber = weekNumberElement.value;
    }

    return weekNumber;
}

function rs_to_schedule(res){
    let coursesWeek = {};
    
    res.forEach(courseDB => {
        let startTime = Number(courseDB.h_start.split(":")[0]);

        let frenchDay = toFrenchDay[courseDB.day];

        if (frenchDay in coursesWeek){
            coursesWeek[frenchDay][startTime] = courseDB.subject.name;
        } else {
            coursesWeek[frenchDay] = {};
            coursesWeek[frenchDay][startTime] = courseDB.subject.name;
        }
    });

    return coursesWeek;
    
}