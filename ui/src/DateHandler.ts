const dateRegex = new RegExp('^\\d\\d\\d\\d-\\d\\d-\\d\\d')

export function jsonDateReviver(key: any, value: any) {
    if (dateRegex.test(value)) return new Date(value)
    return value
}