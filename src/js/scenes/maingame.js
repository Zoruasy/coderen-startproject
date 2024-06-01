import { Scene, Label, Color, Vector, Timer, Actor } from "excalibur";
import { Dragon } from '../dragon.js';
import { Spaceship } from '../spaceship.js';
import { Resources } from '../resources.js';

export class MainGame extends Scene {
    onInitialize(engine) {
        this.score = 0;

        // Score label aanmaken
        this.scoreLabel = new Label({
            pos: new Vector(100, 100),
            text: 'Score: 0',
            fontSize: 24,
            fontFamily: 'Arial',
            color: Color.White
        });

        // Create and add the background actor first
        const background = new Actor({
            pos: new Vector(engine.halfDrawWidth, engine.halfDrawHeight),
            width: engine.drawWidth,
            height: engine.drawHeight
        });

        const backgroundSprite = Resources.Background.toSprite();
        backgroundSprite.width = engine.drawWidth;
        backgroundSprite.height = engine.drawHeight;

        background.graphics.use(backgroundSprite);
        this.add(background);

        // Create the dragon actor
        const dragon = new Dragon(engine.halfDrawWidth, engine.drawHeight - 100);
        this.add(dragon);

        // Add a timer to spawn new enemy spaceships regularly
        const spawnTimer = new Timer({
            fcn: () => this.spawnSpaceship(),
            interval: 5000, // every 5 seconds (increase this to spawn less frequently)
            repeats: true
        });
        this.add(spawnTimer);
        spawnTimer.start();

        this.add(this.scoreLabel);

        // Update the score label to ensure it starts at 0
        this.updateScoreLabel();

        // Voorkom dat de initialize-methode opnieuw wordt aangeroepen
        this.initialized = true;
    }

    updateScoreLabel() {
        this.scoreLabel.text = 'Score: ' + this.score;
    }

    spawnSpaceship() {
        const x = Math.random() * this.engine.drawWidth;
        const y = Math.random() * this.engine.drawHeight / 2;
        const spaceship = new Spaceship(x, y);
        this.add(spaceship);
    }

    increaseScore() {
        this.score += 1;
        this.updateScoreLabel();
    }

    onPostUpdate(engine, delta) {
        // Verwijder de initialized-flag om de initialize-methode opnieuw te kunnen aanroepen voor een nieuwe scene
        this.initialized = false;
    }
}
