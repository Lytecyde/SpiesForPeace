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
        //this.suitcaseSymbol = this.scene.add.text(spy.x , spy.y, this.emojiSuitcase, { font: '32px Courier', fill: '#000000' });
        
    }

    create() {
        this.scene.anims.create({
            key: 'suitcase-placed',
            frames: this.anims.generateFrameNumbers('suitcase', {
              start: 0,
              end: 0
            }),
            repeat: -1,
            frameRate: 1
          });

          this.scene.time.addEvent({
            delay: 5000,
            callback: () -> {
                this.play("suitcase-placed");
                this.spawn(this.spy.x, this.spy.y);
            },
            callbackScope: this,
            loop: true
          });
    }

    spawn(x, y){
        const suitcase = this.scene.add.sprite(x,y, 'suitcase');
        this.scene.add.existing(suitcase);
    }
}