function create_main_vue(){
    // let body = document.querySelector("body");
    
    // create_header(body);

    // let main = create_element("main", body, "");

    // create_tt(main, schedule);

    // let user_type = "prof";

    // if (user_type == "prof"){
    //     create_teacher_icons(main);      
    // } else if (user_type == "admin"){
    //     create_admin_icons(main);
    // }

    // create_footer(body);

    create_note_view();
}


function create_teacher_icons(container){
    let buttonContainer = create_element("section", container, "buttonMainSection");

    let createNoteVueButton = create_element("button", buttonContainer, "createNoteVueButton", "Notes");
    createNoteVueButton.onclick = create_note_view;

    create_class_select(buttonContainer);
}






function create_class_select(container){
    let classSelect = create_element("select", container, "changeClassButton");

    let classes = ["4A", "3C", "6D"];

    classes.forEach(className => {
        let option = create_element("option", classSelect, "option_" + className, className);
        option.value = className;
    });

    classSelect.onchange = e => {
        currentClass = e.target.value;
        
        let weekInput = document.querySelector("#currentWeekEntry");

        update_tt(weekInput.value);
    }
}