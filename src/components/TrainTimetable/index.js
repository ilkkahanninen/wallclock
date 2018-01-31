import React from 'react';
import { connect } from 'react-redux';
import { format, differenceInMinutes } from 'date-fns';
import './TrainTimetable.css';

const TIME_FORMAT = 'HH:mm';

const isLate = timetable =>
  timetable.liveEstimateTime &&
  differenceInMinutes(timetable.liveEstimateTime, timetable.scheduledTime) >= 1;

const TrainTimetable = ({ title, timetable, stations, categoryCodes }) => (
  <div className="TrainTimetable">
    <div className="TrainTimetable__title">{title}</div>
    {timetable.slice(0, 3).map((row, index) => {
      const train = `${row.trainType} ${row.trainNumber}`;
      const scheduledTime = format(row.timetable.scheduledTime, TIME_FORMAT);
      const estimation = isLate(row.timetable)
        ? format(row.timetable.liveEstimateTime, TIME_FORMAT)
        : null;
      const track = row.timetable.commercialTrack;
      const route =
        (stations[row.departureStation] || row.departureStation) +
        ' – ' +
        (stations[row.terminus] || row.terminus);
      const causes = row.causes;
      return (
        <div key={index} className="TrainTimetable__item">
          <div className="TrainTimetable__essential">
            <div className="TrainTimetable__time">
              {scheduledTime}
              {estimation && (
                <span className="TrainTimetable__highlight">
                  {' '}
                  <i className="wi wi-direction-right" /> {estimation}
                </span>
              )}{' '}
            </div>
            <b>{train}</b>
            <div className="TrainTimetable__track">{track}</div>
          </div>
          <div className="TrainTimetable__info">
            <div>{route}</div>
            {estimation && (
              <div className="TrainTimetable__causes">
                {causes.map(code => categoryCodes[code] || code).join(', ')}
              </div>
            )}
          </div>
        </div>
      );
    })}
  </div>
);

export const ArrivalTimetable = connect(state => ({
  title: 'Saapuvat junat',
  timetable: state.trains.arrivals,
  stations: state.trains.stations,
  categoryCodes: state.trains.categoryCodes,
}))(TrainTimetable);

export const DepartureTimetable = connect(state => ({
  title: 'Lähtevät junat',
  timetable: state.trains.departures,
  stations: state.trains.stations,
  categoryCodes: state.trains.categoryCodes,
}))(TrainTimetable);
