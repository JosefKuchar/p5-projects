let board;
let players = [];

// Average
let increment = 0;
let average = 0;

// Elements
let concurrentPlayersSlider;
let speedSlider;
let averageP;

function setup() {
    createCanvas(600, 600);

    board = new Board();

    for (let i = 0; i < CONCURRENT_PLAYERS; i++) {
        players.push(new Player(board.tiles));
    }

    averageP = createP("Average steps: 0");
    createP("")
    createP("Concurrent players");
    concurrentPlayersSlider = createSlider(1, 20, 10, 1);
    createP("Speed");
    speedSlider = createSlider(1, 60);
}

function draw() {
    background(51);
    updateSliders();
            
    for (let i = players.length - 1; i >= 0; i--) {
        if (players[i].done) {
            console.log(players[i].steps);
            increment += 1;
            average = (average * (increment - 1) + players[i].steps) / increment;
            averageP.html("Average steps: " + average);
            players.splice(i, 1);
        }
    }

    while (players.length < CONCURRENT_PLAYERS) {
        players.push(new Player(board.tiles))
    }

    board.draw();
    players.forEach(player => {
        player.update();
        player.draw();
    });    
}

function updateSliders() {
    CONCURRENT_PLAYERS = concurrentPlayersSlider.value();
    INTERPOLATION_SPEED = 1 / map(speedSlider.value(), 1, 60, 60, 1);
    TURN_DELAY = map(speedSlider.value(), 1, 60, 60, 1);
}