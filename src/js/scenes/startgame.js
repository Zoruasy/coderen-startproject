import { Scene, Label, Font, FontUnit, Color, Actor, vec } from "excalibur";
import { Resources } from '../resources.js';

export class StartGame extends Scene {
    onInitialize(engine) {
        // Game Over text
        const gameStartLabel = new Label({
            text: 'Start gaming',
            pos: vec(engine.drawWidth / 2, engine.drawHeight / 2 - 100),
            font: new Font({
                family: 'Arial',
                size: 50,
                unit: FontUnit.Px,
                color: Color.Red,
                textAlign: 'center'
            })
        });
        
        gameStartLabel.anchor.setTo(0.5, 0.5);
        this.add(gameStartLabel);

        // Restart button
        const startButton = new Actor({
            pos: vec(engine.drawWidth / 2, engine.drawHeight / 2),
            width: 200,
            height: 50,
            color: Color.Gray
        });
        startButton.anchor.setTo(0.5, 0.5);
        this.add(startButton);

        // Button text
        const buttonText = new Label({
            text: 'Start',
            pos: vec(engine.drawWidth / 2, engine.drawHeight / 2),
            font: new Font({
                family: 'Arial',
                size: 30,
                unit: FontUnit.Px,
                color: Color.White,
                textAlign: 'center'
            })
        });
        buttonText.anchor.setTo(0.5, .5);
        this.add(buttonText);

        // Click event to go to start scene
        startButton.on('pointerup', () => {
            engine.goToScene('maingame');
        });

        // Ensure the button is interactive
        startButton.enableCapturePointer = true;
        startButton.pointer.useGraphicsBounds = true;
    }
}