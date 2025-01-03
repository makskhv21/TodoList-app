import nicePhoto1 from '../img/nicePhoto1.jpg';
import nicePhoto2 from '../img/nicePhoto2.jpg';
import nicePhoto3 from '../img/nicePhoto3.jpg';
import nicePhoto4 from '../img/nicePhoto4.jpg';
import nicePhoto5 from '../img/nicePhoto5.jpg';

const themes = {
  light: { background: '#ffffff', color: '#000000' },
  dark: { background: '#2c3e50', color: '#ffffff' },
  green: { background: '#2ecc71', color: '#ffffff' },
  pink: { background: '#ff6f61', color: '#000000' },
  yellow: { background: '#f1c40f', color: '#000000' },
  purple: { background: '#CC8DE6', color: '#ffffff' },
  lightGreen: { background: '#77D6BE', color: '#ffffff' },
  nicePhoto1: {
    background: `url(${nicePhoto1}) no-repeat center`,
    backgroundSize: 'contain',
  },

  nicePhoto2: {
    background: `url(${nicePhoto2}) no-repeat center center`,
    backgroundSize: 'contain',
    color: '#ffffff',
  },

  nicePhoto3: {
    background: `url(${nicePhoto3}) no-repeat center center`,
    backgroundSize: 'contain',
    color: '#ffffff',
  },

  nicePhoto4: {
    background: `url(${nicePhoto4}) no-repeat center center`,
    backgroundSize: 'contain',
    color: '#ffffff',
  },
  nicePhoto5: {
    background: `url(${nicePhoto5}) no-repeat center center`,
    backgroundSize: 'contain',
    color: '#ffffff',
  },
};

export default themes;
