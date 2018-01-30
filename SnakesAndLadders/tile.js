class Tile {
    constructor(position, color, number) {
        this.position = position;
        this.color = color;
        this.number = number;
    }

    draw() {
        fill(this.color);
        rect(this.position.x * (width / WIDTH), this.position.y * (height / HEIGHT), width / WIDTH, height / HEIGHT);
        fill(255);
        textSize(TEXT_SIZE);
        textAlign(CENTER);
        text(this.number, this.position.x * (width / WIDTH) + (width / WIDTH) / 2, this.position.y * (height / HEIGHT) + (height / HEIGHT) / 2 + TEXT_SIZE / 2);
    }

    getCenter() {
        var x = this.position.x * (width / WIDTH) + (width / WIDTH) / 2;
        var y = this.position.y * (height / HEIGHT) + (height / HEIGHT) / 2;
        return {x: x, y: y};
    }
}