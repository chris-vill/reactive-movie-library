const methods = {
  set(key, val) {
    try {
      localStorage.setItem(key, JSON.stringify(val));

    } catch(e) {
      console.error(e, ' Something went wrong.');
      return {
        errorMessage: e
      };
    }
  },

  get(key) {
    try {
      return JSON.parse(localStorage.getItem(key) || null);

    } catch(e) {
      console.error(e, ' Something went wrong.');
      return {
        errorMessage: e
      };
    }
  },

  remove(key) {
    try {
      localStorage.removeItem(key);

    } catch(e) {
      console.error(e, ' Something went wrong.');
      return {
        errorMessage: e
      };
    }
  },
};

export default methods;