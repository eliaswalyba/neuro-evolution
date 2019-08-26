class Brain {

    constructor(a, b, c, d) {
        if (a instanceof tf.Sequential) {
            this.nI = b;
            this.nH = c;
            this.nO = d;
            this.model = a;
        } else {
            this.nI = a;
            this.nH = b;
            this.nO = c;
            this.model = this.createModel();
        }
    }

    copy() {
        return tf.tidy(() => {
            const weights = this.model.getWeights();
            const newWeights = [];
            for (let i = 0; i < weights.length; i++) {
                newWeights[i] = weights[i].clone();
            }
            const newModel = this.createModel();
            newModel.setWeights(newWeights);
            return new Brain(newModel, this.nI, this.nH, this.nO);
        });
    }

    mutate(rate) {
        tf.tidy(() => {
            const weights = this.model.getWeights();
            const newWeights = [];
            for (let i = 0; i < weights.length; i++) {
                let tensor = weights[i];
                let values = tensor.dataSync().slice();
                let shape = weights[i].shape;
                for (let j = 0; j < values.length; j++) {
                    if (random(1) < rate) {
                        let w = values[j];
                        values[j] = w + randomGaussian();
                    }
                }
                let newTensor = tf.tensor(values, shape);
                newWeights[i] = newTensor;
            }
            this.model.setWeights(newWeights);
        });
    }

    dispose() {
        this.model.dispose();
    }

    predict(inputs) {
        return tf.tidy(() => {
            const inputsTensor = tf.tensor2d([inputs]);
            const outputsTensor = this.model.predict(inputsTensor);
            const outputsData = outputsTensor.dataSync();
            return outputsData;
        });
    }

    createModel() {
        const hiddenLayerConfigs = {
            units: this.nI,
            inputShape: [this.nI],
            activation: 'sigmoid'
        }
        const outputLayerConfigs = {
            units: this.nO,
            activation: 'softmax'
        }

        const hiddenLayer = tf.layers.dense(hiddenLayerConfigs);
        const outputLayer = tf.layers.dense(outputLayerConfigs);
    
        const model = tf.sequential();
        model.add(hiddenLayer);
        model.add(outputLayer);
        return model;
    }

}