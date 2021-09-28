// console.log('this is app.js');
showNotes();
// If user adds a note, add it to the localStorage
let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function(e) {
  let addTxt = document.getElementById("addTxt");
  let notes = localStorage.getItem("notes");
  let addTitle = document.getElementById("addTitle");
  let title = localStorage.getItem("title");
  if (notes === null && title === null)
{
  notesObj = [];
  titleObj = [];
}
else
{
    notesObj = JSON.parse(notes);
    titleObj = JSON.parse(title);
}
  
  notesObj.push(addTxt.value);
  titleObj.push(addTitle.value);
  localStorage.setItem("notes",JSON.stringify(notesObj));
  localStorage.setItem("title",JSON.stringify(titleObj));

  addTxt.value = "";
  addTitle.value = "";

  console.log(notesObj);
  console.log(titleObj);
  showNotes();
});

// function to show elements from localStorage
function showNotes() {
  let notes = localStorage.getItem("notes");
  let title = localStorage.getItem("title");
  if (notes === null && title === null)
{
    notesObj = [];
    titleObj = [];
}
else
{
    notesObj = JSON.parse(notes);
    titleObj = JSON.parse(title);
}

let html ="";
notesObj.forEach(function(element,index){

html = html + `
<div class="noteCard card mx-2 my-2" style="width: 18rem;">
<div class="card-body">
  <h5 class="card-title">${titleObj[index]}</h5> 
  <p class="card-text">${element}</p>
  <button id=${index} onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
</div>
</div>
`
  
});

let notesElm = document.getElementById('notes');
if(notesObj.length != 0 && titleObj.length !=0){
  notesElm.innerHTML = html;
}

else {
  notesElm.innerHTML = `Nothing to show!! use "Add a Note" section to buid a note`;
}

}

// function to delete elements from localStorage
function deleteNote(index){
  // console.log('I am deleting', index);
  titleObj.splice(index, 1);
  notesObj.splice(index, 1);
  localStorage.setItem("notes",JSON.stringify(notesObj));
  localStorage.setItem("title",JSON.stringify(titleObj));


  showNotes();
}




///sdncijnsdjc
let search = document.getElementById('searchTxt');
search.addEventListener("input", function(){

    let inputVal = search.value.toLowerCase();
    // console.log('Input event fired!', inputVal);
    let noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function(element){
      
      //searching by title keywords
        let titleTxt=element.getElementsByTagName("h5")[0].innerText;
      // searching by note keywords
        let cardTxt = element.getElementsByTagName("p")[0].innerText;
        if(cardTxt.includes(inputVal)){
            element.style.display = "block";
        }
       else if(titleTxt.includes(inputVal)){
          element.style.display = "block";
        }
        else{
            element.style.display = "none";
        }

    })
})



//Code to clear all notes

let clear = document.getElementById('clearBtn');
clear.addEventListener('click', function(){

  localStorage.clear();

  showNotes();
})

//code to fire the letters of "WELCOME TO MAGIC NOTES" one by one
const heading =document.getElementById('heading');
const str='WELCOME TO MAGIC NOTES';
let idx=1;
setInterval(write,200);
heading.addEventListener("load",write());
function write() {
  heading.innerText=str.slice(0,idx);
  idx++;
  if(idx>str.length){
    idx=1;
  }
}