import { createContext } from 'react';

const MapContext = createContext();

export const MapConsumer = MapContext.Consumer;
export const MapProvider = MapContext.Provider;

export default MapContext;
