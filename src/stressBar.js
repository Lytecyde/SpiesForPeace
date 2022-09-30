export default class StressBar {

    constructor (x, y, scene)
    {
        this.x = x;
        this.y = y;
        this.bar = new Phaser.GameObjects.Graphics(scene);
        scene.add.existing(this.bar);
    }

    draw () {
        this.bar.clear();
        this.bar.fillStyle(0x00ff00);
        this.bar.fillRect(this.x - 8, this.y - 16 - 3, 16, 3);
    }

}