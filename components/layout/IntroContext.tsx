'use client';
import { createContext, useContext } from 'react';

/** True once the initial loader has finished, so hero entrances start on cue. */
export const IntroContext = createContext(true);
export const useIntroReady = () => useContext(IntroContext);
