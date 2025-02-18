function create_note_view(){
    let container = document.querySelector("body");
    container.innerHTML = "";

    let inputSection = create_element("section", container, "noteInputSection");

    // Unavailability selectors
    create_unav_container(inputSection);

    // recurring absence
    create_rec_container(inputSection);

    // Description
    create_desc_container(inputSection);


    // Contain created notes
    let listSection = create_element("section", container, "noteListSection");

    create_note_list(listSection);    
}




function create_unav_container(container){
    // Unavailability container
    let unavContainer = create_element("div", container, "noteUnavContainer");

    // unavailability dates
    let unavLabel = create_element("label", unavContainer, "noteUnavLabel", "Indisponibilité : ");
    unavLabel.for = "dateTimeUnav"

    // start date
    let unavStartDate = create_element("input", unavContainer, "noteUnavInputStartDate");
    unavStartDate.name = "dateTimeUnav";
    unavStartDate.type = "date";

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



function create_note_list(listSection){
    
}