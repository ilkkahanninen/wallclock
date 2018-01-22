import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { format } from 'date-fns';
import Block from '../Block';
import TextCarousel from '../TextCarousel';
import './TrainTimetable.css';

const TIME_FORMAT = 'HH:mm';

const TrainTimetable = ({ title, timetable, stations, categoryCodes }) => (
  <Block height={3} className="TrainTimetable__root">
    <div className="TrainTimetable__title">{title}</div>
    <table className="TrainTimetable__table">
      <tbody>
        {timetable.slice(0, 2).map((row, index) => {
          const train = `${row.trainType} ${row.trainNumber}`;
          const scheduledTime = format(
            row.timetable.scheduledTime,
            TIME_FORMAT,
          );
          const estimation =
            row.timetable.liveEstimateTime &&
            row.timetable.liveEstimateTime !== row.timetable.scheduledTime
              ? format(row.timetable.liveEstimateTime, TIME_FORMAT)
              : null;
          const track = row.timetable.commercialTrack;
          const route =
            (stations[row.departureStation] || row.departureStation) +
            ' – ' +
            (stations[row.terminus] || row.terminus);
          const causes = row.causes;
          return (
            <Fragment key={index}>
              <tr>
                <td rowSpan={causes.length > 0 ? 2 : 1}>
                  {estimation ? (
                    <div className="TrainTimetable__time TrainTimetable__highlight">
                      {estimation}
                    </div>
                  ) : (
                    <span className="TrainTimetable__time">
                      {scheduledTime}
                    </span>
                  )}
                </td>
                <td>{train}</td>
                <td>{route}</td>
                <td>#{track}</td>
              </tr>
              {causes.length > 0 && (
                <tr>
                  <td
                    colSpan={3}
                    className="TrainTimetable__highlight TrainTimetable__condensed"
                  >
                    +{row.timetable.differenceInMinutes} min:{' '}
                    <TextCarousel
                      texts={causes.map(code => categoryCodes[code] || code)}
                    />
                  </td>
                </tr>
              )}
            </Fragment>
          );
        })}
      </tbody>
    </table>
  </Block>
);

export const ArrivalTimetable = connect(state => ({
  title: 'Saapuvat',
  timetable: state.trains.arrivals,
  stations: state.trains.stations,
  categoryCodes: state.trains.categoryCodes,
}))(TrainTimetable);

export const DepartureTimetable = connect(state => ({
  title: 'Lähtevät',
  timetable: state.trains.departures,
  stations: state.trains.stations,
  categoryCodes: state.trains.categoryCodes,
}))(TrainTimetable);
