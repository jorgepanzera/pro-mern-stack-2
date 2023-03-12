const dateRegex = new RegExp('^\\d\\d\\d\\d-\\d\\d-\\d\\d')

// Evaluar campos dentro de un json que cumplan con dateRegex, y devolver una fecha si es asi
export function jsonDateReviver(key: any, value: any) {
    if (dateRegex.test(value)) return new Date(value)
    return value
}