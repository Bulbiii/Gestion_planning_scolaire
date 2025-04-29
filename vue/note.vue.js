// '_' allows to skip the button's event
function create_note_view(_, note_obj=empty_note_obj, action="add"){
    let container = document.querySelector("body");
    container.innerHTML = "";

    home_button(container);

    axios.get("/info3/json/json.php", {
        params : {
            table : "user",
            type : "byId",
            id : userId
        }
    }).then(res => {
        let userType = res.data.role;

        if (userType == "teacher")
        {
            // Create inputs
            let inputSection = create_element("section", container, "noteInputSection");
            init_input_section(inputSection, note_obj, action);
        }

        // Contain created notes
        let listSection = create_element("section", container, "noteListSection");

        create_note_list(listSection, userType);
    });
}

function home_button(container){
    let header = create_element("header", container, "noteHeader");

    let homeButton = create_element("button", header, "homeButtonNote");
    homeButton.onclick = create_main_vue;

    let homeIcon = create_element("img", homeButton, "homeButtonIconNote");
    homeIcon.src = "/info3/vue/style/img/maison.png";
}


function init_input_section(inputSection, note_obj, action){
    // Unavailability selectors
    create_unav_container(inputSection, note_obj);

    // recurring absence
    create_rec_container(inputSection);

    // Description
    create_desc_container(inputSection, note_obj);

    // Add/Update button
    add_update_note_button(inputSection, action, note_obj);
}


function create_unav_container(container, note_obj){
    // Unavailability container
    let unavContainer = create_element("div", container, "noteUnavContainer");

    // unavailability dates
    let unavLabel = create_element("label", unavContainer, "noteUnavLabel", "Indisponibilité : ");
    unavLabel.for = "dateTimeUnav"

    // start date
    let unavStartDate = create_element("input", unavContainer, "noteUnavInputStartDate");
    unavStartDate.name = "dateTimeUnav";
    unavStartDate.type = "date";
    unavStartDate.value = note_obj["startDate"];
    

    // start time
    let unavStartTime = create_element("input", unavContainer, "noteUnavInputStartTime");
    unavStartTime.name = "dateTimeUnav";
    unavStartTime.type = "time"
    unavStartTime.value = note_obj["startTime"];

    // end date
    let unavEndDate = create_element("input", unavContainer, "noteUnavInputEndDate");
    unavEndDate.name = "dateTimeUnav";
    unavEndDate.type = "date";
    unavEndDate.value = note_obj["endDate"];

    // end time
    let unavEndTime = create_element("input", unavContainer, "noteUnavInputEndTime");
    unavEndTime.name = "dateTimeUnav";
    unavEndTime.type = "time"
    unavEndTime.value = note_obj["endTime"];
}




function create_rec_container(container){
    // Recurrence container
    let recContainer = create_element("div", container, "noteRecContainer");

    // Recurrence label
    let recLabel = create_element("label", recContainer, "noteRecLabel", "Récurrence : ");
    recLabel.for = "recDays";

    // Checkboxes container
    let recRadioForm = create_element("fieldset", recContainer, "noteRecRadioForm");
    recRadioForm.name = "recDay";

    // Possible recurring days
    let possibleRecDays = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi"];

    // Checkboxes
    possibleRecDays.forEach(day => {
        // Recuring days radio buttons
        let dayRadio = create_element("input", recRadioForm, day+"_radio");
        dayRadio.type = "radio";
        dayRadio.name = "recDay";

        let dayLabel = create_element("label", recRadioForm, day+"_radio_label", day);
        dayLabel.for = day+"_radio";
    })  
}


function create_desc_container(container, note_obj){
    // Description container
    let descContainer = create_element("div", container, "noteDescContainer");

    // description's label
    let descLabel = create_element("label", descContainer, "noteDescLabel", "Description : ");
    descLabel.for = "descInput";

    // description's entry
    let descInput = create_element("input", descContainer, "noteDescInput");
    descInput.name = "descInput";
    descInput.value = note_obj["desc"];
}


function add_update_note_button(container, action, note_obj){
    let button = create_element("button", container, "actionNoteButton");
    
    if (action == "add"){
        button.innerHTML = "Ajouter";
        button.onclick = add_note;
    } else {
        button.innerHTML = "Modifier";
        button.onclick = update_note;
        button.value = note_obj.id;
    }

}


function get_rec_day(){
    let res = "none";
    
    let radioContainer = document.querySelector("#noteRecRadioForm");
    let i = 0;

    console.log(radioContainer.children.length);
    

    while (i < radioContainer.children.length && res == "none"){
        let radio = radioContainer.children[i*2];
        console.log(radio);
        
        if (radio.checked){
            res = radio.id.split("_")[0]; // get linked day
        }

        i++;
    }

    return res;
}

function get_form_data(){
    let startDate = document.querySelector("#noteUnavInputStartDate").value;
    let endDate = document.querySelector("#noteUnavInputEndDate").value;
    let startTime = document.querySelector("#noteUnavInputStartTime").value;
    let endTime = document.querySelector("#noteUnavInputEndTime").value;
    let rec = get_rec_day();
    let desc = document.querySelector("#noteDescInput").value;

    return {startDate : startDate, endDate : endDate, startTime : startTime, endTime : endTime, desc : desc, rec : rec};
}


function add_note(){
    let fieldsData = get_form_data();

    let params = {
        table : "constraint",
        type : "insert",
        day : "...", 
        date_start : fieldsData.startDate,
        date_end : fieldsData.endDate,
        h_start : fieldsData.startTime,
        h_end : fieldsData.endTime,
        desc : fieldsData.desc,
        recurrent : false,
        id_teacher : userTypeId
    }

    console.log(fieldsData.rec);
    

    if (fieldsData.rec != "none"){
        params.day = fieldsData.rec;
        params.recurrent = true;
    }

    axios.get("/info3/json/json.php", {
        params
    }).then(res => {
        if (res.data == "erreur"){
            console.log("Erreur lors de la sauvegarde de la contrainte");
        } else {
            create_note_view(null); // if the add button is available it means that the user is a teacher 
        }
    });
}


function update_note(){
    let fieldsData = get_form_data();
    let params = {
        table : "constraint",
        type : "update",
        id : this.value,
        day : "...",
        date_start : fieldsData.startDate,
        date_end : fieldsData.endDate,
        h_start : fieldsData.startTime,
        h_end : fieldsData.endTime,
        desc : fieldsData.desc,
        recurrent : false,
        id_teacher : userTypeId
    }

    if (fieldsData.rec != "none"){
        params.day = fieldsData.rec;
        params.recurrent = true;
    }

    axios.get("/info3/json/json.php", {
        params
    }).then(res => {
        if (res.data == "erreur"){
            console.log("Erreur lors de la sauvegarde de la contrainte");
        } else {
            create_note_view(null);// if the modify button is available it means that the user is a teacher
        }
    });
}

async function create_note_list(container, usertype){
    // note's table (contain a list of notes made by the teacher)
    let noteTable = create_element("table", container, "noteTable");

    // create table's headers
    create_note_header(noteTable, usertype);

    get_notes(usertype).then(notes => {
        // add table's content
        add_note_table_content(noteTable, notes, usertype);
    });
}

function create_note_header(container, userType){
    let row = create_element("tr", container, "noteListHeader");

    let headers;
    
    if (userType == "teacher") {
        headers = ["Date de début", "Date de fin", "Heure de début", "Heure de fin", "Modifier", "Supprimer"];
    } else{
        headers = ["Mail", "Date de début", "Date de fin", "Heure de début", "Heure de fin"];
    }

    headers.forEach(header_title => {
        create_element("th", row, header_title + "HeaderNote", header_title);
    });
}


async function add_note_table_content(container, notes, userType){
    notes.forEach(noteInfo => {
        let row = create_element("tr", container, "rowNote" + noteInfo["id"]);
        row.classList.add("noteRow");
        
        add_note_row_content(row, noteInfo, userType);
    });
}


function add_note_row_content(container, infos, userType){
    if (userType == "admin"){
        let mailCell = create_element("td", container, "", "mail");
        

        axios.get("/info3/json/json.php", {
            params : {
                table : "teacher",
                type : "byId",
                id : infos["teacherId"]
            }
        }).then(res => {
            axios.get("/info3/json/json.php", {
                params : {
                    table : "user",
                    type : "byId",
                    id : res.data["id_user"]
                }
            }).then(res => {
                mailCell.innerHTML = res.data["mail"];
            })
        });
    }

    for (let info_type in infos) {
        if (info_type != "id" && info_type != "teacherId") {
            if (info_type == )
            let cell = create_element("td", container, "", infos[info_type]);
            cell.classList.add(info_type + "CellNote");
        }
    }

    if (userType == "teacher"){
        add_note_list_action(container);
    }
}

function add_note_list_action(container){
    let modifyCell = create_element("td", container, "");
    modifyCell.classList.add("modifyNote");
    
    let modifyButton = create_element("button", modifyCell, "");
    modifyButton.onclick = modify_note;

    let modifyIcon = create_element("img", modifyButton);
    modifyIcon.src = "/info3/vue/style/img/crayon-de-couleur.png";


    let deleteCell = create_element("td", container, "");
    deleteCell.classList.add("deleteNote");

    let deleteButton = create_element("button", deleteCell, "");
    deleteButton.onclick = delete_note;

    let deleteIcon = create_element("img", deleteButton);
    deleteIcon.src = "/info3/vue/style/img/fermer.png";
}

function modify_note(){
    let infoLine = this.parentElement.parentElement;
    let infoId = infoLine.id.split("rowNote")[1];

    axios.get("/info3/json/json.php", {
        params : {
            table : "constraint",
            type : "byId",
            id : infoId
        }
    }).then(res => {
        if (res.data == "Erreur"){
            console.log("Erreur lors de l'importation des données");
        } else {
            let info = {id : res.data["id"], startDate : res.data["date_start"], endDate : res.data["date_end"], startTime : res.data["h_start"], endTime : res.data["h_end"], desc : res.data["description"]};
            
            create_note_view(null, info, "update"); // if the modify button is available it means that the user is a teacher 
        }
    });
}



function delete_note(){
    let infoLine = this.parentElement.parentElement;
    let id = infoLine.id.split("rowNote")[1];

    axios.get("/info3/json/json.php", {
        params : {
            table : "constraint",
            type : "delete",
            id : id
        }
    }).then(res => {
        if (res.data == "erreur"){
            console.log("Erreur lors de l'importation des données");
        } else {
            create_note_view(null);
        }
    });
}

async function get_notes(userType){
    let params;

    if (userType == "admin"){
        params = {
            table : "constraint",
            type : "all",
        }
    } else {
        params = {
            table : "constraint",
            type : "byTeacher",
            id : userTypeId
        }
    }

    let notes = await axios.get("/info3/json/json.php", {
        params : params
    }).then(response => {
        let notes;

        if (response.data == "erreur"){
            console.log("Erreur lors de l'importation des contraintes.");
            notes = empty_note_obj;
        } else {
            notes = note_rs_to_info(response.data);
        }
        return notes;
    })

    return notes;
    // return [{"id" : 1, "phoneNumber" : "01 02 03 04 05", "startDate" : "01-02-24", "startTime" : "08:00", "endDate" : "01-02-24", "endTime" : "10:00"},
    //      {"id" : 2, "phoneNumber" : "01 02 03 04 05", "startDate" : "01-02-24", "startTime" : "10:00", "endDate" : "01-02-24", "endTime" : "12:00"}];
}


function note_rs_to_info(response){
    let info_list = [];

    response.forEach(obj => {
        let info = {};

        for (key in obj) {
            if (key in dbKeywordsDict) {
                info[dbKeywordsDict[key]] = obj[key];
            }
        }

        info_list.push(info);
    })

    return info_list;
}