import highlight from 'highlight.js'

interface IFlagsObject {
    header: boolean
    align: string | null
}

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
            },
            table(header: string, body: string) {
                if (body) {
                    body = `<tbody class="border border-gray-400">${body}</tbody>`
                }

                const table = `<table class="border border-gray-400"><thead class="border border-gray-400">${header}</thead>${body}</table>`
                return `<div class="max-w-full overflow-x-scroll">${table}</div>`
            },
            tablecell(content: string, flags: IFlagsObject) {
                const type = flags.header ? 'th' : 'td'
                const align =
                    flags.align
                        ? `align=${flags.align}`
                        : ''
                const bgColor = type === 'th' ? 'bg-blue-100 dark:bg-gray-700' : ''
                return `<${type} ${align} class="body-l p-3 border-collapse ${bgColor} border border-gray-400">${content}</${type}>`
            },
            code(code: string, infostring: string, escaped: boolean) {
                const [lang, title] = infostring.split(':')
                return `<div class="w-full mt-6 mb-6 flex flex-col rounded-2xl bg-blue-100 dark:bg-gray-900">
                            <pre class="pl-4 pr-4 pt-1 pb-1 rounded-t-2xl bg-blue-300 dark:bg-gray-950">${title}</pre>
                            <pre class="whitespace-pre-wrap overflow-x-scroll ml-4 mr-4 mt-2 mb-4">${highlight.highlight(code, { language: lang }).value}</pre>
                        </div>`.trim()
            }
        }
    }
}