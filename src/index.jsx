import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';

const particlesOptions = {
  background: {
    color: {
      value: '#ffffff', // background color
    },
  },
  fpsLimit: 120,
  interactivity: {
    events: {
      onClick: { enable: true, mode: 'push' },
      onHover: { enable: true, mode: 'repulse' },
      resize: true,
    },
    modes: {
      push: { quantity: 4 },
      repulse: { distance: 100, duration: 0.4 },
    },
  },
  particles: {
    color: { value: '#000000' },
    links: {
      color: '#000000',
      distance: 150,
      enable: true,
      opacity: 0.5,
      width: 1,
    },
    collisions: { enable: true },
    move: { enable: true, speed: 2, outModes: { default: 'bounce' } },
    number: { density: { enable: true, area: 800 }, value: 80 },
    opacity: { value: 0.5 },
    shape: { type: 'circle' },
    size: { value: { min: 1, max: 5 } },
  },
  detectRetina: true,
};
export default particlesOptions;
