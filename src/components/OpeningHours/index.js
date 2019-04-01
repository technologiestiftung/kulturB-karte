import React, { PureComponent, Fragment } from 'react';
import styled from 'styled-components';

const OpeningHoursWrapper = styled.div`
  display: block;
  color: ${props => props.theme.colors.textgrey};
`;

const OpeningHourItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0.2em 0;
`;

const Weekday = styled.div`
  margin-right: 1em;
`;

const OpeningTimes = (props) => {
  if (!props.data || props.data.length === 0) {
    return 'Geschlossen';
  }

  return (
    <div>{props.data[0]}</div>
  );
};

const OpeningHours = (props) => {
  if (props['24/7']) {
    return 'durchgehend geöffnet';
  }

  if (props.seasonal) {
    return 'Saisonabhängige Öffnungszeiten';
  }

  return (
    <Fragment>
      <OpeningHourItem>
        <Weekday>Montag</Weekday>
        <OpeningTimes data={props.mo} />
      </OpeningHourItem>
      <OpeningHourItem>
        <Weekday>Dienstag</Weekday>
        <OpeningTimes data={props.tu} />
      </OpeningHourItem>
      <OpeningHourItem>
        <Weekday>Mittwoch</Weekday>
        <OpeningTimes data={props.we} />
      </OpeningHourItem>
      <OpeningHourItem>
        <Weekday>Donnerstag</Weekday>
        <OpeningTimes data={props.th} />
      </OpeningHourItem>
      <OpeningHourItem>
        <Weekday>Freitag</Weekday>
        <OpeningTimes data={props.fr} />
      </OpeningHourItem>
      <OpeningHourItem>
        <Weekday>Samstag</Weekday>
        <OpeningTimes data={props.sa} />
      </OpeningHourItem>
      <OpeningHourItem>
        <Weekday>Sonntag</Weekday>
        <OpeningTimes data={props.su} />
      </OpeningHourItem>
    </Fragment>
  );
};

class OpeningHoursContainer extends PureComponent {
  render() {
    const { data } = this.props;

    if (!data || typeof data !== 'object') {
      return <OpeningHoursWrapper>keine Angaben</OpeningHoursWrapper>;
    }

    return (
      <OpeningHoursWrapper>
        <OpeningHours {...data} />
      </OpeningHoursWrapper>
    );
  }
}

export default OpeningHoursContainer;
