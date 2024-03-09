serial.redirectToUSB()
let width = 16
let height = 6
let cols: boolean[][] = []
let last_led_toggle = 0
let player1_x = 3
let player1_y = 3
let player1_direction_x = true
let player1_direction_y = true

class Player {
    pos_x: number;
    pos_y: number;
    velocity_x: number;
    velocity_y: number;
    lit: boolean;
    brightness: number;

    constructor(pos_x: number, pos_y: number, brightness: number, lit: boolean) {
        //this.pos_x = randint(0, width)
        //this.pos_y = randint(0, height)
        this.pos_x = pos_x
        this.pos_y = pos_y
        this.velocity_x = randint(1, 2)
        this.velocity_y = randint(1, 2)
        this.lit = false
        this.brightness = brightness
    }

    detect_collision() {
        // wall collision
        if (this.pos_x <= 0 || this.pos_x >= width) {
            this.velocity_x = this.velocity_x * -1
        }
        if (this.pos_y <= 0 || this.pos_y >= height) {
            this.velocity_y = this.velocity_y * -1
        }

        // object collision
        /*
        if (this.lit != cols[this.pos_x][this.pos_y]){
            this.velocity_x = this.velocity_x * -1
            this.velocity_y = this.velocity_y * -1

        }
        */

    }

    move() {
        this.pos_x += this.velocity_x
        this.pos_y += this.velocity_y
        this.detect_collision()
    }
}
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
    scrollbit.setPixel(player1.pos_x, player1.pos_y, player1.brightness)
    scrollbit.setPixel(player2.pos_x, player2.pos_y, player2.brightness)

}

/*
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
*/

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

// init player
let player1 = new Player(3, 3, 128, true)
let player2 = new Player(12, 3, 16, false)


basic.forever(function on_forever() {
    winkekatze()
    
    scrollbit.clear()
    //move_player()
    player1.move()
    player2.move()
    render_grid()
    scrollbit.show()
    basic.pause(100)
})
