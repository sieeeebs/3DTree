// useStore.ts
import { create } from "zustand";
import * as THREE from "three"; // Import THREE.Vector3 for type

// Define types for the points (startPoint and endPoint are of type THREE.Vector3)
interface Line {
  startPoint: THREE.Vector3;
  endPoint: THREE.Vector3;
}

// Define the Zustand store's state and actions
interface Store {
  lines: Line[]; // Array of lines
  addLine: (
    startPoint: THREE.Vector3,
    endPoint: THREE.Vector3
  ) => void; // Action to add a new line
  clearLines: () => void; // Optional action to clear all lines
}

// Create the Zustand store with proper types
const useStore = create<Store>((set) => ({
  lines: [], // Initialize lines as an empty array
  addLine: (startPoint, endPoint) =>
    set((state) => ({
      lines: [
        ...state.lines,
        { startPoint, endPoint }, // Add new line to the lines array
      ],
    })),
  clearLines: () => set({ lines: [] }), // Clear the lines array
}));

export default useStore;
