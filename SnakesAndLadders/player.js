class Player {
    constructor(tiles) {
        this.tiles = tiles;
        this.animated = true;
        this.current = this.tiles[0][HEIGHT - 1];
        this.queue = [this.current];
        this.position = this.current.getCenter();
        this.interpolator = 0;
        this.delay = TURN_DELAY;
        this.done = false;
        this.half_done = false;
        this.steps = 0;
    }

    update() {
        if (this.queue.length > 1) {
            this.position.x = lerp(this.queue[0].getCenter().x, this.queue[1].getCenter().x, this.easeInOutQuad(this.interpolator));
            this.position.y = lerp(this.queue[0].getCenter().y, this.queue[1].getCenter().y, this.easeInOutQuad(this.interpolator));

            this.interpolator += INTERPOLATION_SPEED;

            if (this.interpolator >= 1) {
                this.interpolator = 0;
                this.queue.shift();
            }

            return;
        }

        if (this.half_done)
            this.done = true;

        if (this.delay != 0) {
            this.delay--;
            return; 
        }
        this.delay = TURN_DELAY;

        let steps = floor(random(1, 7));
        
        while (steps > 0) {
            if (this.current.next) {
                this.current = this.current.next;
                this.queue.push(this.current);
                this.steps++;
                steps--;
            } else {
                this.half_done = true;
                break;
            }
        }

        if (this.current.jump) {
            this.current = this.current.jump;
            this.queue.push(this.current)
        }
    }

    draw() {
        noStroke();
        fill(255, 255, 255, 100);
        ellipse(this.position.x, this.position.y, 40, 40);
    }

    easeInOutQuad(t) { 
        return t<.5 ? 2*t*t : -1+(4-2*t)*t;
    }
}