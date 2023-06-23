export interface License {
    licenses: string
    repository: string
    publisher: string
    email: string
    path: string
    licenseFile: string
    licenseText: string
    copyright: string
    errno: number
    syscall: string
    code: string
}

interface Licenses {
    [packageName: string]: License
}

export interface PackageNameAndInfo {
    name: string
    info: License
}

export function getLicenses(): PackageNameAndInfo[] {
    // const licensesJSON = fs.readFileSync(`${LICENSE_DIR}/licenses.json`, { encoding: 'utf-8' })
    // const licenses = JSON.parse(licensesJSON) as Licenses
    const licenses: Licenses = require(`../../../license-checker/licenses.json`)

    return Object.keys(licenses).map((pkgName) => (
        {
            name: pkgName,
            info: licenses[pkgName]
        }
    ))
}
