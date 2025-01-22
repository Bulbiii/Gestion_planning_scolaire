function create_element(type, parent, id, content=null){
    let element = document.createElement(type);
    element.id = id;
    parent.appendChild(element);

    // Check if content is given
    if (content != null){
        element.innerHTML = content;
    }

    return element;
}