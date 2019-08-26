class Agent {

    constructor(brain) {
        this.y = height / 2;
        this.x = 64;
        this.relaxation = -12;
        this.velocity = 0;
        this.reward = 0;
        this.fitness = 0;
        if (brain) {
            this.brain = brain.copy();
        } else {
            this.brain = new Brain(5, 8, 2);
        }
    }

    kill() { this.brain.dispose(); }

    show() { image(assets.bird, this.x, this.y, 32, 32); }

    takeAction() { this.velocity += this.relaxation; }

    mutate() { this.brain.mutate(0.1); }

    findClosestObstacle(obstacles) {
        let closestObstacle = null;
        let closestDistance = Infinity;
        for (let i = 0; i < obstacles.length; i++) {
        let distance = obstacles[i].x + obstacles[i].w - this.x;
            if (distance < closestDistance && distance > 0) {
                closestObstacle = obstacles[i];
                closestDistance = distance;
            }
        }
        return closestObstacle;
    }

    think(obstacles) {
        let closest = this.findClosestObstacle(obstacles);
        let inputs = [
            this.y / height,
            closest.top / height,
            closest.bottom / height,
            closest.x / width,
            this.velocity / 10
        ];
        let output = this.brain.predict(inputs);
        if (output[0] > output[1]) { this.takeAction(); }
    }

    isOut() { return this.y > height || this.y < 0; }

    update() {
        this.reward++;
        this.velocity += WORLD_GRAVITY;
        this.y += this.velocity;
    }

}
