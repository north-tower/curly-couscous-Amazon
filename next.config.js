/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = {
  images :{
    domains:["links.papareact.com","fakestoreapi.com","i.postimg.cc"]
}, eslint: {
  ignoreDuringBuilds: true,
},
env: {
   stripe_public_key: process.env.STRIPE_PUBLIC_KEY
},

} ,{nextConfig}

