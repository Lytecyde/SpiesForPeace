export default class LifeBar extends Phaser.GameObjects.Rectangle {

    constructor (x, y, scene)
    {
        super(scene, 0, 0, 16, 3, 0x00ff00);
        this.x = x;
        this.y = y - 19;
        this.scene = scene;
        scene.add.existing(this);
        this.setLevel(15);
        this.setFillStyle(0x00ff00);
    }

    draw () {
        this.setPosition(this.x, this.y);
        this.scene.add.existing(this);
    }

    setLevel(health) {
        //red
        this.setFillStyle(0xff0000);
        this.setSize(health, 3);
        //green
        if (health > 10) {
            this.setFillStyle(0x00ff00);
            this.setSize(health, 3);

            return;
        }
        ///yellow
        if (health > 5) {
            this.setFillStyle(0xffff00);
            this.setSize(health, 3);

            return;
        }
    }
}