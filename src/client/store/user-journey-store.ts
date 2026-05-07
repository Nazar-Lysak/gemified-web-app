import { create, type StateCreator } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

interface initialState {
  isStarted: boolean;
}

interface JourneyActions {
  startJourney: () => void;
}

interface JourneyStore extends initialState, JourneyActions {}

const initialState: initialState = {
  isStarted: false,
};

const journeyStore: StateCreator<
  JourneyStore,
  [["zustand/devtools", never], ["zustand/persist", unknown]]
> = (set) => ({
  ...initialState,
  startJourney: () => set((state) => ({ isStarted: !state.isStarted }), false, "startJourney"),
});

const useJourneyStore = create<JourneyStore>()(
  devtools(
    persist(journeyStore, {
      name: "web-gemified-app",
      storage: createJSONStorage(() => localStorage),
    })
  )
);

export const useJourneyStarted = useJourneyStore;
export const getJourneyState = () => useJourneyStore.getState();
