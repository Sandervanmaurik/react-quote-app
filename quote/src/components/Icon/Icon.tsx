import React from 'react';
import './Icon.scss';

// External
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library, icon, } from '@fortawesome/fontawesome-svg-core';
import { faLightbulb, faFaceGrinBeam, faQuestion, faFaceMeh } from '@fortawesome/free-solid-svg-icons';

library.add(faLightbulb, faFaceGrinBeam, faQuestion, faFaceMeh);

const Icon = ({ name, color }: any) => {
  return (
    <div className="icon">
      <FontAwesomeIcon className="icon" icon={name} color={color} />
    </div>
  );
};

export default Icon;