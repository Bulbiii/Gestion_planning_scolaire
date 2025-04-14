function create_main_vue(){
    
    axios.get("/info3/json/json.php", {
        params : {
            table : "user",
            type : "byId",
            id : userId
        }
    }).then(res => {
    
        let role = res.data["role"];
        
        get_classes_name(role).then(classes => {
            console.log("toto");
            
            console.log(classes);
            
        
            let body = document.querySelector("body");
            body.innerHTML = "";

            create_header(body, classes);
            
            let main = create_element("main", body, "");
            
            create_tt(main);
            
            if (role == "teacher"){
                create_teacher_icons(main, classes);      
            } else if (role == "admin"){
                create_admin_icons(main, classes);
            }
            
            
            create_footer(body);
        });
    });


}


function create_teacher_icons(container, classes){
    let buttonContainer = create_element("section", container, "buttonMainSection");

    let createNoteVueButton = create_element("button", buttonContainer, "createNoteVueButton");
    createNoteVueButton.onclick = create_note_view;

    let createNoteIcon = create_element("img", createNoteVueButton, "createNoteIcon");
    createNoteIcon.src = "toto.png";

    create_class_select(buttonContainer, classes);
}


async function get_classes_name(role) {
    let params;

    if (role == "teacher"){
        params = {
            table : "teacher",
            type : "byId",
            id : userTypeId
        }
    } else if (role == "admin"){
        params = {
            table : "class",
            type : "all"
        }
    } else {
        params = {
            table : "student",
            type : "byId",
            id : userTypeId
        }
    }

    return axios.get("/info3/json/json.php", {
        params : params
    }).then( res => {
        let class_list = [];

        console.log(res.data);
        

        if (role == "student"){
            class_list = [res.data.class_name];
            
        } else {
            let classes_name = [];
            if (role == "teacher"){
                classes_name = res.data.class;
            } else {
                classes_name = res.data;
            }
            classes_name.forEach(c => {
                class_list.push(c.name);
            })
        }

        return class_list;
    });
}

function get_class_name(classes){
    let classOption = document.querySelector("#changeClassButton");
    let className;

    if (classOption == null){
        className = classes[0];
    } else {
        className = classOption.value;
    }
}

function create_class_select(container, classes){
    let classSelect = create_element("select", container, "changeClassButton");
        
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



function create_admin_icons(container, classes){
    create_teacher_icons(container, classes);

    let generateButton = create_element("button", container, "generateButtonMain");
    generateButton.onclick = create_generate_tt_view;
    
    let generateIcon = create_element("img", generateButton, "generateIconMain");
    generateIcon.src = "toto.png";

}