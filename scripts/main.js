import { makeblock_Droppable } from './modules/drag-and-drop.js';
import { make_Moveable } from './modules/cb_moveable.js';
import { generate_Grid } from './modules/grid_draw.js';
import * as generates from './modules/generateLines.js';
import * as instructions from './modules/codeBlockInstructions.js';
import * as grids from './modules/grid_layout.js';
import * as url from './modules/pokemonurl.js';
window.addEventListener("load", eventWindowLoaded, false);
function eventWindowLoaded() {
    setTimeout(function(){
        document.getElementById('loader').style.display = 'none';
        document.getElementById('big-container').style.display='block';
        canvasApp();
    },1000);

    
}
function canvasSupport() {
    return !!document.createElement('canvas').getContext;
}
function canvasApp() {
    if (!canvasSupport()) { return; }


    // setting the canvas dimension
    const canvasWidth = 456;
    const canvasHeight = 480;

    let pokeUrl;
    let grid;
    let curLevel;
    let xpElement = document.getElementById('xp');
    if(localStorage.xp!=undefined){
         xpElement.innerHTML = localStorage.xp;
    }
    
    let nrpokeElement = document.getElementById('nrpoke');
    if(localStorage.xp!=undefined){
        nrpokeElement.innerHTML = localStorage.nrpoke;
   }


    let userNameElement = document.getElementById('user-name');
    localStorage.userName = localStorage.getItem('first-name');
    userNameElement.innerHTML = localStorage.userName;


    //setting up the  canvas

    let canvas = document.getElementById("canvas");
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    let context = canvas.getContext("2d");


    // draw the canvas
    function drawCanvas() {
        console.log('draw Canvas');
        context.clearRect(0, 0, canvasWidth, canvasHeight);
        generate_Grid(context, grid, pokeUrl);
    }

    //menu bar buttons
    const help_Button = document.getElementById('help-btn');
    const settng_Button = document.getElementById('settings-btn');
    const acnt_Button = document.getElementById('account-btn');

    help_Button.addEventListener('click',function(){
        comm_DialogBox('<div class="instructions">Catch the pokemon <br>' +
            'To program your Pokeball, you must drag and drop a series of commands in MAIN<br>'  +
            '<br><b style="color: lightgreen">move forward</b>: Makes the arrow move forward by one step' +
            '<br><br><b style="color: deepskyblue">turn left</b>: Rotates the pokeball left by 90 degrees' +
            '<br> <b style="color: deepskyblue">turn right</b>: Rotates the pokeball right by 90 degrees' +
            '<br> <b style="color: red">catch</b>: Catch the pokemon into the pokeball'+
            '<br><br><b style="color:blueviolet">procedure:</b>block of code made up of a set of steps that result in a single specific action '+
            '<br><br><b style="color: violet">repeat:</b> repeat a portion of commands a set number of times untill the process is complete'+
            '<br><br><b style="color: violet">end repeat:</b> ends the repeat command'+
            '<br><br><b> Conditional statements:</b> These statements check to see if certain situations are present and then perform some code if it is present.'+
            'The sequence of commands should look something like this <br><br><b style="color: darkorange">if wall:</b> if there is a wall then the pokeball should change its direction <br><b style="color: darkorange"> end if:</b> ends the if condition <br> <b style="color: darkorange">else:</b> what should the pokeball do if there is no wall  '+
            '<br><br>Once the commands are given in correct sequence click the "Run" button to see if you can catch the pokemon.</div>');
    });
    settng_Button.addEventListener('click',function(){

        settingsDialog('settings for the application (game reset, user info change, other settings');


    });
    acnt_Button.addEventListener('click',function(){
        comm_DialogBox('Hi Rishika Devaragatla Happy Learning');
    });
    function comm_DialogBox(msg){
        const commonDialog = document.getElementById('common-dialog');
        commonDialog.style.display = 'flex';
        const comm_Msg = document.getElementById('universal-content');
        comm_Msg.innerHTML = msg;
        const extDialogButton = document.getElementById('exit-dialog-btn');
        extDialogButton.addEventListener('click', function () {
            commonDialog.style.display = 'none';
        });
    }
    function settingsDialog(msg){
        const settDialog = document.getElementById('settings-dialog');
        settDialog.style.display = 'flex';
        const extDialogButton = document.getElementById('exit-dialog-setng');
        extDialogButton.addEventListener('click', function () {
            settDialog.style.display = 'none';
        });

        const resetgame = document.getElementById('reset-game');
        resetgame.addEventListener('click', function (){
            localStorage.removeItem('level');
            localStorage.removeItem('xp');
            localStorage.removeItem('nrpoke');
            location.reload();
            settDialog.style.display = 'none';

        });



    }


    //Code editor action buttons
    const runButton = document.getElementById('run');
    runButton.addEventListener('click', function () {
        runButton.disabled = true;
        runButton.classList.add('disabled');
        // runBtn.children[1].innerHTML = 'running';
        // runBtn.children[0].src = 'images/pause.svg';
        runMainFunction(0);
    });

    const resetButton = document.getElementById('reset');
    resetButton.addEventListener('click', reset);



    //code blocks for instructions

    function executeForward() {
        instructions.forward(grid);
        generate_Grid(context, grid, pokeUrl);
    }

    function executeLeft() {
        instructions.turnLeft(grid);
        generate_Grid(context, grid, pokeUrl);

    }
    function executeRight() {
        instructions.turnRight(grid);
        generate_Grid(context, grid, pokeUrl);

    }

    function executeIfWall(isMain){

        let numOfInsIfblock = 1;
        if(isMain){
            main_idx++
            let i = main_idx;
            while (getInstruction(i) !== 'endif') {
                numOfInsIfblock++;
                i++;
            }
        }else{
            proc_idx++
            let i = proc_idx;
            while (getProcInstruction(i) !== 'endif') {
                numOfInsIfblock++;
                i++;
            }
        }

        for(let j = main_idx; j < numOfInsIfblock; j++){
            if(isMain){
                executeInstructn(getInstruction(j));
            }else{
                executeInstructn(getProcInstruction(j));
            }
        }

        main_idx = main_idx + numOfInsIfblock - 1;
        generate_Grid(context, grid, pokeUrl);
    }
    function executeRepeat(isMain) {
        //console.log('execute repeat')
        let item = document.getElementById("loop-count")
        let count = Number(item.innerHTML);

        console.log("count - " +count)

        let numOfInsInRepeat = 1;

        if(isMain){
            console.log(isMain)
            main_idx++
            let i = main_idx;
            while (getInstruction(i) !== 'endrepeat') {
                numOfInsInRepeat++;
                i++;
            }
        }else{
            console.log("in else")
            proc_idx++
            let i = proc_idx;
            console.log(proc_idx)
            while (getProcInstruction(i) !== 'endrepeat') {
                console.log("not end repeat")
                numOfInsInRepeat++;
                console.log("number of instances in while"+numOfInsInRepeat)
                i++;
                console.log("i=" +i)
            }
        }
        console.log("number of instances inrepeat"+numOfInsInRepeat)

        let idx = null;
        if(isMain) idx = main_idx; else idx = proc_idx;
        for (let i = 0; i < count; i++) {
            for(let j = idx; j < numOfInsInRepeat+idx; j++){
                if(isMain){

                    executeInstructn(getInstruction(j));

                }else{
                    executeInstructn(getProcInstruction(j));
                }
            }
        }

        main_idx = main_idx + numOfInsInRepeat - 1;
        generate_Grid(context, grid, pokeUrl);
    }

    function sleep(milliseconds) {
        const date = Date.now();
        let currentDate = null;
        do {
            currentDate = Date.now();
        } while (currentDate - date < milliseconds);
    }

    function executeCatch() {
        let success = instructions.collectpoke(grid);
        generate_Grid(context, grid, pokeUrl);
        if (success == true) {
            if(localStorage.level===undefined){
                localStorage.level=0;
                localStorage.nrpoke=0;
                localStorage.xp=0;
            }
            if (localStorage.nrpoke <= curLevel) {
                localStorage.nrpoke = Number(localStorage.nrpoke) + 1;
                nrpokeElement.innerHTML = localStorage.nrpoke;
                nextLevel(curLevel+1);
            }
            else{
                instructions.generateMsg('info', 'You already have this pokemon.');
            }
            nrpokeElement.innerHTML = localStorage.nrpoke;

            if (localStorage.level <= curLevel) {
                localStorage.level = Number(localStorage.level) + 1;
                localStorage.xp = Number(localStorage.xp) + (Number(localStorage.level)*20+20);
                xpElement.innerHTML = localStorage.xp;
                progress(localStorage.level);
            }
            
        }
        else {
            instructions.generateMsg('warning', 'Try again!');
        }

    }


    //event handling for the action buttons
    function activateRunButton(){
        runButton.disabled = false;
        runButton.classList.remove('disabled');
    }
    function reset() {
        grid = grids.getGrid(curLevel);
        drawCanvas();
        activateRunButton();
        main_idx = 0;

    }
    function generateProgressIndicator(){
        let tot_levels =10;
        let lev_Indicator = document.getElementById('level-progress-indicator')
        for(let i=1;i<=tot_levels;i++){
            let progbar = document.createElement('div');
            progbar.classList.add('level');
            let nrlev = document.createElement('span');
            nrlev.innerHTML = i;
            progbar.appendChild(nrlev);
            lev_Indicator.appendChild(progbar);
        }
        let tail = document.createElement('div');
        tail.classList.add('tail');
        lev_Indicator.lastChild.appendChild(tail);
    }
    generateProgressIndicator();
    function progress(cmpltedLevels){
        let lev_Indicator = document.getElementById('level-progress-indicator');
        for(let i=0;i<=cmpltedLevels;i++){
                lev_Indicator.children[i].classList.add('level-active');
                lev_Indicator.children[i].firstChild.addEventListener('click', function(){
                    gotoLevel(i);
                });
        }
    }
    function executeInstructn(ins, isMain) {
        console.log("ins - " +ins)
        switch (ins) {
            case 'forward':
                executeForward();
                break;
            case 'left':
                executeLeft();
                break;
            case 'right':
                executeRight();
                break;
            case 'catch':
                executeCatch();
                break;
            case 'procedure':
                executeProcedure();
                break;
            case 'repeat':
                executeRepeat(isMain);
                break;
            case 'ifwall':
                executeIfWall(isMain);
                break;
        }
    }

    let proc_idx = 0;
    function executeProcedure() {
        const procCodeContainer = document.getElementById('procedure-code-container');
        const numOfLines = procCodeContainer.childElementCount;
        console.log("procedures - " +numOfLines)
        executeInstructn(getProcInstruction(proc_idx), false);
        proc_idx++;
        if (proc_idx < numOfLines) {
            setTimeout(executeProcedure, 1000);
        }
        else {
            proc_idx = 0;
        }
    }

    function getProcInstruction(jdx){
        const procedureContainer = document.getElementById('procedure-code-container');
        const numberOfLines = procedureContainer.childElementCount;
        let instruction;
        let codeBlock = procedureContainer.children[jdx].firstChild.firstChild;
        if (codeBlock) {
            instruction = codeBlock.dataset.instruction;
        }

        return instruction;
    }

    let main_idx = 0;
    function runMainFunction() {

        const mainCodeContainr = document.getElementById('main-code-container');
        const numOfLines = mainCodeContainr.childElementCount;
        console.log("children - " +numOfLines)
        executeInstructn(getInstruction(main_idx), true);
        main_idx++;
        if (main_idx < numOfLines) {
            setTimeout(runMainFunction, 1000);
        }
        else {
            main_idx = 0;
        }
    }
    // m_idx is idx for main

    function getInstruction(m_idx) {
        const mainCodeContainer = document.getElementById('main-code-container');
        const numberOfLines = mainCodeContainer.childElementCount;
        let instruction;
        let codeBlock = mainCodeContainer.children[m_idx].firstChild.firstChild;
        if (codeBlock) {
            instruction = codeBlock.dataset.instruction;
        }

        return instruction
    }



    function gotoLevel(lv) {
        switch (lv) {
            case 0:
                level0();
                break;
            case 1:
                level1();
                break;
            case 2:
                level2();
                break;
            case 3:
                level3();
                break;
            case 4:
                level4();
                break;
            case 5:
                level5();
                break;
            case 6:
                level6();
                break;
            case 7:
                level7();
                break;
            case 8:
                level8();
                break;
            case 9:
                level9();
                break;
        }
    }
    function nextLvlDialog(levelNumber, pokeName, pokeUrl) {
        if(levelNumber<=9) {
            const pokeimg = document.getElementById('poke-img');
            pokeimg.src = pokeUrl;
            const pokename = document.getElementById('poke-name');
            pokename.innerHTML = pokeName;
            const pokepower = document.getElementById('poke-power');
            pokepower.innerHTML = (levelNumber + 1) * 20 + 20 + 'xp';
        }
        else{
            const pokeimg = document.getElementById('poke-col');
            pokeUrl="./images/pokemons/result.svg"
            pokeimg.src = pokeUrl;

            const pokepower = document.getElementById('poke-power');
            pokepower.innerHTML = (levelNumber + 1) * 20 + 20 + 'xp';

        }
    }
    function nextLevel(lv) {
        if(lv<=9) {
            const levelDialog = document.getElementById('next-level-dialog');
            levelDialog.style.display = 'flex';
            const okNextBtn = document.getElementById('continue-level');
            okNextBtn.addEventListener('click', function () {
                levelDialog.style.display = 'none';
                setTimeout(function () {
                    gotoLevel(lv);
                }, 2000);
            });
            const cancelNextBtn = document.getElementById('resume-level');
            cancelNextBtn.addEventListener('click', function () {
                levelDialog.style.display = 'none';
                reset();
            });
        }
        else{
            const levelDialog = document.getElementById('last-level-dialog');
            levelDialog.style.display = 'flex';
            const resetgame = document.getElementById('resetgame');

                resetgame.addEventListener('click', function (){
                    localStorage.removeItem('level');
                    localStorage.removeItem('xp');
                    localStorage.removeItem('nrpoke');
                    location.reload();
                    comm_DialogBox.style.display = 'none';
            });


        }
    }
    function level(levelNumber, pokeName, mainLines, procLines) {
        grid = grids.getGrid(levelNumber);
        pokeUrl = url.getPokeUrl(pokeName);
        drawCanvas();
        curLevel = levelNumber;
        progress(localStorage.level);
        activateRunButton();
        generates.codeEditorLines(mainLines, procLines);
        nextLvlDialog(levelNumber, pokeName, pokeUrl);
        makeblock_Droppable();

    }
    function level0() {

        level(0, 'pikachu', 3, 0);

    }
    function level1() {
        level(1, 'rattata', 4, 0);
    }
    function level2() {

        instructions.generateMsg('levels_info', 'You should use "procedure {}" for this level.');

        level(2, 'snorlax', 1, 5);

    }
    function level3() {
        instructions.generateMsg('levels_info', 'You should use "repeat" for this level.');

        level(3, 'caterpie', 4, 0);

    }
    function level4() {
        instructions.generateMsg('levels_info', '"repeat" can have more than one statement in this level.');

        level(4, 'bullbasaur', 6, 0);

    }
    function level5() {
        instructions.generateMsg('levels_info', 'You should use "if wall" for this level. Make sure you utilise all the lines');

        level(5, 'charmander', 8, 0);

    }
    function level6() {
        instructions.generateMsg('levels_info', 'You should use "if wall - else" and "repeat" for this level.');
        level(6, 'squirtle', 10, 0);


    }
    function level7() {
        instructions.generateMsg('levels_info', 'You should use "if-wall and procedure {} for this level');
        level(7, 'jigglypuff', 1, 8);

    }
    function level8() {
        instructions.generateMsg('levels_info', 'You should use "repeat" and "procedure {}" for this level.');

        level(8, 'meowth', 2, 4);

    }
    function level9() {
        instructions.generateMsg('levels_info', 'You should use all the concepts you have learnt to complete this level. All the best!!');
        level(9, 'eevee', 2, 12);

    }
    level0();
    drawCanvas();
}
