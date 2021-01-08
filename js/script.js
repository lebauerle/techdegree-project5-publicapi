//variables for gallery and cards
const gallery = document.getElementById('gallery');
const card = document.getElementsByClassName('card');


//API request fetching the data, US nationality, 12 results
//When the API respons the gallery is created, clickfunctionality is added and it is possible to create a modalcontainer
fetch("https://randomuser.me/api/?nat=us&results=12")
    .then(response => response.json())
    .then(data => {
        const employees = data.results
        employees.forEach((employee) => {
        createGallery(employee);
        modalCreate(employee);
        });
        clickEvents();
});

//function to create the gallery using template strings, the dynamic input is the matching data from the json object
function createGallery(data) {
    const galleryHTML = `               
        <div id="${data.name.first} ${data.name.last}" class="card">
            <div class="card-img-container">
                <img class="card-img" src="${data.picture.large}" alt="${data.name.first} ${data.name.last}">
            </div>
            <div class="card-info-container">
                <h3 id="name" class="card-name cap">${data.name.first} ${data.name.last}</h3>
                <p class="card-text">${data.email}</p>
                <p class="card-text cap">${data.location.city}, ${data.location.state}</p>
            </div>
        </div>`;
    //adding the gallary to the DOM
    gallery.insertAdjacentHTML('beforeend', galleryHTML);}

//function to create the modal container, creating a div, adding modal-container as className, adding to parent node
function modalCreate(data) { 
    const modalContainer = document.createElement('div');
    modalContainer.className = 'modal-container' 
    gallery.appendChild(modalContainer);
        //formating the birthday MM/DD/YYYY
        const birthYear = data.dob.date.slice(0,4);
        const birthMonth = data.dob.date.slice(5,7);
        const birthDay = data.dob.date.slice(8,10);
        const wholeBD = `${birthMonth}/${birthDay}/${birthYear}`
    //using template strings to create the HTML for the modal container, with dynamic data from the json
    const modal = 
    `<div class="modal">
        <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
        <div class="modal-info-container">
            <img class="modal-img" src="${data.picture.large}" alt="${data.name.first}">
            <h3 id="name" class="modal-name cap">${data.name.title} ${data.name.first} ${data.name.last}</h3>
            <p class="modal-text">${data.email}</p>
            <p class="modal-text cap">${data.location.city}</p>
            <hr>
            <p class="modal-text">${data.cell.slice(0,5)} ${data.cell.slice(6)}</p>
            <p class="modal-text">${data.location.street.number} ${data.location.street.name}, ${data.location.city}, ${data.location.state} ${data.location.postcode}</p>
            <p class="modal-text">Birthday: ${wholeBD}</p>
        </div>
    </div>`

//adding to the DOM, setting display to none
modalContainer.insertAdjacentHTML('beforeend', modal)
modalContainer.style.display = 'none';
}

//adding click functionality to make the modal Div appear and disappear using the close button
function clickEvents(){
        const modalDiv = document.getElementsByClassName('modal-container');
        const closeBtn = document.getElementsByClassName('modal-close-btn');
        //looping through the cards, add eventlisteners with click function to show the selected modalDiv + close button
        for (let i = 0; i < card.length; i++) {
            card[i].addEventListener('click', () => {
            modalDiv[i].style.display = 'block';
            });
            //event listener to close button that sets the modalDivs display to none to make it disapear
            closeBtn[i].addEventListener('click', (event) => {
                modalDiv[i].style.display = 'none';
            });
}};