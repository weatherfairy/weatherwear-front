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
    night_opacity: '#1A394E',
    day_yesterday: '#A9C8FE',
    day_today: '#B0D7FF',
    day_tomorrow: '#C0CEED',
    night_yesterday: '#3D556D',
    night_today: '#1D445D',
    night_tomorrow: '#505A62'
};

export const theme = {
    background: Colors.white,
    text: Colors.black,
    highlight: Colors.wear_highlight,
    grey: Colors.grey
}

export const dayTheme = {
    background: Colors.day_main,
    text: Colors.black,
    highlight: Colors.day_highlight,
    forecastContainer: Colors.day_opacity,

    unselecIndic: Colors.grey,
    selecIndic: Colors.day_highlight,

    wearBackground: Colors.white,
    wearText: Colors.black,
    wearHighlight: Colors.wear_highlight,
    grey: Colors.grey,

    yesterdayBox: Colors.day_yesterday,
    todayBox: Colors.day_today,
    tomorrowBox: Colors.day_tomorrow,
}

export const nightTheme = {
    background: Colors.night_main,
    text: Colors.white,
    highlight: Colors.night_highlight,
    forecastContainer: Colors.night_opacity,

    unselecIndic: Colors.grey,
    selecIndic: Colors.night_highlight,

    wearBackground: Colors.white,
    wearText: Colors.black,
    wearHighlight: Colors.wear_highlight,
    grey: Colors.grey,

    yesterdayBox: Colors.night_yesterday,
    todayBox: Colors.night_today,
    tomorrowBox: Colors.night_tomorrow,
}