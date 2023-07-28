class Scene2Tutorial extends Phaser.Scene
{

    constructor()
    {
        super('scene2_tutuorial');
    }

    preload()
    {
        this.load.path = './assets/';
        this.load.image('richard', 'Richard.png');
        this.load.image('avocado', 'Avocado.png');
    }

    create()
    {
        this.add.text(400, 100, "Purple Spheres\nGenerate Their\nOwn Gravity", { fontSize: 64 }).setOrigin(0.5, 0.5);
        this.add.text(400, 700, "get the avocado to start level 2", { fontSize: 30 }).setOrigin(0.5, 0.5);

        this.richard = this.physics.add.sprite(100, 400, 'richard').setDepth(20);
        let avo = this.physics.add.staticSprite(700, 200, 'avocado').setScale(2).setDepth(10)
        this.physics.add.overlap(avo, this.richard, (avo, richard) => {
            avo.destroy();
            this.scene.start("scene2")
        })

        this.gravitySources = [
            {x: 0, y: 0, strength: 0},
            {x: 400, y: 400, strength: 5},
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
            this.scene.start('scene2_tutuorial');
        }
    }
}