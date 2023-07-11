import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSnapshot } from 'valtio';
import {
  headContainerAnimation,
  headContentAnimation,
  headTextAnimation,
  slideAnimation,
} from '../config/motion.js';
import state from '../store/index.js';
import { CustomButton } from '../components';

const Home = () => {
  // useSnapshot: Create a local snapshot that catches changes. This hook actually returns a wrapped snapshot in a proxy for render optimization instead of a plain object compared to snapshot() method.
  const snap = useSnapshot(state);
  return (
    <AnimatePresence>
      {snap.intro && (
        <motion.section className="home" {...slideAnimation('left')}>
          <motion.header {...slideAnimation('down')}>
            <img src="threejs.png" alt="logo" className="header__logo" />
          </motion.header>
          <motion.div className="home__content" {...headContainerAnimation}>
            <motion.div {...headTextAnimation}>
              <h1 className="head-text">
                LET&apos;S <br /> DO IT{' '}
              </h1>
            </motion.div>
            <motion.div {...headContentAnimation} className="home__description">
              <p>
                Create your unique and exclusive shirt with our brand-new 3D
                customization tool. <strong>Unleash your imagination</strong>{' '}
                and define your own style.
              </p>
              <CustomButton
                type="filled"
                title="Customize it"
                handleClick={() => (state.intro = false)}
              />
            </motion.div>
          </motion.div>
        </motion.section>
      )}
    </AnimatePresence>
  );
};

export default Home;
