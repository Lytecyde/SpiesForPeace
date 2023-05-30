export default class Bomb extends Phaser.GameObjects.Sprite {
//refactoring the bomb stuff from the city.js
    constructor (scene, x, y, bombKey) {
        super(scene, x, y, bombKey);
        this.anims.create({
            key: bombKey,
            frames: this.anims.generateFrameNumbers(
              'bomb',
             { start: 0, end: 1 }
             ),
            defaultTextureKey: null,
  
            // time
            delay: 0,
            frameRate: 24,
            duration: null,
            skipMissedFrames: true,
  
            // repeat
            repeat: 0,
            repeatDelay: -1,
            yoyo: false,
  
            // visible
            showOnStart: false,
            hideOnComplete: true
        }); 
    }
}