export default class AlignmentBar {

    constructor (scene)
    {
        this.bar = new Phaser.GameObjects.Graphics(scene);
        this.endMessage;
        this.x = 2;
        this.y = 34;
        this.value = 392;
        this.p = 100 / 100;
        this.blackspies = this.value / 40; 
        this.whitespies = 36 - this.whitespies;    

        this.draw();
        this.text = scene.add.text(32, 64, '', { font: '32px Courier', fill: '#808080' });
        scene.add.existing(this.bar);
    }

    decrease ()
    {
        this.value -= 60;

        if (this.value < 0)
        {
            this.value = 0;
            this.end();
        }
    
        this.draw();
    }

    increase ()
    {
        this.value += 60;
        
        if (this.value > 400)
        {
            this.value = 400;
        }
        
        this.draw();
        
    }

    draw ()
    {
        this.bar.clear();

        //  BG
        this.bar.fillStyle(0x000000);
        this.bar.fillRect(this.x, this.y, 398, 16);

        //  Health

        this.bar.fillStyle(0xffffff);
        this.bar.fillRect(this.x + 2, this.y + 2, 394, 12);

        if (this.value < 392)
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

    end ()
    {
        this.text.setText([

            'END OF DEMO  ' +
            'Black Spies: ' + this.blackspies +
            'White Spies: ' + this.whitespies
        ]);
        
    }

}
