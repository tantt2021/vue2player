
// http 链接转 https
export function toHttps(url) {
    if (typeof url !== 'string') {
        return url
    }
    return url.replace('http://','https://')
}

// 补0函数
export function addZero(s) {
    return s < 10 ? '0' + s : s;
}

// 时间格式化
export function format(value) {
    let minute = Math.floor(value / 60);
    let second = Math.floor(value % 60);
    return `${addZero(minute)}:${addZero(second)}`
}

export function isPromise(v) {
    return v !== undefined && v !== null && typeof v.then === 'function'
}

export function silencePromise(value) {
    if (isPromise(value)) {
        value.then(null,()=>{})
    }
}