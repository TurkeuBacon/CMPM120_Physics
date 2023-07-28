class Scene1Tutorial extends Phaser.Scene
{

    constructor()
    {
        super('scene1_tutuorial');
    }

    preload()
    {
        this.load.path = './assets/';
        this.load.image('richard', 'Richard.png');
        this.load.image('avocado', 'Avocado.png');
        this.load.image('spoon', 'Spoon.png');
    }

    create()
    {
        this.add.text(400, 100, "Click And Drag\nTo Generate Gravity", { fontSize: 64 }).setOrigin(0.5, 0.5);
        this.add.text(400, 700, "get the avocado to start level 1.\nAnd dont let richard go off the edge", { fontSize: 30 }).setOrigin(0.5, 0.5);

        this.richard = this.physics.add.sprite(100, 400, 'richard').setDepth(20);
        let avo = this.physics.add.staticSprite(700, 400, 'avocado').setScale(2).setDepth(10)
        this.physics.add.overlap(avo, this.richard, (avo, richard) => {
            avo.destroy();
            this.scene.start("scene1")
        })

        this.gravitySources = [
            {x: 0, y: 0, strength: 0},
        ]
        for(let i = 1; i < this.gravitySources.length; i++) {
            let source = this.gravitySources[i];
            this.add.circle(source.x, source.y, source.strength*2, 0x7700ff)
        }
    }

    update(time, delta) {
        let pointer = this.input.activePointer;
        if(pointer.isDown) {
            this.gravitySources[0] = {x: pointer.x, y: pointer.y, strength: 10};
        } else {
            this.gravitySources[0].strength = 0;
        }
        
        MyPhysics.applyGravity(this.richard, this.gravitySources, delta);

        if(this.richard.x < 0 || this.richard.x > 800 || this.richard.y < 0 || this.richard.y > 800) {
            console.log("OUT")
            this.scene.start('scene1_tutuorial');
        }
    }
}