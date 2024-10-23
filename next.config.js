/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [{ key: "referrer-policy", value: "no-referrer" }], //This is how we set custom headers to all our request at all paths.
      },
    ];
  },
};

module.exports = nextConfig;
