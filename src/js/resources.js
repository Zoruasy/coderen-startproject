import { ImageSource, Loader } from "excalibur";

// Define image resources
const dragonImage = new ImageSource('/images/dragon.png');
const spaceshipImage = new ImageSource('/images/spaceship.png');
const bulletImage = new ImageSource('/images/bullet.png');
const laserImage = new ImageSource('/images/laser.png');
const backgroundImage = new ImageSource('/images/background.png');
const buttonImage = new ImageSource('/images/button.png');
const gameLogoImage = new ImageSource('/images/gamelogo.png');

// Group resources in an object
const Resources = {
    Dragon: dragonImage,
    Spaceship: spaceshipImage,
    Bullet: bulletImage,
    Background: backgroundImage,
    Laser: laserImage,
    Button: buttonImage,
    GameLogo: gameLogoImage,
};

// Create a loader with all the resources
const ResourceLoader = new Loader(Object.values(Resources));

export { Resources, ResourceLoader };
