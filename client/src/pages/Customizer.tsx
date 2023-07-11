import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useSnapshot } from 'valtio';
import state from '../store/index.js';
import config from '../config/config.js';
import { download } from '../assets/index.js';
import { downloadCanvasToImage, reader } from '../config/helpers.js';
import { EditorTabs, FilterTabs, DecalTypes } from '../config/constants.js';
import { fadeAnimation, slideAnimation } from '../config/motion.js';
import {
  AIPicker,
  ColorPicker,
  FilePicker,
  CustomButton,
  Tab,
} from '../components/index.js';

const Customizer = () => {
  const snap = useSnapshot(state);
  const [file, setFile] = useState('');
  const [prompt, setPrompt] = useState('');
  const [generatingImg, setGeneratingImg] = useState(false);
  const [activeEditorTab, setActiveEditorTab] = useState('');
  const [activeFilterTab, setActiveFilterTab] = useState({
    logoShirt: true,
    stylishShirt: false,
  });

  // to show tab content depending on the active tab
  const generateTabContent = () => {
    // track active tab
    switch (activeEditorTab) {
      // if activeEditorTab meets each following case
      case 'colorPicker':
        return <ColorPicker />;
      case 'filePicker':
        return <FilePicker />;
      case 'aiPicker':
        return <AIPicker />;

      default:
        return null;
    }
  };

  return (
    <AnimatePresence>
      {!snap.intro && (
        <>
          <motion.div className="customizer" {...slideAnimation('left')}>
            <div className="customizer__wrapper">
              <div className="editortabs-container tabs">
                {EditorTabs.map((tab) => (
                  <Tab
                    key={tab.name}
                    tab={tab}
                    handleClick={() => setActiveEditorTab(tab.name)}
                  />
                ))}
                {generateTabContent()}
              </div>
            </div>
          </motion.div>
          <motion.div className="customizer__back-btn" {...fadeAnimation}>
            <CustomButton
              type="filled"
              title="Go Back"
              handleClick={() => (state.intro = true)}
            />
          </motion.div>
          <motion.div
            className="filtertabs-container"
            {...slideAnimation('up')}
          >
            {FilterTabs.map((tab) => (
              <Tab
                key={tab.name}
                tab={tab}
                isFilterTab
                isActiveTab=""
                handleClick={() => { }}
              />
            ))}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Customizer;
