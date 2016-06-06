//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

export default function log(...args) {
  // Disable logs for test env
  if (process.env.HANSHOT_TEST === 'true') return;

  // eslint-disable-next-line no-console
  console.log(...args);
}
