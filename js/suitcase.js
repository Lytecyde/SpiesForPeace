import Resources from "./resource.js";

export default class Suitcase extends Phaser.GameObjects.Sprite { 

    constructor(scene, spy, texture, frame) {
        super(scene, spy.x, spy.y, texture, frame);
        this.scene = scene;
        this.texture = texture;
        this.frame = frame;
        this.spy = spy; //procurer
        this.resourcesLength = 4;
        this.contains = new Resources(Math.floor(Math.random() * this.resourcesLength));
        this.emojiSuitcase = "💼";
        this.setPosition(spy.x, spy.y);
        
        console.log("placed a suitcase");
       //this.setPosition(spy.x, spy.y); 
    }

    create() {
         // Create a sprite for the suitcase and set it to be invisible initially
        
        //this.setVisible(true);
        this.scene.anims.create({
          key: 'suitcaseplaced',
          frames: this.anims.generateFrameNumbers('suitcase', {
            start: 0,
            end: 0
          }),
          defaultTextureKey: null,
          // time
          delay: 0,
          frameRate: 24,
          duration: 5000,
          //skipMissedFrames: true,

          // repeat
          repeat: 0,
          repeatDelay: -1,
          yoyo: false,

          // visible
          showOnStart: true,
          hideOnComplete: true
        });
        // Add the animation to the sprite
        //this.anims.load('suitcaseplaced')
        this.play('suitcaseplaced');
        // Set a timed event to hide the suitcase after the animation is complete
        this.scene.time.addEvent({
            delay: 3000, // duration of the animation
            callback: () => {
              this.setVisible(true);
              this.on('animationcomplete', () => {
                this.setVisible(false);
                //this.destroy();
              });
            },
            callbackScope: this,
            loop: false
        });
    } 
}