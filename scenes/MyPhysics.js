class MyPhysics {
    static applyGravity(target, sources, delta) {
        let acceleration = new Phaser.Math.Vector2(0, 0);
        for(let i = 0; i < sources.length; i++) {
            let source = sources[i];
            if(source.strength == 0) continue;
            let gravity = new Phaser.Math.Vector2().set(source.x - target.x, source.y - target.y);
            gravity.normalize();
            gravity.scale(source.strength);
            gravity.scale(delta);
            acceleration.add(gravity);
        }
        target.setAcceleration(acceleration.x, acceleration.y);
    }
}