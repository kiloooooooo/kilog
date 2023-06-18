import fs from 'fs'
import path from 'path'
import crypto from 'crypto'
import matter from 'gray-matter'
import imageSize from 'image-size'
import apiConfig from './apiconfig'

const baseDirRemote = '/blog_posts'
const baseDir = 'public' + baseDirRemote

type PostProperties = {
    dirname: string,
    title: string,
    datetime: string,
    category: string,
    tags: Array<string>,
    leadingImagePath: string,
    leadingImageWidth: number,
    leadingImageHeight: number,
}

type Post = {
    properties: PostProperties,
    markdown: string,
    images: Array<string>
}

/**
 * Dateオブジェクトを 2023-06-18 18:00:00 みたいな感じに
 * @param date 対象のDateオブジェクト
 */
function formatDate(date: Date) {
    return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
}

function getArticleCategoryMarkerPath(dir: string) {
    const markerFile = fs.readdirSync(path.resolve(dir), { withFileTypes: true })
        .filter((dirent, idx, arr) => dirent.isFile())
        .filter((file, idx, arr) => file.name.endsWith(apiConfig.categoryMarkerExt))
    return markerFile[0]
}

/**
 * カテゴリマーカを探してカテゴリを返す
 * 投稿ファイルが更新されていたり，そもそもマーカが存在しない場合は新たに作成
 * @param dir
 */
function getOrCreateCategoryMarker(dir: string) {
    const postFilePath = path.join(dir, 'post.md')
    const postFile = fs.readFileSync(postFilePath)
    const postFileChecksum = crypto.createHash('sha256').update(postFile).digest('hex')
    const catMarker = getArticleCategoryMarkerPath(dir)

    // catMarkerがundefinedでなければ（=マーカファイルが存在していれば）
    if (catMarker) {
        const catMarkerPath = path.resolve(path.join(catMarker.path, catMarker.name))
        const markerChecksum = fs.readFileSync(catMarkerPath, 'utf-8')

        // catMarkerのチェックサムと記事のチェックサムを比較
        if (postFileChecksum === markerChecksum) {
            // 合致すればそのカテゴリを返す
            return catMarker.name.split('.')[0]
        }

        // （存在していれば）旧カテゴリマーカを削除
        try {
            fs.statSync(catMarkerPath)    // ファイルが存在しなければエラー → catch
            fs.unlinkSync(catMarkerPath)
        } catch (e: any) {
            if (e.code === 'ENOENT') {
                // do nothing
            }
        }
    }

    // カテゴリマーカ作り直し
    const { data, content } = matter(postFile)
    const category = data['category'] ?? apiConfig.defaultCategoryName
    fs.writeFileSync(path.join(dir, `${category}${apiConfig.categoryMarkerExt}`), postFileChecksum, { encoding: 'utf-8' })
    return category
}

function remotePathToLocal(remotePath: string) {
    return path.resolve(path.join('public', remotePath))
}

/**
 * 投稿のディレクトリ一覧の総ページ数
 */
export function getPagesCount(filterCategory: string | null) {
    const dirs = fs.readdirSync(baseDir, { withFileTypes: true })
    const articlesCount =
        filterCategory == null
            ? dirs.length
            : dirs
                .filter((dirent, idx, arr) => dirent.isDirectory())
                .filter((dir, idx, arr) =>
                    getOrCreateCategoryMarker(path.join(dir.path, dir.name)) == filterCategory).length
    return Math.ceil(articlesCount / apiConfig.articlesPerPage)
}

/**
 * 投稿の一覧を取得
 */
export function getPosts(page: number = 1, filterCategory: string | null) {
    const dirs = fs.readdirSync(baseDir, { withFileTypes: true })
    const startIdx = (page-1) * apiConfig.articlesPerPage
    const endIdx = page * apiConfig.articlesPerPage
    let articleDirs = dirs
        .filter((d, idx, arr) => !(d.name.startsWith('.')))
        .filter((d, idx, arr) => d.isDirectory())

    if (filterCategory != null) {
        articleDirs = articleDirs
            .filter((dir, idx, arr) =>
                getOrCreateCategoryMarker(path.join(dir.path, dir.name)) == filterCategory)
    }

    return articleDirs
        .slice(startIdx, endIdx)
        .map((dir, idx, arr) => getPost(dir.name))
}

/**
 * ディレクトリ名から投稿を取得
 * @param postDirName 対象の投稿のディレクトリ名
 */
export function getPost(postDirName: string) {
    // 投稿のディレクトリ
    const postDir = path.join(baseDir, postDirName)
    // その中の画像が含まれるディレクトリ
    const imgDir = path.join(postDir, 'img')
    // の中の画像ファイル一覧
    const imgs =
        fs.readdirSync(imgDir, { withFileTypes: true })
            .filter((file, idx, arr) => file.isFile())
            .filter((file, idx, arr) => apiConfig.imageFileExts.includes(file.name.split('.').reverse()[0].toLowerCase()))
            // .map((file, idx, arr) => path.join(baseDirRemote, postDirName, 'img', file.name))
            .map((file, idx, arr) => [baseDirRemote, postDirName, 'img', file.name].join('/'))
    // 最初の画像ファイル
    const leadingImage = imgs[0]
    const leadingImageDims = imageSize(remotePathToLocal(leadingImage))

    // 投稿の本体markdownを解析
    // ファイルパス
    const postFilePath = path.join(postDir, 'post.md')
    // ファイルの内容を読んで
    const postFile = fs.readFileSync(postFilePath)
    // ファイルのプロパティも読んで
    const postFileStats = fs.statSync(postFilePath)
    // ファイルの内容を解析（frontmatterとcontent）
    const { data, content } = matter(postFile)
    // ファイルの中身とか属性を詰め込んでreturn，undefinedならデフォルト値
    const post: Post = {
        properties: {
            dirname: postDir,
            title: data['title'] ?? 'No title',
            datetime: data['datetime'] ?? formatDate(postFileStats.mtime),
            category: data['category'] ?? 'N/A',
            tags: data['tags'] ?? [],
            leadingImagePath: leadingImage,
            leadingImageHeight: leadingImageDims.height ?? 0,
            leadingImageWidth: leadingImageDims.width ?? 0
        },
        markdown: content,
        images: imgs
    }

    return post
}

export type { PostProperties, Post }
