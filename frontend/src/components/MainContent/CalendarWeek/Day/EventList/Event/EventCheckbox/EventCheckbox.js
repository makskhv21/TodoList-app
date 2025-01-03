import React from 'react';

const EventCheckbox = ({ completed, onToggleCompletion }) => (
  <input
    type="checkbox"
    checked={completed}
    onChange={onToggleCompletion}
    style={{ marginLeft: '5px' }}
  />
);

export default EventCheckbox;
