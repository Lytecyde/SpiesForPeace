export default class StressBar {

    constructor (x, y, scene)
    {
        this.x = x;
        this.y = y;
        this.bar = new Phaser.GameObjects.Rectangle(scene, 0,0,16,3,0x00ff00);
        scene.add.existing(this.bar);
        this.setStressLevel(5);
        this.bar.setFillStyle(0x00ff00);
    }

    draw () {
        this.bar.setPosition(this.x, this.y - 16);
    }

    setStressLevel (stress) {
        this.bar.setFillStyle(0xff0000);
        this.bar.setSize(3, 3);

        if (stress > 3) {
            this.bar.setFillStyle(0x00ff00);
            this.bar.setSize(12, 3);

            return;
        }
        
        if (stress > 1) {
            this.bar.setFillStyle(0xffff00);
            this.bar.setSize(6, 3);

            return;
        }
    }

    stressCausedByBomb(bombX, bombY) {
        var dX = Math.abs(bombX - this.x);
        var dY = Math.abs(bombY - this.y);
        var shortestDistance = Math.sqrt(dX*dX + dY*dY);
        
        var stressFactor = shortestDistance / 32 ;

        return stressFactor;
    }
}