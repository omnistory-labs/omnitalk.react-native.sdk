import {createContext} from 'react';
import Omnitalk from 'omnitalk-rn-ellie-sdk';

export const OmnitalkContext = createContext<Omnitalk | null>(null);
