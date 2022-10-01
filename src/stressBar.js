export default class StressBar {

    constructor (x, y, scene)
    {
        this.x = x;
        this.y = y;
        this.bar = new Phaser.GameObjects.Graphics(scene);
        scene.add.existing(this.bar);
        this.bar.fillStyle(0x00ff00);
    }

    draw () {
        this.bar.clear();  
        this.setStressLevel(5);
        this.bar.fillRect(this.x - 8, this.y - 16 - 3, 16, 3);
    }

    setStressLevel (stress) {
        if (stress > 4) {
            this.bar.fillStyle(0x00ff00);
            return;
        }
        
        if (stress > 2) {
            this.bar.fillStyle(0xffff00);
            return;
        }

        this.bar.fillStyle(0xff0000);
    }
}