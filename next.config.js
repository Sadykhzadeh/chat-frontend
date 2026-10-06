/** @type {import('next').NextConfig} */
const runtimeCaching = require('next-pwa/cache')

// next-pwa takes its options when it is required, not under a `pwa` key of the
// Next config. Passing them the old way spread the runtimeCaching array across
// the root of the config - Next complained about root properties "0" to "21" -
// and the service worker was never configured.
const withPWA = require('next-pwa')({
  dest: 'public',
  runtimeCaching,
  disable: process.env.NODE_ENV === 'development',
})

module.exports = withPWA({
  // This was `strictMode: true`, which Next does not read: the option is
  // called reactStrictMode, so strict mode was never actually on.
  reactStrictMode: true,
})
