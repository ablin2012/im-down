export const shortenStr = (str, length) => {
    if (str.length > length) {
        return str.slice(0, length) + '...'
    } else {
        return str;
    }
}