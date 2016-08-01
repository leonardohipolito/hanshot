//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

export default function debounce(fn, delay) {
  let timeoutId = null;

  const debounced = (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      fn(...args);
      clearTimeout(timeoutId);
    }, delay);
  };

  return debounced;
}
