import { atom } from "recoil";

const testCountState = atom({
  key: "testCount",
  default: 0,
});

export const testCountActions = {
  increment: (prev: number) => {
    return prev >= 10 ? 10 : prev + 1;
  },
  decrement: (prev: number) => {
    return prev <= 0 ? 0 : prev - 1;
  },
  reset: () => {
    return 0;
  },
};

export default testCountState;
