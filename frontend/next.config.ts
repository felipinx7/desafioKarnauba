/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // Ignora todos os erros de tipagem durante o build
    ignoreBuildErrors: true,
  },
  eslint: {
    // Ignora erros de ESLint também
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig