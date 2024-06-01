import { Actor, Input, Vector } from "excalibur";
import { Bullet } from "./bullet";
import { Resources } from './resources';

export class Dragon extends Actor {
    constructor(x, y) {
        super({
            pos: new Vector(x, y),
            width: 50,
            height: 50
        });
        const dragonSprite = Resources.Dragon.toSprite();
        dragonSprite.scale = new Vector(0.33, 0.33); // Scale the dragon to 1/3 of its original size
        this.graphics.use(dragonSprite);
        this.isShooting = false;
    }

    onInitialize(engine) {
        this.engine = engine;
        this.on('preupdate', this.updateMovement.bind(this));
        // Listen for the 'press' event of the keyboard
        this.engine.input.keyboard.on('press', (evt) => {
            // If the space key is pressed and the dragon is not shooting, call the shoot method
            if (evt.key === Input.Keys.Space && !this.isShooting) {
                this.shoot();
            }
        });
    }

    updateMovement(evt) {
        const speed = 200; // pixels per second
        let moveDir = new Vector(0, 0);

        if (this.engine.input.keyboard.isHeld(Input.Keys.Left)) {
            moveDir.x -= 1;
        }
        if (this.engine.input.keyboard.isHeld(Input.Keys.Right)) {
            moveDir.x += 1;
        }
        if (this.engine.input.keyboard.isHeld(Input.Keys.Up)) {
            moveDir.y -= 1;
        }
        if (this.engine.input.keyboard.isHeld(Input.Keys.Down)) {
            moveDir.y += 1;
        }

        this.vel = moveDir.scale(speed);
    }

    shoot() {
        const direction = new Vector(-1, 0); // Shoot straight ahead
        const bullet = new Bullet(this.pos.x, this.pos.y, direction);
        this.engine.add(bullet);
        this.isShooting = true; 

        this.actions.delay(500).callMethod(() => {
            this.isShooting = false;
        });
    }
}
