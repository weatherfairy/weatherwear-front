const Colors = {
    white: '#ffffff',
    black: '#111111',
    day_main: '#99ccff',
    night_main: '#103045',
    day_highlight: '#fff6b2',
    night_highlight: '#fed943',
    wear_highlight: '#3165f6',
    grey: '#dadada',
    day_opacity: '#B0D8FF',
    night_opacity: '#1A394E'
};

export const theme = {
}

export const dayTheme = {
    background: Colors.day_main,
    text: Colors.black,
    highlight: Colors.day_highlight,
    forecastContainer: Colors.day_opacity,

    unselecIndic: Colors.grey,
    selecIndic: Colors.day_highlight
}

export const nightTheme = {
    background: Colors.night_main,
    text: Colors.white,
    highlight: Colors.night_highlight,
    forecastContainer: Colors.night_opacity,

    unselecIndic: Colors.grey,
    selecIndic: Colors.night_highlight
}