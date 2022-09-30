export default class StressBar {

    constructor (x, y, scene)
    {
        this.x = x;
        this.y = y;
        this.bar = new Phaser.GameObjects.Graphics(scene);
        scene.add.existing(this.bar);
    }

    draw (x, y) {
        this.bar.clear();
        this.bar.fillStyle(0xff0000);
        this.bar.fillRect(x - 8, y - 16 - 3, 16, 3);
    }

}