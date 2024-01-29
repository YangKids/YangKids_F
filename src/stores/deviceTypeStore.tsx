import {create} from 'zustand';
import {DeviceType} from '../types'

interface DeviceTypeStore {
  deviceType?: DeviceType;
  setDeviceType: (type: DeviceType) => void;
}

const useDeviceTypeStore = create<DeviceTypeStore>((set) => ({
  deviceType: 'web',
  setDeviceType: (type) => set({ deviceType: type }),
}));

export default useDeviceTypeStore;