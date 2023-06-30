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
            {
                source: '/article/20230639105933',
                destination: '/article/20230630105933',
                permanent: true
            }
        ]
    }
}

module.exports = nextConfig
