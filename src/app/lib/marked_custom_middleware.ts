import highlight from 'highlight.js'
import katex from 'katex'

interface IFlagsObject {
    header: boolean
    align: string | null
}

function _math(expr: string) {
    if (expr.match(/^\$\$[\s\S]*\$\$$/)) {
        expr = expr.substring(2, expr.length - 2)
        return katex.renderToString(expr, { displayMode: true })
    }
    else if (expr.match(/^$[\s\S]*\$$/)) {
        expr = expr.substring(1, expr.length)
        return katex.renderToString(expr, { displayMode: true })
    }

    return expr
}

export default function customMiddleware(articleDir: string) {
    return {
        walkTokens(token: any) {
            // linkかimageじゃなければ除外
            if (!['link', 'image'].includes(token.type)) {
                return
            }
            // 普通のURLの場合は除外（"://"を含むか否か）
            if (token.href.match(/^.*:\/\/.*$/)) {
                return
            }
            // /blog_postsから始まっていない場合
            if (!token.href.startsWith('/blog_posts')) {
                token.href = `/blog_posts/${articleDir}/${token.href}`
            }
        },
        renderer: {
            paragraph(text: string) {
                return `<p class="body-l">${text}</p>`
            },
            image(href: string, title: string, text: string) {
                return `<a href="${href}" target="_new"><img class="rounded-2xl" src="${href}" alt="${text}"></a>`
            },
            table(header: string, body: string) {
                if (body) {
                    body = `<tbody class="border border-gray-400">${body}</tbody>`
                }

                const table = `<table class="border border-gray-400"><thead class="border border-gray-400">${header}</thead>${body}</table>`
                return `<div class="max-w-full overflow-x-auto mt-6 mb-6">${table}</div>`
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
                if (lang === 'math' && code.match(/^\$\$[\s\S]*\$\$$/)) {
                    const expr = code.substring(2, code.length - 2)
                    const renderedKatex = katex.renderToString(expr, { displayMode: true })
                    return `<div class="w-full mt-6 mb-6">${ renderedKatex }</div>`
                }
                else {
                    return `<div class="w-full mt-6 mb-6 flex flex-col rounded-2xl bg-blue-100 dark:bg-gray-900">
                                <pre class="pl-4 pr-4 pt-1 pb-1 rounded-t-2xl bg-blue-300 dark:bg-gray-950">${title}</pre>
                                <pre class="whitespace-pre-wrap overflow-x-auto ml-4 mr-4 mt-2 mb-4">${highlight.highlight(code, {language: lang}).value}</pre>
                            </div>`.trim()
                }
            },
            codespan(code: string) {
                if (code.match(/^\$[\s\S]*\$$/)) {
                    const expr = code.substring(1, code.length - 1)
                    return katex.renderToString(expr, { displayMode: false })
                }
                else {
                    return `<span class="p-1 rounded-md bg-blue-100 dark:bg-gray-900">${ code }</span>`
                }
            },
            list(body: string, ordered: boolean, start: number) {
                const type = ordered ? 'ol' : 'ul'
                const listStyle = ordered ? 'list-decimal' : 'list-disc'
                const startAttr = (ordered && start !== 1) ? `start="${start}"` : ''
                return `<${type} class="pl-10 ${listStyle}" ${startAttr}>${body}</${type}>`
            },
            listitem(text: string) {
                return `<li class="break-all">${text}</li>`
            },
            link(href: string, title: string, text: string) {
                const titleAttr = title ? ` title="${title}"` : ''
                return `<a class="body-l text-blue-500 hover:underline" href="${href}"${titleAttr}>${text}</a>`
            }
        }
    }
}
