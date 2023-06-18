/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            {
                source: '/',
                destination: '/all/1',
                permanent: false
            },
            {
                source: '/art',
                destination: '/art/1',
                permanent: false
            },
            {
                source: '/tech',
                destination: '/tech/1',
                permanent: false
            },
        ]
    }
}

module.exports = nextConfig
