import player from '@vimeo/player';
import throttle from 'lodash.throttle';

const STORAGE_KEY = 'videoplayer-current-time';
const iframe = document.querySelector('iframe');
const Player = new player(iframe);

function currentTime(data) {
  localStorage.setItem(STORAGE_KEY, data.seconds);
}

function getDataLS() {
  return localStorage.getItem(STORAGE_KEY) || 0;
}

Player.setCurrentTime(getDataLS());
Player.on('timeupdate', throttle(currentTime, 1000));
