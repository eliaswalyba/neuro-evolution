class Obstacle {

    constructor() {
        this.spacing = 125;
        this.top = random(height / 6, (3 / 4) * height); //200
        this.bottom = height - (this.top + this.spacing); // 275
        this.x = width;
        this.w = 80;
        this.speed = 6;
    }

    hits(bird) {
        if (bird.y < this.top || bird.y > height - this.bottom) {
            if (bird.x > this.x && bird.x < this.x + this.w) {
                return true;
            }
        }
        return false;
    }

    show() {
        fill(0, 255, 0);
        rectMode(CORNER);
        image(assets.topPipe, this.x, 0, this.w, this.top);
        image(assets.bottomPipe, this.x, height - this.bottom, this.w, this.bottom);
    }

    update() { this.x -= this.speed; }

    offscreen() { return this.x < -this.w; }
}