import Game from './game.js';

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#ffffff',
    parent: 'phaser-example',
    scene: [ Game ],
    physics: {
        default: 'arcade',
        arcade: { debug: false }
    }
};

let game = new Phaser.Game(config);