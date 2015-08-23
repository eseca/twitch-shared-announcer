var schedules = [
{ 
    'type': 'twitch',
    'image': '',
    'title': 'Krankes_Hirn',
    'description': 'Miércoles y Jueves, 10pm GMT-5'
},
{ 
    'type': 'youtube',
    'image': '',
    'title': 'El gordo criticón',
    'description': 'Video ensayos sobre videojuegos'
},
{ 
    'type': 'twitch',
    'image': '',
    'title': 'LTPhantom',
    'description': 'Lunes, Martes, ~10pm GMT-5'
},
]

var typeContainer = document.getElementById('type');
var titleContainer = document.getElementById('reminderTitle');
var descContainer = document.getElementById('reminderDescription');


var c = 0;
function displayHUD() {
    console.log('displayHUD');

    typeContainer.innerHTML = schedules[c].type;
    titleContainer.innerHTML = schedules[c].title;
    descContainer.innerHTML = schedules[c].description;

    e = document.getElementById('reminderContainer');

    // -> removing the class
    e.classList.remove("reminderContainer");

    // -> triggering reflow /* The actual magic */
    // without this it wouldn't work. Try uncommenting the line and the transition won't be retriggered.
    e.offsetWidth = e.offsetWidth;

    // -> and re-adding the class
    e.classList.add("reminderContainer");

    c = (c + 1) % schedules.length;
}

// FIXME: This is kind of noob
displayHUD();

window.setInterval(displayHUD, 15000);

