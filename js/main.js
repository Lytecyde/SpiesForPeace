import Game from './game.js';

const config = {
    type: Phaser.AUTO,
    width: 32 * 48,
    height: 32 * 32,
    backgroundColor: '#d4c6aa',
    parent: 'phaser-example',
    scene: [ Game ],
    physics: {
        default: 'arcade',
        arcade: { debug: false }
    }
};

let game = new Phaser.Game(config);