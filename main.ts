serial.redirectToUSB()
let width = 16
let height = 6
//let rows = []
let cols: boolean[][] = []
let last_led_toggle = 0
let player1_x = 3
let player1_y = 3
let player1_direction_x = true
let player1_direction_y = true

function winkekatze() {
    if (last_led_toggle + 1000 < control.millis()) {
        led.toggle(2, 0)
        last_led_toggle = control.millis()
    }
}

function render_grid() {
    for (let x = 0; x < scrollbit.cols(); x++) {
        for (let y = 0; y < scrollbit.rows(); y++) {
            if (cols[x][y]) {
                scrollbit.setPixel(x, y, 64)
            }
        }
    }
    scrollbit.setPixel(player1_x, player1_y, 128)
}

function move_player() {
    // x
    // move
    if (player1_direction_x) {
        player1_x++
    } else {
        player1_x--
    }
    // wall collision
    if (player1_x >= width || player1_x <= 0) {
        player1_direction_x = !player1_direction_x
    }
    // object collision
    if (cols[player1_x][player1_y]) {
        cols[player1_x][player1_y] = !cols[player1_x][player1_y]
        player1_direction_x = !player1_direction_x
    }

    // y
    // move
    if (player1_direction_y) {
        player1_y++
    } else {
        player1_y--
    }
    // wall collision
    if (player1_y >= height || player1_y <= 0) {
        player1_direction_y = !player1_direction_y
    }
    // object collision
    if (cols[player1_x][player1_y]) {
        cols[player1_x][player1_y] = !cols[player1_x][player1_y]
        player1_direction_y = !player1_direction_y
    }
}

// init array
for (let x = 0; x <= scrollbit.cols(); x++) {
    cols[x] = []
    for (let y = 0; y <= scrollbit.rows(); y++) {
        if (x < scrollbit.cols() / 2) {
            cols[x][y] = false;
        } else {
            //cols[x][y] = true;
            cols[x][y] = true;

        }
    }
}



basic.forever(function on_forever() {
    winkekatze()
    
    scrollbit.clear()
    move_player()
    render_grid()
    scrollbit.show()
    basic.pause(100)
})
