# CMPM120_Physics
A simple Physics based game by Gabriel Bacon using Phaser

Code requirements:
- **The game uses both continuous and discrete inputs from the player**: The player has the discrete input of turning their gravity on or off, and a continuous input when they drag that gravity around.
- **The player’s goal can only be achieved indirectly (by allowing the physics engine to move key objects into position/contact).**: The player has no direct control over Richard. They can create a gravitational field, but Richard will simply follow the path determined by all gravity sources in the scene.
- **3+ physics-based gameplay scenes (possibly implemented with a single Phaser Scene subclass).**: I have 3 levels, each introducing a new mechanic. Level one is just the players gravity. Level 2 introduces other gravity sources, and level 3 introduces projectiles that need to be avoided.
- **Other scenes are used to separate and contextualize the gameplay scenes**:  Before each level there is a tutorial scene. This let's the player try out the new mechanic being introduced, and the mechanics need to be used to progress into the level proper.

Asset sources:
- Each image asset was created in GIMP. For the backround images I used a low resolution canvas to create pixel art.
- The purple circles and the text are generated using build in Phaser functionality
