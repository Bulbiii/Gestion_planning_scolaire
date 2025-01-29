function create_header(container){
    let header = create_element("header", container, "mainFrameHeader");

    create_date_info_header(header);

    create_user_info_header(header);
}


function create_date_info_header(container){
    // contain date's infos
    let dateInfoContainer = create_element("div", container, "dateInfoContainer");

    // start date
    create_element("p", dateInfoContainer, "startDateInfoHeader", "12/02/2024");

    // separator between dates
    create_element("p", dateInfoContainer, "separatorInfoContainer", "-")

    // end date
    create_element("p", dateInfoContainer, "endDateInfoHeader", "17/02/2024");

    // week number
    create_element("p", dateInfoContainer, "weekNumberInfoHeader", "Semaine 37");
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