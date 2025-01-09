import { createSlice } from '@reduxjs/toolkit';

const buildingSlice = createSlice({
  name: 'building',
  initialState: {
    buildingId: null,
  },
  reducers: {
    setBuildingId: (state, action) => {      
      state.buildingId = action.payload; // building_id ni yangilash
    },
  },
});

export const { setBuildingId } = buildingSlice.actions;
export default buildingSlice.reducer; 