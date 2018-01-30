class Board {
    constructor() {
        // Create array
        this.tiles = [];
        for (let x = 0; x < WIDTH; x++) {
            this.tiles[x] = [];
            for (let y = 0; y < HEIGHT; y++) {
                this.tiles[x][y] = new Tile(createVector(x, y), (x + y) % 2 == 0 ? color(10) : color(40), 0);
            }
        }
        
        // Assign numbers and link tiles
        let number = 1;
        let previous = null;
        for (let y = 0; y < HEIGHT; y++) {
            for (let x = 0; x < WIDTH; x++) {
                let current = this.tiles[y % 2 == 0 ? x : WIDTH - 1 - x][HEIGHT - 1 - y];
                current.number = number;
                if (previous)
                    previous.next = current; 
                previous = current;
                number++;
            }
        }

        // Generate snakes and ladders
        for (let i = 0; i < 12; i++) {
            let x1 = floor(random(0, WIDTH));
            let y1 = floor(random(0, HEIGHT));
            let x2 = floor(random(0, WIDTH));
            let up = random() > 0.5;
            up = y1 == 0 ? false : up;
            up = y1 == HEIGHT - 1 ? true : up;
            if (up) {
                var y2 = floor(random(0, y1));
            } else {
                var y2 = floor(random(y1 + 1, HEIGHT));
            }

            if (x1 == 0 && y1 == 0) {
                x1 = 2;
            }

            this.tiles[x1][y1].jump = this.tiles[x2][y2];
        }
    }

    draw() {
        // Tiles
        noStroke();
        for (let x = 0; x < WIDTH; x++) {
            for (let y = 0; y < HEIGHT; y++) {
                this.tiles[x][y].draw();
            }
        }

        // Connections
        strokeWeight(5);
        for (let x = 0; x < WIDTH; x++) {
            for (let y = 0; y < HEIGHT; y++) {
                if (this.tiles[x][y].jump) {
                    if (this.tiles[x][y].number - this.tiles[x][y].jump.number > 0) {
                        stroke(255, 0, 0);
                    } else {
                        stroke(0, 255, 0);
                    }
                    let start = this.tiles[x][y].getCenter();
                    let end = this.tiles[x][y].jump.getCenter();
                    line(start.x, start.y, end.x, end.y);
                }
            }
        }
    }
}