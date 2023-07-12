import React from 'react';
import { SketchPicker } from 'react-color';
import { useSnapshot } from 'valtio';

import state from '../../store';

const ColorPicker = () => {
  const snap = useSnapshot(state);

  return (
    <div className="picker__color">
      <SketchPicker
        color={snap.color}
        disableAlpha
        // presetColor
        onChange={(color) => state.color = color.hex} />
    </div>
  );
};

export default ColorPicker;
