import * as React from 'react';

function CityInfo(props) {
  const { info } = props;
  const displayName = `${info.city}, ${info.state}`;

  return (
    <div>
      <div>
        {displayName} |{' '}
      </div>
      <img width={240} src={info.image} />
    </div>
  );
}

export default React.memo(CityInfo);
