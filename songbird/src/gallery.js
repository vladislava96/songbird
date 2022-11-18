import birdsData from './js/dirds-data.js';
import Player from './js/audio-player.js';

const gallery = document.querySelector('.gallery');

function createGallery() {
  for (let birdData of birdsData) {

    for (let bird of birdData) {
      const container = document.createElement('div');
      container.classList = 'gallery-container';

      const birdImg = document.createElement('img');
      birdImg.src = bird.image;

      const birdName = document.createElement('p');
      birdName.textContent = bird.name;

      const birdSpecies = document.createElement('p');
      birdSpecies.textContent = bird.species;

      const birdDescription = document.createElement('p');
      birdDescription.textContent = bird.description;

      const birdData = document.createElement('div');
      birdData.append(birdName, birdSpecies, birdDescription);

      new Player(bird.audio, birdData);

      container.append(birdImg, birdData);

      gallery.append(container);
    }

  }

}

createGallery()



