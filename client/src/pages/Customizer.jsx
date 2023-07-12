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
      case 'colorpicker':
        return <ColorPicker />;
      case 'filepicker':
        return <FilePicker file={file} setFile={setFile} readFile={readFile} />;
      case 'aipicker':
        return (
          <AIPicker
            prompt={prompt}
            setPrompt={setPrompt}
            generatingImg={generatingImg}
            handleSubmit={handleSubmit}
          />
        );

      default:
        return null;
    }
  };

  const handleSubmit = async (type) => {
    if (!prompt) return alert('please enter a prompt');

    try {
      // call our backend to generate the ai picker
    } catch (error) {
      alert(error);
    } finally {
      setGeneratingImg(false);
      setActiveEditorTab('');
    }
  };

  const handleDecals = (type, result) => {
    // update shirt
    const decalType = DecalTypes[type];
    state[decalType.stateProperty] = result;

    if (!activeFilterTab[decalType.filterTab]) {
      handleActiveFilterTab(decalType.filterTab);
    }
  };

  const handleActiveFilterTab = (tabName) => {
    switch (tabName) {
      case 'logoShirt':
        state.isLogoTexture = !activeFilterTab[tabName];
        break;
      case 'stylishShirt':
        state.isFullTexture = !activeFilterTab[tabName];
        break;
      default:
        state.isLogoTexture = true;
        state.isFullTexture = false;
    }
    // after setting the state, activeFilterTab is updated

    setActiveEditorTab((prevState) => {
      return {
        ...prevState,
        [tabName]: !prevState[tabName], // to toggle on and off
      };
    });
  };

  const readFile = (type) => {
    reader(file).then((result) => {
      handleDecals(type, result);
      setActiveEditorTab('');
    });
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
                {/* to show tab contents below */}
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
                isActiveTab={activeFilterTab[tab.name]}
                handleClick={() => handleActiveFilterTab(tab.name)}
              />
            ))}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Customizer;
