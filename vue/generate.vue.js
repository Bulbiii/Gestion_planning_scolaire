function create_generate_tt_view(){
    let container = document.querySelector("body");
    container.innerHTML = "";

    create_generate_header(container);

    create_tt(container);

    create_generate_footer(container);
}

function create_generate_header(container){
    let header = create_element("header", container, "generateHeader");

    let homeButton = create_element("button", header, "homeButtonHeader");
    homeButton.onclick = create_main_vue;

    let homeIcon = create_element("img", homeButton, "homeButtonIconHeader");
    homeIcon.src = "/info3/vue/style/img/maison.png";
}

function create_generate_footer(container){
    let footer = create_element("footer", container, "generateFooter");
    
    let generateButton = create_element("button", footer, "generateButton");
    generateButton.onclick = generate_tt;

    let generateIcon = create_element("img", generateButton, "generateIcon");
    generateIcon.src = "/info3/vue/style/img/chargement.png";

}


function generate_tt(){
    let data = get_data_from_xlsx("/info3/Lycée privé Aurealys.xlsx");
    let generated_tt = generate_timetable_v1(data);

    let correct_tt = generated_tt_to_correct_tt(generated_tt);

    create_generate_tt_view()

    add_courses(correct_tt, move_course);
    
}


function generated_tt_to_correct_tt(tt){
    let correct_tt = {};

    for (day in tt){
        correct_tt[day] = {}
        for (time in tt[day]){
            if (tt[day][time] != "pas de cours"){
                correct_tt[day][time] = {id : 1, title : tt[day][time]};
            }
        }
    }

    return correct_tt;
}


function move_course() {
    
    
    let cells = document.querySelectorAll(".centerCell");
    
    if (this.classList.contains("isMoved")){
        this.classList.remove("isMoved");
        
        remove_highlight(cells);
        enable_cells(cells)
    } else {
        this.classList.add("isMoved");
        
        console.log("toto");
        disable_unavailable_cells(cells, this.id); // disable anavailable cells except the selected one
        highlight_available_cells(cells);
    }
}

function disable_unavailable_cells(cells, id){
    cells.forEach(cell => {
        if (cell.innerHTML != "" && cell.id != id){
            cell.disabled = true;
        }
    });
}

function enable_cells(cells){
    cells.forEach(cell => {
        if (cell.innerHTML != ""){
            cell.disabled = false;
            cell.onclick = move_course;
        }
    });
}

function highlight_available_cells(cells){
    cells.forEach(cell => {
        if (cell.innerHTML == ""){
            cell.disabled = false;
            cell.classList.add("highlight");
            cell.onclick = accept_course_movement;
        }
    });
}

function remove_highlight(cells){
    cells.forEach(cell => {
        if (cell.innerHTML == ""){
            cell.disabled = true;
            cell.classList.remove("highlight");
            cell.onclick = null;
        }
    });
}

function accept_course_movement(){
    let cells = document.querySelectorAll(".centerCell");

    let former_cell = get_moving_course(cells);
    
    this.innerHTML = former_cell.innerHTML;
    this.classList.add("courseCell");

    former_cell.innerHTML = "";
    former_cell.classList.remove("courseCell");
    former_cell.classList.remove("isMoved");

    remove_highlight(cells);
    enable_cells(cells);
}


function get_moving_course(cells){
    let moving_cell = null;
    let i = 0;
    while (i < cells.length && moving_cell == null){
        let cell = cells[i];
        console.log("titi");
        
        if (cell.innerHTML != "" && ! cell.disabled){
            console.log("toto");
            
            moving_cell = cell;
        }

        i++;
    }

    return moving_cell;
}