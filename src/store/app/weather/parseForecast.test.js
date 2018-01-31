/* globals it, expect */
import parseForecast from './parseForecast';

const forecastData = JSON.parse(
  `{"cod":"200","message":0.0073,"cnt":40,"list":[{"dt":1517421600,"main":{"temp":264.39,"temp_min":263.103,"temp_max":264.39,"pressure":1017.62,"sea_level":1020.57,"grnd_level":1017.62,"humidity":97,"temp_kf":1.28},"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01n"}],"clouds":{"all":20},"wind":{"speed":4.37,"deg":114.503},"snow":{"3h":0.001},"sys":{"pod":"n"},"dt_txt":"2018-01-31 18:00:00"},{"dt":1517432400,"main":{"temp":264.92,"temp_min":263.959,"temp_max":264.92,"pressure":1016.73,"sea_level":1019.61,"grnd_level":1016.73,"humidity":96,"temp_kf":0.96},"weather":[{"id":802,"main":"Clouds","description":"scattered clouds","icon":"03n"}],"clouds":{"all":36},"wind":{"speed":5.16,"deg":110},"snow":{},"sys":{"pod":"n"},"dt_txt":"2018-01-31 21:00:00"},{"dt":1517443200,"main":{"temp":265.07,"temp_min":264.424,"temp_max":265.07,"pressure":1015.72,"sea_level":1018.64,"grnd_level":1015.72,"humidity":93,"temp_kf":0.64},"weather":[{"id":802,"main":"Clouds","description":"scattered clouds","icon":"03n"}],"clouds":{"all":32},"wind":{"speed":5.46,"deg":107.5},"snow":{},"sys":{"pod":"n"},"dt_txt":"2018-02-01 00:00:00"},{"dt":1517454000,"main":{"temp":264.54,"temp_min":264.216,"temp_max":264.54,"pressure":1014.87,"sea_level":1017.78,"grnd_level":1014.87,"humidity":89,"temp_kf":0.32},"weather":[{"id":802,"main":"Clouds","description":"scattered clouds","icon":"03n"}],"clouds":{"all":36},"wind":{"speed":6.02,"deg":105.01},"snow":{},"sys":{"pod":"n"},"dt_txt":"2018-02-01 03:00:00"},{"dt":1517464800,"main":{"temp":264.323,"temp_min":264.323,"temp_max":264.323,"pressure":1014.8,"sea_level":1017.8,"grnd_level":1014.8,"humidity":83,"temp_kf":0},"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01n"}],"clouds":{"all":48},"wind":{"speed":6.75,"deg":106.001},"snow":{"3h":0.002},"sys":{"pod":"n"},"dt_txt":"2018-02-01 06:00:00"},{"dt":1517475600,"main":{"temp":264.771,"temp_min":264.771,"temp_max":264.771,"pressure":1015.48,"sea_level":1018.39,"grnd_level":1015.48,"humidity":80,"temp_kf":0},"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01d"}],"clouds":{"all":56},"wind":{"speed":6.81,"deg":100},"snow":{"3h":0.03},"sys":{"pod":"d"},"dt_txt":"2018-02-01 09:00:00"},{"dt":1517486400,"main":{"temp":265.52,"temp_min":265.52,"temp_max":265.52,"pressure":1015.68,"sea_level":1018.64,"grnd_level":1015.68,"humidity":76,"temp_kf":0},"weather":[{"id":600,"main":"Snow","description":"light snow","icon":"13d"}],"clouds":{"all":68},"wind":{"speed":6.26,"deg":91.0002},"snow":{"3h":0.0875},"sys":{"pod":"d"},"dt_txt":"2018-02-01 12:00:00"},{"dt":1517497200,"main":{"temp":265.291,"temp_min":265.291,"temp_max":265.291,"pressure":1016.16,"sea_level":1019,"grnd_level":1016.16,"humidity":77,"temp_kf":0},"weather":[{"id":600,"main":"Snow","description":"light snow","icon":"13n"}],"clouds":{"all":76},"wind":{"speed":5.97,"deg":77.5006},"snow":{"3h":0.10375},"sys":{"pod":"n"},"dt_txt":"2018-02-01 15:00:00"},{"dt":1517508000,"main":{"temp":264.533,"temp_min":264.533,"temp_max":264.533,"pressure":1017.01,"sea_level":1020.03,"grnd_level":1017.01,"humidity":77,"temp_kf":0},"weather":[{"id":600,"main":"Snow","description":"light snow","icon":"13n"}],"clouds":{"all":88},"wind":{"speed":5.72,"deg":69.5011},"snow":{"3h":0.05625},"sys":{"pod":"n"},"dt_txt":"2018-02-01 18:00:00"},{"dt":1517518800,"main":{"temp":263.923,"temp_min":263.923,"temp_max":263.923,"pressure":1017.86,"sea_level":1020.79,"grnd_level":1017.86,"humidity":80,"temp_kf":0},"weather":[{"id":600,"main":"Snow","description":"light snow","icon":"13n"}],"clouds":{"all":68},"wind":{"speed":5.37,"deg":62.0029},"snow":{"3h":0.0525},"sys":{"pod":"n"},"dt_txt":"2018-02-01 21:00:00"},{"dt":1517529600,"main":{"temp":263.797,"temp_min":263.797,"temp_max":263.797,"pressure":1017.97,"sea_level":1020.95,"grnd_level":1017.97,"humidity":81,"temp_kf":0},"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01n"}],"clouds":{"all":68},"wind":{"speed":5.12,"deg":52.004},"snow":{"3h":0.0075},"sys":{"pod":"n"},"dt_txt":"2018-02-02 00:00:00"},{"dt":1517540400,"main":{"temp":264.624,"temp_min":264.624,"temp_max":264.624,"pressure":1018.11,"sea_level":1021.09,"grnd_level":1018.11,"humidity":81,"temp_kf":0},"weather":[{"id":600,"main":"Snow","description":"light snow","icon":"13n"}],"clouds":{"all":80},"wind":{"speed":5.36,"deg":41.5023},"snow":{"3h":0.035},"sys":{"pod":"n"},"dt_txt":"2018-02-02 03:00:00"},{"dt":1517551200,"main":{"temp":264.356,"temp_min":264.356,"temp_max":264.356,"pressure":1018.59,"sea_level":1021.5,"grnd_level":1018.59,"humidity":83,"temp_kf":0},"weather":[{"id":600,"main":"Snow","description":"light snow","icon":"13n"}],"clouds":{"all":56},"wind":{"speed":5.26,"deg":36.5014},"snow":{"3h":0.0325},"sys":{"pod":"n"},"dt_txt":"2018-02-02 06:00:00"},{"dt":1517562000,"main":{"temp":263.776,"temp_min":263.776,"temp_max":263.776,"pressure":1019.71,"sea_level":1022.61,"grnd_level":1019.71,"humidity":81,"temp_kf":0},"weather":[{"id":600,"main":"Snow","description":"light snow","icon":"13d"}],"clouds":{"all":48},"wind":{"speed":5,"deg":33.0012},"snow":{"3h":0.0325},"sys":{"pod":"d"},"dt_txt":"2018-02-02 09:00:00"},{"dt":1517572800,"main":{"temp":263.945,"temp_min":263.945,"temp_max":263.945,"pressure":1020.61,"sea_level":1023.45,"grnd_level":1020.61,"humidity":80,"temp_kf":0},"weather":[{"id":600,"main":"Snow","description":"light snow","icon":"13d"}],"clouds":{"all":20},"wind":{"speed":4.91,"deg":31.0032},"snow":{"3h":0.04},"sys":{"pod":"d"},"dt_txt":"2018-02-02 12:00:00"},{"dt":1517583600,"main":{"temp":262.208,"temp_min":262.208,"temp_max":262.208,"pressure":1021.7,"sea_level":1024.61,"grnd_level":1021.7,"humidity":86,"temp_kf":0},"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01n"}],"clouds":{"all":12},"wind":{"speed":4.46,"deg":31.5016},"snow":{"3h":0.015},"sys":{"pod":"n"},"dt_txt":"2018-02-02 15:00:00"},{"dt":1517594400,"main":{"temp":260.6,"temp_min":260.6,"temp_max":260.6,"pressure":1023.03,"sea_level":1025.97,"grnd_level":1023.03,"humidity":91,"temp_kf":0},"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"02n"}],"clouds":{"all":8},"wind":{"speed":4.01,"deg":33.0034},"snow":{},"sys":{"pod":"n"},"dt_txt":"2018-02-02 18:00:00"},{"dt":1517605200,"main":{"temp":259.658,"temp_min":259.658,"temp_max":259.658,"pressure":1024.2,"sea_level":1027.26,"grnd_level":1024.2,"humidity":91,"temp_kf":0},"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01n"}],"clouds":{"all":8},"wind":{"speed":3.68,"deg":35.0015},"snow":{"3h":0.0024999999999999},"sys":{"pod":"n"},"dt_txt":"2018-02-02 21:00:00"},{"dt":1517616000,"main":{"temp":259.152,"temp_min":259.152,"temp_max":259.152,"pressure":1025.51,"sea_level":1028.44,"grnd_level":1025.51,"humidity":95,"temp_kf":0},"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01n"}],"clouds":{"all":20},"wind":{"speed":3.41,"deg":36.0107},"snow":{"3h":0.0025000000000001},"sys":{"pod":"n"},"dt_txt":"2018-02-03 00:00:00"},{"dt":1517626800,"main":{"temp":259.142,"temp_min":259.142,"temp_max":259.142,"pressure":1026.4,"sea_level":1029.32,"grnd_level":1026.4,"humidity":87,"temp_kf":0},"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01n"}],"clouds":{"all":32},"wind":{"speed":3.23,"deg":37},"snow":{"3h":0.005},"sys":{"pod":"n"},"dt_txt":"2018-02-03 03:00:00"},{"dt":1517637600,"main":{"temp":258.207,"temp_min":258.207,"temp_max":258.207,"pressure":1027.28,"sea_level":1030.32,"grnd_level":1027.28,"humidity":86,"temp_kf":0},"weather":[{"id":801,"main":"Clouds","description":"few clouds","icon":"02n"}],"clouds":{"all":20},"wind":{"speed":2.76,"deg":36.5001},"snow":{},"sys":{"pod":"n"},"dt_txt":"2018-02-03 06:00:00"},{"dt":1517648400,"main":{"temp":258.732,"temp_min":258.732,"temp_max":258.732,"pressure":1028.92,"sea_level":1031.96,"grnd_level":1028.92,"humidity":90,"temp_kf":0},"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01d"}],"clouds":{"all":32},"wind":{"speed":2.53,"deg":42.5032},"snow":{"3h":0.0075},"sys":{"pod":"d"},"dt_txt":"2018-02-03 09:00:00"},{"dt":1517659200,"main":{"temp":262.17,"temp_min":262.17,"temp_max":262.17,"pressure":1029.92,"sea_level":1032.93,"grnd_level":1029.92,"humidity":86,"temp_kf":0},"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01d"}],"clouds":{"all":64},"wind":{"speed":2.87,"deg":54.0024},"snow":{"3h":0.015},"sys":{"pod":"d"},"dt_txt":"2018-02-03 12:00:00"},{"dt":1517670000,"main":{"temp":261.939,"temp_min":261.939,"temp_max":261.939,"pressure":1031.18,"sea_level":1034.16,"grnd_level":1031.18,"humidity":76,"temp_kf":0},"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01n"}],"clouds":{"all":48},"wind":{"speed":3.16,"deg":58.5002},"snow":{"3h":0.025},"sys":{"pod":"n"},"dt_txt":"2018-02-03 15:00:00"},{"dt":1517680800,"main":{"temp":260.268,"temp_min":260.268,"temp_max":260.268,"pressure":1032.41,"sea_level":1035.4,"grnd_level":1032.41,"humidity":87,"temp_kf":0},"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01n"}],"clouds":{"all":32},"wind":{"speed":2.57,"deg":54.5048},"snow":{"3h":0.0225},"sys":{"pod":"n"},"dt_txt":"2018-02-03 18:00:00"},{"dt":1517691600,"main":{"temp":259.599,"temp_min":259.599,"temp_max":259.599,"pressure":1033.61,"sea_level":1036.61,"grnd_level":1033.61,"humidity":92,"temp_kf":0},"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01n"}],"clouds":{"all":20},"wind":{"speed":2.11,"deg":19.5007},"snow":{"3h":0.0175},"sys":{"pod":"n"},"dt_txt":"2018-02-03 21:00:00"},{"dt":1517702400,"main":{"temp":258.131,"temp_min":258.131,"temp_max":258.131,"pressure":1034.62,"sea_level":1037.67,"grnd_level":1034.62,"humidity":87,"temp_kf":0},"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01n"}],"clouds":{"all":0},"wind":{"speed":2.56,"deg":18.0002},"snow":{},"sys":{"pod":"n"},"dt_txt":"2018-02-04 00:00:00"},{"dt":1517713200,"main":{"temp":257.92,"temp_min":257.92,"temp_max":257.92,"pressure":1035.66,"sea_level":1038.79,"grnd_level":1035.66,"humidity":80,"temp_kf":0},"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01n"}],"clouds":{"all":0},"wind":{"speed":3.02,"deg":17.0005},"snow":{"3h":0.0024999999999999},"sys":{"pod":"n"},"dt_txt":"2018-02-04 03:00:00"},{"dt":1517724000,"main":{"temp":259.032,"temp_min":259.032,"temp_max":259.032,"pressure":1036.69,"sea_level":1039.74,"grnd_level":1036.69,"humidity":81,"temp_kf":0},"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01n"}],"clouds":{"all":0},"wind":{"speed":4.12,"deg":15.0032},"snow":{},"sys":{"pod":"n"},"dt_txt":"2018-02-04 06:00:00"},{"dt":1517734800,"main":{"temp":261.078,"temp_min":261.078,"temp_max":261.078,"pressure":1038.15,"sea_level":1041.14,"grnd_level":1038.15,"humidity":82,"temp_kf":0},"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01d"}],"clouds":{"all":0},"wind":{"speed":4.37,"deg":22.5014},"snow":{},"sys":{"pod":"d"},"dt_txt":"2018-02-04 09:00:00"},{"dt":1517745600,"main":{"temp":262.55,"temp_min":262.55,"temp_max":262.55,"pressure":1039.37,"sea_level":1042.37,"grnd_level":1039.37,"humidity":85,"temp_kf":0},"weather":[{"id":802,"main":"Clouds","description":"scattered clouds","icon":"03d"}],"clouds":{"all":36},"wind":{"speed":3.4,"deg":26.5014},"snow":{},"sys":{"pod":"d"},"dt_txt":"2018-02-04 12:00:00"},{"dt":1517756400,"main":{"temp":260.537,"temp_min":260.537,"temp_max":260.537,"pressure":1040.36,"sea_level":1043.42,"grnd_level":1040.36,"humidity":86,"temp_kf":0},"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01n"}],"clouds":{"all":0},"wind":{"speed":2.91,"deg":20.0022},"snow":{},"sys":{"pod":"n"},"dt_txt":"2018-02-04 15:00:00"},{"dt":1517767200,"main":{"temp":257.329,"temp_min":257.329,"temp_max":257.329,"pressure":1040.93,"sea_level":1043.94,"grnd_level":1040.93,"humidity":84,"temp_kf":0},"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01n"}],"clouds":{"all":0},"wind":{"speed":1.6,"deg":10.0003},"snow":{},"sys":{"pod":"n"},"dt_txt":"2018-02-04 18:00:00"},{"dt":1517778000,"main":{"temp":256.085,"temp_min":256.085,"temp_max":256.085,"pressure":1040.99,"sea_level":1044.21,"grnd_level":1040.99,"humidity":73,"temp_kf":0},"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01n"}],"clouds":{"all":0},"wind":{"speed":1.32,"deg":354.002},"snow":{},"sys":{"pod":"n"},"dt_txt":"2018-02-04 21:00:00"},{"dt":1517788800,"main":{"temp":255.371,"temp_min":255.371,"temp_max":255.371,"pressure":1040.55,"sea_level":1043.75,"grnd_level":1040.55,"humidity":77,"temp_kf":0},"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01n"}],"clouds":{"all":0},"wind":{"speed":0.6,"deg":322.003},"snow":{},"sys":{"pod":"n"},"dt_txt":"2018-02-05 00:00:00"},{"dt":1517799600,"main":{"temp":254.875,"temp_min":254.875,"temp_max":254.875,"pressure":1040.14,"sea_level":1043.25,"grnd_level":1040.14,"humidity":69,"temp_kf":0},"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01n"}],"clouds":{"all":0},"wind":{"speed":1.33,"deg":220.005},"snow":{},"sys":{"pod":"n"},"dt_txt":"2018-02-05 03:00:00"},{"dt":1517810400,"main":{"temp":255.324,"temp_min":255.324,"temp_max":255.324,"pressure":1038.66,"sea_level":1041.82,"grnd_level":1038.66,"humidity":66,"temp_kf":0},"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"02n"}],"clouds":{"all":8},"wind":{"speed":2.74,"deg":176},"snow":{},"sys":{"pod":"n"},"dt_txt":"2018-02-05 06:00:00"},{"dt":1517821200,"main":{"temp":260.27,"temp_min":260.27,"temp_max":260.27,"pressure":1037.4,"sea_level":1040.5,"grnd_level":1037.4,"humidity":73,"temp_kf":0},"weather":[{"id":600,"main":"Snow","description":"light snow","icon":"13d"}],"clouds":{"all":88},"wind":{"speed":3.66,"deg":179.5},"snow":{"3h":0.1525},"sys":{"pod":"d"},"dt_txt":"2018-02-05 09:00:00"},{"dt":1517832000,"main":{"temp":264.189,"temp_min":264.189,"temp_max":264.189,"pressure":1035.84,"sea_level":1038.86,"grnd_level":1035.84,"humidity":85,"temp_kf":0},"weather":[{"id":600,"main":"Snow","description":"light snow","icon":"13d"}],"clouds":{"all":56},"wind":{"speed":3.97,"deg":187.001},"snow":{"3h":0.19},"sys":{"pod":"d"},"dt_txt":"2018-02-05 12:00:00"},{"dt":1517842800,"main":{"temp":262.52,"temp_min":262.52,"temp_max":262.52,"pressure":1034.8,"sea_level":1037.89,"grnd_level":1034.8,"humidity":91,"temp_kf":0},"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01n"}],"clouds":{"all":0},"wind":{"speed":3.51,"deg":184.502},"snow":{"3h":0.0050000000000001},"sys":{"pod":"n"},"dt_txt":"2018-02-05 15:00:00"}],"city":{"id":651951,"name":"Karleby","coord":{"lat":63.8333,"lon":23.0833},"country":"FI"}}`,
);

it('parses forecast data correctly', () => {
  const forecast = parseForecast(forecastData);
  expect(forecast.length).toBe(4);
  expect(forecast[0]).toEqual({
    clouds: 20,
    date: '2018-01-31T18:00:00.000Z',
    humidity: 97,
    icon: { code: '01n', color: '#90A4AE', weatherIcon: 'night-clear' },
    pressure: 1017.62,
    rain: null,
    snow: 0.001,
    temperature: -9,
    windDirection: 114.503,
    windSpeed: 4.37,
    windSpeedText: 'Kohtalaista tuulta',
  });
  expect(forecast[1]).toEqual({
    clouds: 36,
    date: '2018-01-31T21:00:00.000Z',
    humidity: 96,
    icon: { code: '03n', color: '#90A4AE', weatherIcon: 'cloud' },
    pressure: 1016.73,
    rain: null,
    snow: 0,
    temperature: -8,
    windDirection: 110,
    windSpeed: 5.16,
    windSpeedText: 'Kohtalaista tuulta',
  });
  expect(forecast[2]).toEqual({
    clouds: 48,
    date: '2018-02-01T06:00:00.000Z',
    humidity: 83,
    icon: { code: '01n', color: '#90A4AE', weatherIcon: 'night-clear' },
    pressure: 1014.8,
    rain: null,
    snow: 0.002,
    temperature: -9,
    windDirection: 106.001,
    windSpeed: 6.75,
    windSpeedText: 'Kohtalaista tuulta',
  });
  expect(forecast[3]).toEqual({
    clouds: 56,
    date: '2018-02-01T09:00:00.000Z',
    humidity: 80,
    icon: { code: '01d', color: '#FFEB3B', weatherIcon: 'day-sunny' },
    pressure: 1015.48,
    rain: null,
    snow: 0.03,
    temperature: -8,
    windDirection: 100,
    windSpeed: 6.81,
    windSpeedText: 'Kohtalaista tuulta',
  });
});