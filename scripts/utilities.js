 function incValue(item) {
    let val = Number(item.innerHTML);
    if (val < 5) {
        val++;
        item.innerHTML = val;

    }
    if (val >= 5) {
        val = 1;
        item.innerHTML = val;
    }
}
function displayMenu(elem) {
    let optionmenu = elem.nextElementSibling;
    optionmenu.style.display = 'flex';

}
function selectedOption(elem) {
    let optionmenu = elem.parentNode;
    let sibling = elem.parentNode.previousElementSibling;
    let arrow = sibling.lastElementChild;
    let textvalue = sibling.firstElementChild;
    textvalue.innerHTML = elem.innerHTML;
    optionmenu.parentNode.dataset.instruction = elem.innerHTML;
    optionmenu.style.display = 'none';
}
function switchCodePanel(e, panelId) {
    let panels, tablinks;
    // Get all elements with class="code-panel" and hide them
    panels = document.getElementsByClassName("codeblock-panel");
    for (let i = 0; i < panels.length; i++) {
        panels[i].style.display = "none";
    }
    // Get all elements with class="tablinks" and remove the class "link-active"
    tablinks = document.getElementsByClassName("tablinks");
    for (let i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" link-active", "");
    }
    // Show the current panel, and add an "link-active" class to the button that opened the tab
    document.getElementById(panelId).style.display = "flex";
    e.currentTarget.className += " link-active";
}

function checknameAnswer() {
        let x= document.getElementById("stringname");
    document.getElementById("name").disabled = false;
    buttonclr(x);
    x.disabled=true;
}
 function checknamewrong() {
     document.getElementById("name").disabled = true;

     document.getElementById("wrong").removeAttribute('hidden')
 }

 function checkageans() {
     let x= document.getElementById("numberage");
     document.getElementById("age").disabled = false;
     buttonclr(x);
     x.disabled=true;
 }
 function checkagewrong() {
     document.getElementById("name").disabled = true;

     document.getElementById("wrongage").removeAttribute('hidden')
 }
 function checkboolans() {
     let x= document.getElementById("booleanbool");
     buttonclr(x);
     x.disabled=true;
 }
 function checkboolwrong() {
     document.getElementById("wrongbool").removeAttribute('hidden')
 }

function buttonclr(item){
    item.style.backgroundColor='#999';
    item.boxShadow='#999';

}
 function storeName() {
    let username=document.forms["form"]["name"].value;
    let userage=document.getElementById("age").value;

    if(username=="")
    {
        alert("Please enter your name");
    }
     else if(userage <=0 || userage >= 100||isNaN(userage))
    {
        alert("enter a valid age");
    }
     else {
        let firstname = document.getElementById('name').value;

        localStorage.setItem('first-name', firstname);
        const startgame = document.getElementById('lets-start');
        window.location.href = 'game.html';
    }
 }
 function getinstructions(){

         instructionsDialog('<div class="instructions">Catch the pokemon <br>' +
             'To program your Pokeball, you must drag and drop a series of commands in MAIN<br>'  +
             '<br><b style="color: lightgreen">move forward</b>: Makes the arrow move forward by one step' +
             '<br><br><b style="color: deepskyblue">turn left</b>: Rotates the pokeball left by 90 degrees' +
             '<br></br> <b style="color: deepskyblue">turn right</b>: Rotates the pokeball right by 90 degrees' +
             '<br></br> <b style="color: red">catch</b>: Catch the pokemon into the pokeball'+
             '<br><br><b style="color:blueviolet">procedure:</b>block of code made up of a set of steps that result in a single specific action '+
             '<br><br><b style="color: violet">repeat:</b> repeat a portion of commands a set number of times untill the process is complete'+
             '<br><br><b style="color: violet">end repeat:</b> ends the repeat command'+
             '<br><br><b> Conditional statements:</b> These statements check to see if certain situations are present and then perform some code if it is present.'+
             'The sequence of commands should look something like this <br><br><b style="color: darkorange">if wall:</b> if there is a wall then the pokeball should change its direction <br><b style="color: darkorange"> end if:</b> ends the if condition <br> <b style="color: darkorange">else:</b> what should the pokeball do if there is no wall  '+
             '<br><br>Once the commands are given in correct sequence click the "Run" button to see if you can catch the pokemon.</div>');

}


 function instructionsDialog(msg){
     const instructionsDialog = document.getElementById('instructions-dialog');
     instructionsDialog.style.display = 'flex';
     const instructionsMsg = document.getElementById('instructions-content');
     instructionsMsg.innerHTML = msg;
     const exitDialogBtn = document.getElementById('exit-dialog-btn-ins');
     exitDialogBtn.addEventListener('click', function () {
         instructionsDialog.style.display = 'none';
     });
 }




