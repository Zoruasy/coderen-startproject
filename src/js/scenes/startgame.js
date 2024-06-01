import { Scene, Label, Font, FontUnit, Color, Actor, vec, Sprite } from "excalibur";
import { Resources } from '../resources.js';

export class StartGame extends Scene {
    onInitialize(engine) {
      // achtergrond
        const background = new Actor({
            pos: vec(engine.drawWidth / 2, engine.drawHeight / 2),
            width: engine.drawWidth,
            height: engine.drawHeight
        });
        background.graphics.use(Resources.Background.toSprite());
        this.add(background);

        // Game Logo
        const gameLogo = new Actor({
            pos: vec(engine.drawWidth / 2, engine.drawHeight / 2 - 250),
            width: 200,
            height: 100
        });
        gameLogo.graphics.use(Resources.GameLogo.toSprite());
        gameLogo.anchor.setTo(0.5, 0.5);
        this.add(gameLogo);

        // Game Title
        const gameStartLabel = new Label({
           
            pos: vec(engine.drawWidth / 2, engine.drawHeight / 2 - 100),
           
        });
        
        gameStartLabel.anchor.setTo(0.5, 0.5);
        this.add(gameStartLabel);

        // Start Button
        const startButton = new Actor({
            pos: vec(engine.drawWidth / 2, engine.drawHeight / 2 + 50),
            width: 200,
            height: 50
        });
        startButton.graphics.use(Resources.Button.toSprite());
        startButton.anchor.setTo(0.5, 0.5);
        this.add(startButton);

        // Button Text
        const buttonText = new Label({
            
            pos: vec(engine.drawWidth / 2, engine.drawHeight / 2 + 50),
            font: new Font({
                family: 'Arial',
                size: 30,
                unit: FontUnit.Px,
                color: Color.White,
                textAlign: 'center'
            })
        });
        buttonText.anchor.setTo(0.5, 0.5);
        this.add(buttonText);

        // Click event to go to main game scene
        startButton.on('pointerup', () => {
            engine.goToScene('maingame');
        });

        // Ensure the button is interactive
        startButton.enableCapturePointer = true;
        startButton.pointer.useGraphicsBounds = true;

        // Hover effect
        startButton.on('pointerenter', () => {
            startButton.color = Color.LightGray;
        });

        startButton.on('pointerleave', () => {
            startButton.color = Color.Gray;
        });
    }
}
