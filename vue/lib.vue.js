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


async function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Récupère la session de l'utilisateur
async function get_session() {
    try {
        const response = await fetch('json/session_json.php');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erreur:', error);
        return null;
    }
}