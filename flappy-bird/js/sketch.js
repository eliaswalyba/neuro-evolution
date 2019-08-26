// https://bit.ly/2FX8Lqr

const POPULATION_SIZE = 250;
const WORLD_GRAVITY = .8;

let agents = [];
let savedAgents = [];
let obstacles = [];
let counter = 0;
let slider;

let assets = {};

function preload() {
  assets.bird       = loadImage('assets/bird.png');
  assets.topPipe    = loadImage('assets/topPipe.png');
  assets.bottomPipe = loadImage('assets/bottomPipe.png');
  assets.background = loadImage('assets/background.png');
}

function setup() {
    createCanvas(600, 750);
    tf.setBackend('cpu');
    slider = createSlider(1, 10, 1);
    for (let i = 0; i < POPULATION_SIZE; i++) {
        agents[i] = new Agent();
    }
}

function draw() {
    image(assets.background, 0, 0, canvas.width, canvas.height);
    for (let n = 0; n < slider.value(); n++) {
        if (counter % 75 == 0) {
            obstacles.push(new Obstacle());
        }
        counter++;
        for (let i = obstacles.length - 1; i >= 0; i--) {
            obstacles[i].update();
            for (let j = agents.length - 1; j >= 0; j--) {
                if (obstacles[i].hits(agents[j])) {
                    savedAgents.push(agents.splice(j, 1)[0]);
                }
            }
            if (obstacles[i].offscreen()) {
                obstacles.splice(i, 1);
            }
        }
        for (let i = agents.length - 1; i >= 0; i--) {
            if (agents[i].isOut()) {
                savedAgents.push(agents.splice(i, 1)[0]);
            }
        }
        for (let agent of agents) {
            agent.think(obstacles);
            agent.update();
        }
        if (agents.length === 0) {
            counter = 0;
            nextGeneration();
            obstacles = [];
        }
    }
    for (let agent of agents) {
        agent.show();
    }
    for (let obstacle of obstacles) {
        obstacle.show();
    }
}