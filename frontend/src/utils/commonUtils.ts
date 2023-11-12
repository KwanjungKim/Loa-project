const commonUtils = {
  isClient: () => {
    return typeof window !== "undefined";
  },
};

export default commonUtils;
