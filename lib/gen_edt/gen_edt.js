/**
 * Fonction qui traduit un fichier exels (format: xlsx) vers json (maquette)
 * 
 * @argument {string} path_to_file chemin vers le fichier xlsx (alias un fichier exel)
 * @returns maquette sous format json
 */
function get_data_from_xlsx(path_to_file) {
    // TODO: Lire le fichier et le traduire
    console.log("La maquette pédagogique est chargé");
    return {
        semaine: ["lundi", "mardi", "mercredi", "jeudi", "vendredi"],

        heure_debut_journee: 8,
        heure_fin_journee: 17,

        cours: {
            maths: {
                durée: 3,
                nombre_cours: 4
            },

            francais: {
                durée: 2,
                nombre_cours: 3
            },

            anglais: {
                durée: 1,
                nombre_cours: 6
            },

            informatique: {
                durée: 4,
                nombre_cours: 3
            },
        }
    };
}

/**
 * Fonction qui genere basiquement un emploie du temps
 * On place les cours dans un ordre aleatoire jusqua ce qu'ils soient tous placer. 
 * 
 * @param {JSON} data json contenant la maquette
 * @returns {JSON} emploie du temps avec tout les cours de placer
 */
function generate_timetable_v1(data) {
    let edt = {}; // Emploi du temps

    let semaine = data.semaine;
    let cours = data.cours;

    for (let j in semaine) {
        const d = semaine[j]; // Jour de la semaine

        let h = data.heure_debut_journee;
        while (h <= data.heure_fin_journee) {
            const courKey = get_random_cour(cours); // Obtenir un cours disponible
           
            if (!edt[d]) edt[d] = {}; // Initialiser le jour s'il n'existe pas

            if (courKey) {
                const courData = cours[courKey];

                // Vérifier si le cours peut être placé entièrement
                if (h + courData.durée <= data.heure_fin_journee) {
                    for (let i = 0; i < courData.durée; i++) {
                        edt[d][h] = courKey; // Assigner le nom du cours
                        h++;
                    }
                    cours[courKey].nombre_cours--; // Décrémenter le nombre de cours restants
                } else {
                    edt[d][h] = "pas de cours"; // Si le cours dépasse, on met "pas de cours"
                    h++;
                }
            } else {
                edt[d][h] = "pas de cours"; // S'il n'y a plus de cours disponibles
                h++;
            }
        }
    }

    return edt;
}

/**
 * Fonction qui retourn un cour aleatoire parmis d'autres
 * @param {JSON} cours 
 * @returns un cours aleatoire
 */
function get_random_cour(cours) {
    const keys = Object.keys(cours);
    
    // Filtrer les cours qui ont encore des créneaux disponibles
    const availableCourses = keys.filter(key => cours[key].nombre_cours > 0);

    if (availableCourses.length === 0) {
        return null; // Aucun cours disponible
    }

    return availableCourses[Math.floor(Math.random() * availableCourses.length)];
}

// const out = generate_timetable_v1(get_data_from_xlsx("hell"));
// console.log(out);


//const jourAleatoire = get_random_cour(get_data_from_xlsx("hello").cours);
//console.log(`Jour : ${jourAleatoire}`);