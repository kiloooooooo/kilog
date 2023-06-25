declare module 'process' {
    global {
        namespace NodeJS {
            interface ProcessEnv {
                TEMP_DIR?: string
            }
        }
    }
}
