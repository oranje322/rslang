export const getItemTopPercent = item => (item.getBoundingClientRect().top * 100) / window.innerHeight;
export const getRandomNumber = (min, max) => Math.round(Math.random() * (max - min) + min);