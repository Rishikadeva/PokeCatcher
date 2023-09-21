//directions of the arrow
const NORTH = 3;
const EAST = 4;
const SOUTH = 5
const WEST = 6;
//directions of the pokemon on the grid
const N_POKE = 7;
const E_POKE = 8;
const S_POKE = 9;
const W_POKE = 10;

export function generateMsg(msg_tip, msg) {
    let msg_Box = document.createElement('div');
    msg_Box.classList.add('msg-box');
    let remove_msg = document.createElement('div');
    remove_msg.classList.add('msg-remover');
    remove_msg.innerHTML = '&times;';
    switch (msg_tip) {
        case 'error':
            msg = 'Whoops. ' + msg;
            msg_Box.style.backgroundColor = '#FF6A75';
            remove_msg.style.backgroundColor = '#FF4F5E';
            break;
        case 'warning':
            msg = 'Sorry. ' + msg;
            msg_Box.style.backgroundColor = '#FFEA80';
            remove_msg.style.backgroundColor = '#FFD567';
            break;
        case 'success':
            msg = 'Great! ' + msg;
            msg_Box.style.backgroundColor = '#3FE1B0';
            remove_msg.style.backgroundColor = '#2AC3A2';
            break;
        case 'info':
            msg = 'Info. ' + msg;
            msg_Box.style.backgroundColor = '#0060DF';
            msg_Box.style.color = '#FFF';
            remove_msg.style.backgroundColor = '#0B4CAA';
            break;
        case 'levels_info':
            msg = 'Hint. ' + msg;
            msg_Box.style.backgroundColor = '#0000FF';
            msg_Box.style.color = '#FFF';
            remove_msg.style.backgroundColor = '#0000CD';
            break;

    }
    msg_Box.innerHTML = msg;
    msg_Box.appendChild(remove_msg);
    document.body.appendChild(msg_Box);
    remove_msg.addEventListener('click', function () {
        msg_Box.classList.add('msg-box-close');
    });
    setInterval(function () {
        msg_Box.classList.add('msg-box-close');
    }, 5000);
    setInterval(function () {
        msg_Box.remove();
    }, 6000);

}
export function forward(grid) {
    console.log('execute forward code block');
    const nrRows = grid.length;
    const nrColumns = grid[0].length;
    let x, y;
    let direction;
    for (let r = 0; r < nrRows; r++) {
        for (let c = 0; c < nrColumns; c++) {
            let d = grid[r][c];
            if (d == 3 || d == 5 || d == 4 || d == 6 || d == 7 || d == 8 || d == 9 || d == 10) {
                y = r;
                x = c;
                direction = d;
            }
        }
    }

    switch (direction) {
        case NORTH:
            moveArrow(grid, y, x, y-1, x, NORTH, N_POKE);
            break;
        case N_POKE:
            crossedPoke(grid, y, x, y-1, x, NORTH);
            break;
        case SOUTH:
            moveArrow(grid, y, x, y+1, x, SOUTH, S_POKE);
            break;
        case S_POKE:
            crossedPoke(grid, y, x, y+1, x, SOUTH);
            break;
        case EAST:
            moveArrow(grid, y, x, y, x+1, EAST, E_POKE);
            break;
        case E_POKE:
            crossedPoke(grid, y, x, y, x+1, EAST);
            break;
        case WEST:
            moveArrow(grid, y, x, y, x-1, WEST, W_POKE);
            break;
        case W_POKE:
            crossedPoke(grid, y, x, y, x-1, WEST);
            break;

    }

}
function checkObstacle(grid,x,y){
    const nrRows = grid.length;
    const nrColumns = grid[0].length;
     if (x < 0) {
         generateMsg('error', 'You have no cell in the left.');
    }
    else if (x >= nrColumns) {
        generateMsg('error', 'You have no cell in the right.');
    }
    else if (y >= nrRows) {
        generateMsg('error', 'You have no cell underneath.');
    }
    else if (y < 0) {
        generateMsg('error', 'You have no cell above.');
    }
    else if (grid[y][x] == 1) {
        generateMsg('error', 'You have a wall in front.');
    }
}
function crossedPoke(grid,r,c, y,x, dir){
    checkObstacle(grid,x,y);
    if (grid[y][x] == 0) {
        grid[r][c] = 2;
        grid[y][x] = dir;
        generateMsg('warning', 'You just missed Pokémon.');
    }
}
function moveArrow(grid,r,c, y,x, dir,pokedir){
    checkObstacle(grid,x,y);
    if (grid[y][x] == 0) {
        grid[r][c] = 0;
        grid[y][x] = dir;
    }
    else if (grid[y][x] == 2) {
        grid[r][c] = 0;
        grid[y][x] = pokedir;
    }
}
export function turnLeft(grid) {
    console.log('execute left');
    for (let r = 0; r < grid.length; r++) {
        var innerArrayLength = grid[r].length;
        for (let c = 0; c < innerArrayLength; c++) {
            let position = grid[r][c];
            function turn(pos){
                grid[r][c] = pos;
            }
            switch (position) {
                case NORTH:
                    turn(WEST);
                    break;
                case N_POKE:
                    turn(W_POKE);
                    break;
                case SOUTH:
                    turn(WEST)
                    break;
                case S_POKE:
                    turn(W_POKE);
                    break;
                case EAST:
                    turn(NORTH);
                    break;
                case E_POKE:
                    turn(N_POKE);
                    break;
                case WEST:
                    turn(SOUTH);
                    break;
                case W_POKE:
                    turn(S_POKE);
                    break;
        
            }
        }
    }
}
export function turnRight(grid) {
    console.log('execute right');
    for (let r = 0; r < grid.length; r++) {
        var innerArrayLength = grid[r].length;
        for (let c = 0; c < innerArrayLength; c++) {
            let position = grid[r][c];
            function turn(pos){
                grid[r][c] = pos;
            }
            switch (position) {
                case NORTH:
                    turn(EAST);
                    break;
                case N_POKE:
                    turn(E_POKE);
                    break;
                case SOUTH:
                    turn(EAST)
                    break;
                case S_POKE:
                    turn(E_POKE);
                    break;
                case EAST:
                    turn(NORTH);
                    break;
                case E_POKE:
                    turn(N_POKE);
                    break;
                case WEST:
                    turn(NORTH);
                    break;
                case W_POKE:
                    turn(N_POKE);
                    break;
        
            }
        }
    }
}
export function collectpoke(grid) {
    let success = 0;
    for (let r = 0; r < grid.length; r++) {
        var innerArrayLength = grid[r].length;
        for (let c = 0; c < innerArrayLength; c++) {
            if (grid[r][c] == 7 || grid[r][c] == 8 || grid[r][c] == 9 || grid[r][c] == 10) {
                grid[r][c] = 11;
                success = 1;
            }
        }
    }
    return success == 1;
}

