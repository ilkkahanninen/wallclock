# Wallclock

Clock, current temperature, weather forecast and train timetable info screen/kiosk. This is only a personal project for personal use. I don't give any guarantee or support.

Use as you please.

## Prerequisite

* Node 8.4.0 or newer

Build process does not work on Windows.

## Installation

Run `npm install` or `yarn install`

Create an `.env` file with following variables:

```
REACT_APP_FMI_API_KEY = FMI-API-key-here
REACT_APP_OWM_API_KEY = OpenWeatherMap-API-key-here
```

Acquire FMI API key from [here](https://ilmatieteenlaitos.fi/rekisteroityminen-avoimen-datan-kayttajaksi) and OpenWeatherMap key from [here](https://home.openweathermap.org/users/sign_up).

## Development

Run `npm start` or `yarn start`.

## Deployment

Build with `npm run build`.

There is also `deploy` script available for AWS S3. Adjust as you need.