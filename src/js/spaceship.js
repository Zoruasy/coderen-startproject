import { Actor, Vector, CollisionType, Timer, Shape } from "excalibur";
import { Resources } from './resources';
import { Dragon } from './dragon';
import { Laser } from './laser';

export class Spaceship extends Actor {
    constructor(x, y) {
        super({
            pos: new Vector(x, y),
            width: 50,
            height: 50,
            collisionType: CollisionType.Active
        });
        const spaceshipSprite = Resources.Spaceship.toSprite();
        spaceshipSprite.scale = new Vector(0.2, 0.2);
        this.graphics.use(spaceshipSprite);
        this.collider.set(Shape.Box(this.width * 0.5, this.height * 0.5));
    }

    onInitialize(engine) {
        this.on("collisionstart", (event) => this.checkCollision(event));
        this.engine = engine;
        this.vel = new Vector(0, 0);

        this.shootTimer = new Timer({
            fcn: () => this.shoot(),
            interval: 1000,
            repeats: true
        });
        this.engine.add(this.shootTimer);
        this.shootTimer.start();
    }

    onPreUpdate(engine, delta) {
        const dragon = this.engine.currentScene.actors.find(actor => actor instanceof Dragon);
        if (dragon) {
            const direction = dragon.pos.sub(this.pos).normalize();
            const speed = 100;
            this.vel = direction.scale(speed);
        }
    }

    checkCollision(event) {
        if (event.other instanceof Laser) {
            this.takeDamage();
        }
    }

    shoot() {
        if (!this.isKilled()) {
            const dragon = this.engine.currentScene.actors.find(actor => actor instanceof Dragon);
            if (dragon) {
                const direction = dragon.pos.sub(this.pos).normalize();
                const laser = new Laser(this.pos.x, this.pos.y, direction);
                this.engine.add(laser);
            }
        }
    }

    takeDamage() {
        if (this.health <= 0) {
            this.shootTimer.cancel();
            this.explode(); // Call explode method if spaceship health is 0 or below
            this.kill();
        }
    
    }
}
