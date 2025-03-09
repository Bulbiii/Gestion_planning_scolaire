function create_note_view(note_obj=empty_note_obj){
    let container = document.querySelector("body");
    container.innerHTML = "";

    // Create inputs
    let inputSection = create_element("section", container, "noteInputSection");
    init_input_section(inputSection, note_obj);


    // Contain created notes
    let listSection = create_element("section", container, "noteListSection");

    create_note_list(listSection);
}


function init_input_section(inputSection, note_obj){
    // Unavailability selectors
    create_unav_container(inputSection, note_obj);

    // recurring absence
    create_rec_container(inputSection);

    // Description
    create_desc_container(inputSection);

    // Add/Update button
    add_update_note_button(inputSection);
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

    // end date
    let unavEndDate = create_element("input", unavContainer, "noteUnavInputEndDate");
    unavEndDate.name = "dateTimeUnav";
    unavEndDate.type = "date";

    // end time
    let unavEndTime = create_element("input", unavContainer, "noteUnavInputEndTime");
    unavEndTime.name = "dateTimeUnav";
    unavEndTime.type = "time"
}




function create_rec_container(container){
    // Recurrence container
    let recContainer = create_element("div", container, "noteRecContainer");

    // Recurrence label
    let recLabel = create_element("label", recContainer, "noteRecLabel", "Récurrence : ");
    recLabel.for = "recDays";

    // Checkboxes container
    let recCheckboxes = create_element("div", recContainer, "noteRecCheckboxes");
    recCheckboxes.name = "recDays";

    // Possible recurring days
    let possibleRecDays = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi"];

    // Checkboxes
    possibleRecDays.forEach(day => {
        // Recuring days checkboxes
        let dayCheckbox = create_element("input", recCheckboxes, day+"_checkbox");
        dayCheckbox.type = "checkbox";
        dayCheckbox.name = day+"_checkbox";

        let dayLabel = create_element("label", recCheckboxes, day+"_label", day);
        dayLabel.for = day+"checkbox";
    })  
}



function create_desc_container(container){
    // Description container
    let descContainer = create_element("div", container, "noteDescContainer");

    // description's label
    let descLabel = create_element("label", descContainer, "noteDescLabel", "Description : ");
    descLabel.for = "descInput";

    // description's entry
    let descInput = create_element("input", descContainer, "noteDescInput");
    descInput.name = "descInput";
}


function add_update_note_button(container, type="add"){
    let button = create_element("button", container, type + "NoteButton", "Ajouter");
    button.onclick = add_note;
}


function add_note(){
    let desc = document.querySelector("#noteDescInput").value;

    console.log(desc);
}


function create_note_list(container){
    // note's table (contain a list of notes made by the teacher)
    let noteTable = create_element("table", container, "noteTable");

    // create table's headers
    create_note_header(noteTable);

    // add table's content
    add_note_table_content(noteTable);
}


function create_note_header(container){
    let row = create_element("tr", container, "noteListHeader");

    let headers = ["Numéro", "Date de début", "Heure de début", "Date de fin", "Heure de fin", "Modifier", "Supprimer"];
    headers.forEach(header_title => {
        create_element("th", row, header_title + "HeaderNote", header_title);
    });
}


function add_note_table_content(container){
    let notes = get_notes();

    notes.forEach(noteInfo => {
        let row = create_element("tr", container, "rowNote" + noteInfo["id"]);
        row.classList.add("noteRow");

        add_note_row_content(row, noteInfo);
    });
}


function add_note_row_content(container, infos){
    for (let info_type in infos) {
        if (info_type != "id") {
            let cell = create_element("td", container, "", infos[info_type]);
            cell.classList.add(info_type + "CellNote");
        }
    }

    add_note_list_action(container);
}

function add_note_list_action(container){
    let modifyCell = create_element("td", container, "");
    modifyCell.classList.add("modifyNote");
    
    let modifyButton = create_element("button", modifyCell, "", "M");
    modifyButton.onclick = modify_note;


    let deleteCell = create_element("td", container, "");
    deleteCell.classList.add("deleteNote");

    let deleteButton = create_element("button", deleteCell, "", "D");
    deleteButton.onclick = delete_note;
}

function modify_note(){
    let infoLine = this.parentElement.parentElement;
    let infoId = infoLine.id.split("rowNote")[1];

    let info;

    axios.get("/json/json.php", {
        params : {
            table : "courses",
            type : "byId",
            id : infoId
        }
    }).then(res => {
        if (! res){
            console.log("Erreur lors de l'importation des données");
        } else {
            console.log(res.data);
        }
    });
}



function delete_note(){

}


function get_notes(){
    return [{"id" : 1, "phoneNumber" : "01 02 03 04 05", "startDate" : "01-02-24", "startTime" : "08:00", "endDate" : "01-02-24", "endTime" : "10:00"},
         {"id" : 2, "phoneNumber" : "01 02 03 04 05", "startDate" : "01-02-24", "startTime" : "10:00", "endDate" : "01-02-24", "endTime" : "12:00"}];
}