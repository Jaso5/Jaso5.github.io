const square_width = 100;
const real_width = 50;
var who = 0;

var canvas;
var ctx;

var grid = [
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,1,2,0,0,0],
    [0,0,0,2,1,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
];

function populate_board() {
    canvas = document.getElementById("board");
    ctx = canvas.getContext("2d");

    draw_grid();

    ctx.fillStyle = "brown"
    ctx.strokeStyle = "brown"

    for (let y = 0; y < 8; y++) {
        for (let x = 0; x < 8; x++) {
            draw_circle(x,y)
        }
    }
}

function draw_grid() {
    ctx.fillStyle = "white";
    let offset = 0;
    for (let y = 0; y < 8; y ++) {
        for (let x = offset; x < 8; x += 2) {
            ctx.fillRect(
                x * square_width,
                y * square_width,
                square_width,
                square_width,
            )
        }
        offset = (offset + 1) % 2;
    }
}

function handleClick(event) {
    let t = event.target.getBoundingClientRect();
    let pos = mouse_to_grid(event.clientX - t.left, event.clientY - t.top);

    if (!grid[pos[0]][pos[1]]) {
        if (validate_play(pos[0], pos[1], who + 1)) {
            grid[pos[0]][pos[1]] = who + 1;
            draw_circle(pos[0], pos[1]);

            who = (who + 1) % 2;
        }
    }

    let area = count();
    document.getElementById("red_area").innerText = area[0];
    document.getElementById("white_area").innerText = area[1];
}

function mouse_to_grid(x, y) {
    return [
        (x - (x % real_width)) / 50,
        (y - (y % real_width)) / 50,
    ]
}

function draw_circle(x, y) {
    ctx.beginPath();
    ctx.arc(
        (x * square_width) + (square_width / 2),
        (y * square_width) + (square_width / 2),
        square_width / 2,
        0,
        Math.PI * 2
    );
    ctx.closePath();
    if (grid[x][y] == 1) {
        ctx.fill()
    } else if (grid[x][y] == 2) {
        // I hate this code
        if (((x % 2) + (y % 2)) % 2 == 0) {
            ctx.fillStyle = "white"
        } else {
            ctx.fillStyle = "blanchedalmond"
        }

        ctx.fillRect(
            x * square_width,
            y * square_width,
            square_width,
            square_width,
            )
        ctx.fillStyle = "Brown"
        ctx.stroke()
    }
}

function validate_play(x, y, target) {
    let right = cast(target, 1, 0, x, y);
    let left = cast(target, -1, 0, x, y);
    let up = cast(target, 0, -1, x, y);
    let down = cast(target, 0, 1, x, y);
    let ne = cast(target, 1, 1, x, y);
    let se = cast(target, -1, -1, x, y);
    let sw = cast(target, 1, -1, x, y);
    let nw = cast(target, -1, 1, x, y);
    
    let res = up || down || left || right || ne || se || sw || nw;

    if (
        res
    ) {
        grid[x][y] = target;
        draw_circle(x, y);
    }

    return res
}

function cast(target, delta_x, delta_y, x, y) {
    if ((x == 0 && delta_x == -1) || (x == 7 && delta_x == 1)) {
        return false
    }
    if ((y == 0 && delta_y == -1) || (y == 7 && delta_y == 1)) {
        return false
    }
    let found = null;
    let distance = 0;

    let px = x;
    let py = y;
    while (found == null) {
        px += delta_x;
        py += delta_y;
        if (px > 7 || px < 0 || py > 7 || py < 0) {
            found = false;
            break
        }
        if (grid[px][py] == target) {
            found = true;
            ctx.fillRect(x,y,distance,0)
            break;
        } else if (grid[px][py] == 0) {
            break;
        } else {
            distance++;
            if (distance > 10) {
                found = false;
                break;
            }
        }
    }


    if (!found || distance == 0) {
        return false;
    } else {
        let t = 0;
        let px = x;
        let py = y;
        while (t < distance) {
            px += delta_x;
            py += delta_y;
            t++;
            if (t > distance) {
                break;
            } else {
                grid[px][py] = target;
                draw_circle(px, py)
            }
            
        }
        return true
    }
}

function count() {
    let red = 0;
    let white = 0;
    grid.forEach(item => {
        item.forEach( square => {
            if (square == 1) {
                red++
            } else if (square == 2) {
                white ++
            }
        })
    })
    return [red, white]
}

function reset() {
    grid = [
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,1,2,0,0,0],
        [0,0,0,2,1,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
    ];
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    populate_board();
    who = 0;
}

function skip() {
    who = (who + 1) % 2;
}