class Scene3Tutorial extends Phaser.Scene
{

    constructor()
    {
        super('scene3_tutuorial');
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
        this.add.text(400, 100, "Avoid The\nCosmic Spoons", { fontSize: 64 }).setOrigin(0.5, 0.5);
        this.add.text(400, 700, "get the avocado to start level 3", { fontSize: 30 }).setOrigin(0.5, 0.5);

        this.richard = this.physics.add.sprite(100, 400, 'richard').setDepth(20);
        let avo = this.physics.add.staticSprite(700, 200, 'avocado').setScale(2).setDepth(10)
        this.physics.add.overlap(avo, this.richard, (avo, richard) => {
            avo.destroy();
            this.scene.start("scene3")
        })

        this.gravitySources = [
            {x: 0, y: 0, strength: 0},
            {x: 400, y: 400, strength: 5},
        ]
        for(let i = 1; i < this.gravitySources.length; i++) {
            let source = this.gravitySources[i];
            this.add.circle(source.x, source.y, source.strength*2, 0x7700ff)
        }
        this.spawnTime = -10;
        this.spawnWait = 0;
    }

    update(time, delta) {
        if(time - this.spawnTime >= this.spawnWait) {
            this.spawnWait = (Math.random() * 3 + 5) * 1000;
            this.spawnTime = time;
            this.spawnProjectile();
        }

        let pointer = this.input.activePointer;
        if(pointer.isDown) {
            this.gravitySources[0] = {x: pointer.x, y: pointer.y, strength: 10};
        } else {
            this.gravitySources[0].strength = 0;
        }
        
        MyPhysics.applyGravity(this.richard, this.gravitySources, delta);

        if(this.richard.x < 0 || this.richard.x > 800 || this.richard.y < 0 || this.richard.y > 800) {
            console.log("OUT")
            this.scene.start('scene3_tutuorial');
        }
    }
    spawnProjectile() {
        let position = {x: 400, y: -50};
        let spoon = this.physics.add.sprite(position.x, position.y, 'spoon').setDepth(15).setScale(3);
        spoon.setVelocity(0, 100);
        this.physics.add.overlap(spoon, this.richard, (spoon, richard) => {
            spoon.destroy();
            this.scene.start('scene3_tutuorial');
        })
    }
}