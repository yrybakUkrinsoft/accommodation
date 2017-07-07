export const normalizeValue = value => {
    return value.toLowerCase().replace(/\w/, w => w.toUpperCase())
}

export const unCamelCase = key => {
    return key.replace(/([a-z])([A-Z])/g, '$1 $2')
        .replace(/([A-Z])([a-z])/g, ' $1$2')
        .replace(/\s+/g, ' ')
}

export const makeQs = object => {
    return Object.keys(object).map(key => key + '=' + object[key]).join('&');
}

export const normalizeDate = date => {
    let _date = new Date(+date);
    return `${_date.getDate()}/${_date.getMonth()}/${_date.getFullYear()}`
}