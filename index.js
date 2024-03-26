const baseURL='https://fsa-crud-2aa9294fe819.herokuapp.com/api/2109-CPU-RM-WEB-PT/events';
//the baseURl is used to communicate with the server to access the api 


async function logAsync (func){
    const result = await func();
    console.log(result);
}
const state ={
    events: [],
    messages: 'This object is n ot in the database!',
    isError: false
};

//display all the parties using a fetch command
async function getEvent (){
    const response = await fetch(`${baseURL}`); //create a response variable to fetch the data from url
    const json = await response.json(); //we wait for the response from json before moving forward with the code

    if(!json.success){      //if the json is not successful
        throw new Error(json.error);    //then throw an error to let us know
    }
  state.events = [...json.data];

render();  
}

//create a party


//render party to broswer 
function addEventToScreen(r){
const eventElement = document.getElementById('events'); //gets information from the document for the events
const elem = document.createElement('div');
elem.classList.add('event')
elem.setAttribute('data-id', r.id); //this will add an id to all the party elements from the html on the browser


const idElem = document.createElement('div');
idElem.classList.add('id');
idElem.append(r.id);

const nameElem = document.createElement('div');
nameElem.classList.add('name');
nameElem.append(r.id);

const dateElem = document.createElement('div');
dateElem.classList.add('date');
dateElem.append(r.date);

const locationElem = document.createElement('div');
locationElem.classList.add('location');
locationElem.append(r.location);

const descriptionElem = document.createElement('div');
descriptionElem.classList.add('description');
descriptionElem.append(r.description)

const cohortIdElem =document.createElement('div');
cohortIdElem.classList.add('cohortId');
cohortIdElem.append(r.cohortId);

const delButtonElm = document.createElement('button') //we created a button that we can now use
const buttonText =document.createElement('Delete');  //We will create a text node, 
delButtonElm.appendChild(buttonText); //this gives the delete button text to show that they have 

delButtonElem.addEventListener('click', async (done) => {
    const selectedEvent = done.target.closets('.event');
    const id = selectedEvent.dataset.id;
    const result = await deleteEvent(id)
})

elem.append(idElem);
elem.append(nameElem);
elem.append(dateElem);
elem.append(locationElem);
elem.append(cohortIdElem);
elem.append(descriptionElem);
elem.append(delButtonElem);

eventElement.append(elem);
}

//eventElement.append(elem);

const form = document.getElementById('eventForm');
form.addEventListener('submit', async(event) =>{
    event.preventDefault();

    const id=document.getElement('id');
    const name = document.getElement('name');
    const location = document.getElement('location');
    const date = document.getElement('date');
    const description = document.getElement('description');
    const cohortId = document.getElement('cohortId');

    const party ={
        id: id.value,
        name:name.value,
        description:description.value,
        date:date.value,
        location:location.value,
        cohortId:cohortId.value
    };
    try{
        const newEvent = await createEvent(party);

        addEventToScreen(newEvent);
    }catch(err){
        console.log(err);
    }
});


//create a delete button to remove a party from the list 
//every button needs an event listener and needs a refrence to the html and give it a call back function to give it some functionality
function render(){
    state.events.forEach((r) => {
        addEventToScreen(r);
    });
}
async function init(){
    await getEvent();
}
init();

async function deleteEvent(id){
    try {
        const response = await fetch(`${baseURL}${id}`, {
            method: 'delete',
        })
    }
}
init()
//Dynamically have button add p parties created in the form

// the changes that we made content loaded - i do not want to trigger the event