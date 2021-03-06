const ONE_SECOND = 1000
const ONE_MINUE = ONE_SECOND * 60
const ONE_HOUR = ONE_MINUE * 60

const SERVICES = {
    TRANSPO: 'transpo',
    WEATHER: 'weather',
    CALENDAR: 'calendar',
    GALLERY: 'gallery',
    FACEBOOK: 'facebook',
    INSTAGRAM: 'instagram',
    INFO: 'info'
}

module.exports = {
    server: 'https://localhost:8129',
    layout: [
        {
            h: 0.84,
            w: 1,
            layout: [
                {
                    w: 0.33,
                    h: 1,
                    layout: [
                        {
                            w: 1,
                            h: 0.5,
                            tile: SERVICES.INSTAGRAM
                        },
                        {
                            w: 1,
                            h: 0.5,
                            tile: SERVICES.FACEBOOK
                        }
                    ]
                },
                {
                    w: 0.33,
                    h: 1,
                    layout: [
                        {
                            w: 1,
                            h: 0.4,
                            tile: SERVICES.INFO
                        },
                        {
                            w: 1,
                            h: 0.6,
                            tile: SERVICES.GALLERY
                        }
                    ]
                },
                {
                    w: 0.33,
                    h: 1,
                    tile: SERVICES.CALENDAR
                }
            ]
        },
        {
            h: 0.16,
            w: 1,
            layout: [
                {
                    w: 0.5,
                    h: 1,
                    tile: SERVICES.TRANSPO
                },
                {
                    w: 0.5,
                    h: 1,
                    tile: SERVICES.WEATHER
                }
            ]
        }
    ],
    services: [
        { name: SERVICES.TRANSPO, timeout: 2 * ONE_MINUE },
        { name: SERVICES.WEATHER, timeout: ONE_HOUR },
        { name: SERVICES.CALENDAR, timeout: ONE_HOUR },
        { name: SERVICES.GALLERY, timeout: 4 * ONE_HOUR },
        { name: SERVICES.FACEBOOK, timeout: ONE_HOUR / 4 },
        { name: SERVICES.INSTAGRAM, timeout: ONE_HOUR }
    ]
}
