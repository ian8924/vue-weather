export default function inputDelay(fun) {
    if (window.timeStemp) {
        clearTimeout(window.timeStemp);
        window.timeStemp = null;
    }
    window.timeStemp = setTimeout(() => {
        fun()
    }, 800);
};