function create_header(container){
    let header = document.querySelector("#mainFrameHeader");

    if (header == null){
        header = create_element("header", container, "mainFrameHeader");
    } else{
        header.innerHTML = "";
    }

    create_date_info_header(header);

    create_week_info_header(header);

    create_user_info_header(header);
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



function create_user_info_header(container){
    // contain user's info
    let userInfoContainer = create_element("div", container, "userInfoContainer");

    // user's class
    create_element("p", userInfoContainer, "classInfoHeader", "4B");

    // user's name
    create_element("p", userInfoContainer, "nameInfoHeader", "Toto");

    // user's profil
    create_element("p", userInfoContainer, "profilInfoHeader", "profil");
}