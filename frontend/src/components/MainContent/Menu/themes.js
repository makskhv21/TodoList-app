import niceScreen1 from './img/niceScreen1.jpg';

const themes = {
    light: { background: '#ffffff', color: '#000000' },
    dark: { background: '#2c3e50', color: '#ffffff' },
    blue: { background: '#3498db', color: '#ffffff' },
    green: { background: '#2ecc71', color: '#ffffff' },
    pink: { background: '#ff6f61', color: '#000000' },
    yellow: { background: '#f1c40f', color: '#000000' },
    purple: { background: '#9b59b6', color: '#ffffff' },
    orange: {     
        background: `url(${niceScreen1}) no-repeat center center`, 
        backgroundSize: 'cover', 
        color: '#ffffff' , color: '#ffffff', width: '100px', height: '100px' },
};

export default themes;