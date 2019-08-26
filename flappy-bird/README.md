# Flappy Bird 
![:bird:](flappy.gif)


or intelligent version of it using TensorFlow.js for machine learning
and p5xjs for visual media

Reinforcement learning in gaming. The agent start dumb but as the time goes it learns by itself how to play better without any human interaction, just the agent by itself within its environment.
`js/agent.js`. After about 20min you got yourself a perfect intelligent bird. :muscle: :thumbsup:

Agent has a brain (`js/brain.js`) which is a TensorFlow sequential model with hidden layer.
Agent use its brain to think and make better action based on its past experience

Obstacle (`js/obstacle.js`) are vertical bars with random height
`js/sketch.js` do the drawing, load different image assets, and setup.


# TODO
Next up are some general thoughts. The project itself is already good enough but as they say: there is always some room for improvement ;) :pray: :v:

- link to your written presentation
- rename repository to more meaningful name: flappy bird 
- use npm for libs. using package.json file help fix the version used for this project. I understand that your concern was to make it as simple as possible. That way we could bundle js file into one named flappy-bird.js for instance.
- explain the model construction. for example in Brain::createModel why using a sigmoid as activation function for hidden layers and softmax for the output layer. That make sense to me clearly but newbies may not know the reasons.
- make UI nicer and interactive
