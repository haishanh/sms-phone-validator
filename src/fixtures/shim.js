/**
 * @see https://github.com/facebook/jest/issues/4545#issuecomment-333004504
 */
const raf = (global.requestAnimationFrame = cb => {
  setTimeout(cb, 0);
});

global.fetch = () => Promise.resolve();

export default raf;
