export default class AlignmentBar {

    constructor (scene)
    {
        this.bar = new Phaser.GameObjects.Graphics(scene);

        this.x = 2;
        this.y = 34;
        this.value = 792;
        this.p = 100 / 100;

        this.draw();

        scene.add.existing(this.bar);
    }

    decrease ()
    {
        this.value -= 10;

        if (this.value < 0)
        {
            this.value = 0;
        }

        this.draw();

        return (this.value === 0);
    }

    increase ()
    {
        this.value += 10;
        if (this.value > 800)
        {
            this.value = 800;
        }

        this.draw();

        return (this.value === 0)
    }
    draw ()
    {
        this.bar.clear();

        //  BG
        this.bar.fillStyle(0x000000);
        this.bar.fillRect(this.x, this.y, 798, 16);

        //  Health

        this.bar.fillStyle(0xffffff);
        this.bar.fillRect(this.x + 2, this.y + 2, 796, 12);

        if (this.value < 792)
        {
            this.bar.fillStyle(0x808080);
        }
        else
        {
            this.bar.fillStyle(0x202020);
        }

        var d = Math.floor(this.p * this.value);

        this.bar.fillRect(this.x + 2, this.y + 2, d, 12);
    }

}
