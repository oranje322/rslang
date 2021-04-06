export const getItemTopPercent = item => (item.getBoundingClientRect().top * 100) / window.innerHeight;

export const getRandomNumber = (min, max) => Math.round(Math.random() * (max - min) + min);

export const playSound = (sound, volume = 1) => {
  sound.currentTime = 0;
  sound.volume = volume;
  sound.play();
}

export function shuffleList(list) {
  const newList = list;
  let currentIndex = list.length;
  let temporaryValue;
  let randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = list[currentIndex];
    newList[currentIndex] = list[randomIndex];
    newList[randomIndex] = temporaryValue;
  }

  return newList;
}