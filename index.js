const baseURL='https://fsa-crud-2aa9294fe819.herokuapp.com/api/2109-CPU-RM-WEB-PT/events';


async function logAsync (func){
    const result = await func();
    console.log(result);
}
//display all the parties using a fetch command
async function getEvent (){
    const response = await fetch(`${baseURL}`); //create a response variable to fetch the data from url
    const json = await response.json(); //we wait for the response from json before moving forward with the code

    if(!json.success){      //if the json is not successful
        throw new Error(json.error);    //then throw an error to let us know
    }
    return json.data;   //if we did receive then we would return this 
}
logAsync(getEvent);    //this will invoke the function

//create a party


//render party to broswer 
function addEventToScreen(r){
const eventElement = document.querySelector('events'); //gets information from the document for the events
const elem = document.createElement('div');
elem.classList.add('event')

const idElem = document.querySelector('div');
idElem.classList.add('id');
idElem.append(r.id);

const nameElem = document.querySelector('div');
nameElem.classList.add('name');
nameElem.append(r.id);

const dateElem = document.querySelector('div');
dateElem.classList.add('date');
dateElem.append(r.date);

const locationElem = document.querySelector('div');
locationElem.classList.add('location');
locationElem.append(r.location);

const descriptionElem = document.querySelector('div');
descriptionElem.classList.add('description');
descriptionElem.append(r.description)

const cohortIdElem =document.querySelector('div');
cohortIdElem.classList.add('cohortId');
cohortIdElem.append(r.cohortId);

elem.append(idElem);
elem.append(nameElem);
elem.append(dateElem);
elem.append(locationElem);
elem.append(cohortIdElem);
elem.append(descriptionElem);

eventElement.append(elem);
}

document.addEventListener('DOMContentLoaded', async ()=> {
    const events = await getEvent();
events.forEach(r => {
    addEventToScreen(r);
});

const form = document.querySelector('eventForm');
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
})
});

//create a delete button to remove a party from the list 

//Dynamically have button add p parties created in the form

// 