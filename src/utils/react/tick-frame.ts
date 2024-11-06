export const tickFrame = <T extends (...args: any) => void>(callback: T) => {
  let ticking = false;
  function tick(this: any, ...args: Parameters<T>) {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        callback.apply(this, args);
        ticking = false;
      });
    }
    ticking = true;
  }
  return tick;
};
