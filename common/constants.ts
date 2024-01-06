// 固定値

export type Keys<T> = keyof T
export type Values<T> = T[Keys<T>]

// システム名
export const sysName = 'your-system-name'

// contextの型
export interface StageContext {}

// デプロイ先ステージによって切り替える値
export const context = {
    dev: {},
    stg: {},
    prod: {},
} as const
