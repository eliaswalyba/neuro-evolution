function nextGeneration() {
  calculateFitness();
  for (let i = 0; i < POPULATION_SIZE; i++) {
    agents[i] = selectOne();
  }
  for (let i = 0; i < POPULATION_SIZE; i++) {
    savedAgents[i].kill();
  }
  savedAgents = [];
}

function selectOne() {
    let i = 0;
    let r = random(1);
    while (r > 0) {
        r = r - savedAgents[i].fitness;
        i++;
    }
    i--;
    let parentAgent = savedAgents[i];
    let childAgent = new Agent(parentAgent.brain);
    childAgent.mutate();
    return childAgent;
}

function calculateFitness() {
    let totalReward = 0;
    for (let agent of savedAgents) {
        totalReward += agent.reward;
    }
    for (let agent of savedAgents) {
        agent.fitness = agent.reward / totalReward;
    }
}