import Game from './game.js';

const config = {
    type: Phaser.AUTO,
    width: 1000,
    height: 680,
    backgroundColor: '#d4c6aa',
    parent: 'phaser-example',
    scene: [ Game ],
    physics: {
        default: 'arcade',
        arcade: { debug: false }
    }
};

let game = new Phaser.Game(config);