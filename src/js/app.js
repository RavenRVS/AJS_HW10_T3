import GameSavingLoader from './game_saving_loader';

GameSavingLoader.load().then((saving) => {
  console.log(saving);
}).catch((error) => {
  console.error(error);
});
