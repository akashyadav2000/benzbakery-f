
export const retryImport = (fn, retries = 3, delay = 500) =>
  new Promise((resolve, reject) => {
    fn()
      .then(resolve)
      .catch((error) => {
        if (retries <= 0) return reject(error);
        setTimeout(() => {
          retryImport(fn, retries - 1, delay).then(resolve).catch(reject);
        }, delay);
      });
  });
