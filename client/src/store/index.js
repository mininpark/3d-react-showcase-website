import { proxy } from 'valtio';

// By taking a snapshot of the state at a specific point, the library can compare it to previous versions and optimize the rendering process by determining which components need to be updated.
const state = proxy({
  intro: true,
  color: '#EFBD48',
  isLogoTexture: true,
  isFullTexture: false,
  logoDecal: './threejs.png',
  fullDecal: './threejs.png',
});

export default state;
