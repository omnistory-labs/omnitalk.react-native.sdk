import {createContext} from 'react';
// import {OmnitalkType} from '../src/@types/omnitalk';
import {Omnitalk} from 'omnitalk-rn-test2-sdk';

// export const OmnitalkContext = createContext<OmnitalkType | null>(null);

export const OmnitalkContext = createContext<Omnitalk | null>(null);
