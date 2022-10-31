export default class StressBar extends Phaser.GameObjects.Rectangle {

    constructor (x, y, scene)
    {
        super(scene, 0, 0, 16, 3, 0x00ff00);
        this.x = x;
        this.y = y - 16;
        scene.add.existing(this);
        this.setStressLevel(5);
        this.setFillStyle(0x00ff00);
    }

    draw () {
        this.setPosition(this.x, this.y);
    }

    setStressLevel (stress) {
        this.setFillStyle(0xff0000);
        this.setSize(3, 3);

        if (stress > 3) {
            this.setFillStyle(0x00ff00);
            this.setSize(12, 3);

            return;
        }
        
        if (stress > 1) {
            this.setFillStyle(0xffff00);
            this.setSize(6, 3);

            return;
        }
    }

    stressCausedByBomb(bombX, bombY) {
        var dX = Math.abs(bombX - this.x);
        var dY = Math.abs(bombY - this.y);
        var shortestDistance = Math.sqrt(dX * dX + dY * dY);
        const BOMBSIZE = 0.5;
        var stressFactor = shortestDistance  /  (32 * BOMBSIZE)  ;

        return stressFactor;
    }
}