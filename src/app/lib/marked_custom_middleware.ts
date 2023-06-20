export default function customMiddleware(articleDir: string) {
    return {
        walkTokens(token: any) {
            if (!['link', 'image'].includes(token.type)) {
                return
            }
            if (!token.href.startsWith('/blog_posts')) {
                token.href = `/blog_posts/${articleDir}/${token.href}`
            }
        },
        renderer: {
            paragraph(text: string) {
                return `<p class="body-l">${text}</p>`
            },
            image(href: string, title: string, text: string) {
                return `<img src="${href}" alt="${text}">`
            }
        }
    }
}