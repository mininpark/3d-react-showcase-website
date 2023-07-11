import React from 'react'
import { useSnapshot } from 'valtio'

import state from '../../store';

const Tab = ({ tab, isFilterTab, isActiveTab, handleClick }: any) => {
  const snap = useSnapshot(state);
  const activeStyles = isFilterTab && isActiveTab
    ? { backgroundColor: snap.color, opacity: 0.5 }
    : { backgroundColor: "transparent", opacity: 1 }

  return (
    <div
      key={tab.name}
      className={`tab-btn ${isFilterTab ? 'tab-btn--filter' : ''}`}
      onClick={handleClick}
      style={activeStyles}>
      <img src={tab.icon} alt={tab.name} className={`${isFilterTab ? 'tab-btn__icon--filter' : 'tab-btn__icon'}`} />
    </div>
  )
}

export default Tab