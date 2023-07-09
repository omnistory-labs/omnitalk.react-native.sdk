import {createContext} from 'react';
import Omnitalk from 'omnitalk-rn-sdk';

export const OmnitalkContext = createContext<Omnitalk | null>(null);
