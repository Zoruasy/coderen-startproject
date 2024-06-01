import { Actor, Vector, CollisionType, Timer, Shape } from "excalibur";
import { Resources } from './resources';
import { Dragon } from './dragon';
import { Laser } from './laser'; // Import the Laser class

export class Spaceship extends Actor {
    constructor(x, y) {
        super({
            pos: new Vector(x, y),
            width: 50,
            height: 50,
            collisionType: CollisionType.Active // Use the CollisionType enum
        });
        const spaceshipSprite = Resources.Spaceship.toSprite();
        spaceshipSprite.scale = new Vector(0.2, 0.2); // Scale the spaceship to 20% of the original size
        this.graphics.use(spaceshipSprite);

        // Set a custom smaller collision shape
        this.collider.set(Shape.Box(this.width * 0.5, this.height * 0.5)); // Adjust the scale as needed
    }

    onInitialize(engine) {
        this.on("collisionstart", (event) => this.checkCollision(event));
        this.engine = engine;
        this.vel = new Vector(0, 0); // Start with no velocity

        // Set up a timer to shoot lasers periodically
        this.shootTimer = new Timer({
            fcn: () => this.shoot(),
            interval: 1000, // Adjust the interval as needed (milliseconds)
            repeats: true
        });
        this.engine.add(this.shootTimer);
        this.shootTimer.start();
    }

    onPreUpdate(engine, delta) {
        const dragon = this.engine.currentScene.actors.find(actor => actor instanceof Dragon);
        if (dragon) {
            const direction = dragon.pos.sub(this.pos).normalize(); // Direction towards the dragon
            const speed = 100; // Speed of the spaceship
            this.vel = direction.scale(speed);
        }
    }

    checkCollision(event) {
        if (event.other instanceof Laser) {
            // Handle collision with Laser but keep shooting
            this.takeDamage();
        }
    }

    shoot() {
        if (!this.isKilled()) { // Check if the spaceship is still alive before shooting
            const dragon = this.engine.currentScene.actors.find(actor => actor instanceof Dragon);
            if (dragon) {
                const direction = dragon.pos.sub(this.pos).normalize(); // Direction towards the dragon
                const laser = new Laser(this.pos.x, this.pos.y, direction); // Create a new laser
                this.engine.add(laser); // Add the laser to the engine
            }
        }
    }

    takeDamage() {
        // Handle the damage taken by the spaceship, but do not stop shooting
        // For example, blink the spaceship
        // You could also decrease health here if you have a health system
        
        // If the spaceship is "dead", stop shooting
        if (this.health <= 0) { // Assuming you have a health system
            this.shootTimer.cancel(); // Stop the timer
            this.kill(); // Kill the spaceship
        }
    }
}
