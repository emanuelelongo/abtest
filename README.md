## AB Test Simulation

![screenshot](https://github.com/lelettrone/abtest/raw/master/screenshot.png)

### Install

    git clone https://github.com/lelettrone/abtest.git
    cd abtest 
    npm install

### Run

    node index.js [-n clients] [-t threshlod] [-l loss] [-g gain] [-s strategy]

### Options
 - clients: number of initial clients
 - threshold: initial abtest percentage
 - loss: rate of leaving client
 - gain: rate of new client
 - strategy: naive | clever
