const lib = {
    formatDate: (dateString) => {
        if (!dateString) return ''
        const date = new Date(dateString)
        const day = date.getDate()
        const month = date.getMonth() + 1
        const year = date.getFullYear()
        return `${day < 10 ? `0${day}` : day}.${month < 10 ? `0${month}` : month}.${year}`
    },
    getHours: (dateString) => {
        if (!dateString) return ''
        const date = new Date(dateString)
        const hours = date.getHours()
        const minutes = date.getMinutes()
        return `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}`
    },
    clipString: (string, expectedLength) => {
        if (string && string.length > expectedLength) {
            const shortString = string.substring(0, expectedLength)
            const splitedString = shortString.split(' ')
            splitedString.pop()
            const result = splitedString.join(' ')
            return `${result}...`
        } else {
            return string
        }
    },
    replaceNull(someObj, replaceValue = "") {
        const replacer = (key, value) =>
            String(value) === "null" || String(value) === "undefined" ? replaceValue : value
        return JSON.parse(JSON.stringify(someObj, replacer))
    },
    getPaginationInfo(data) {
        const { page, limit } = data
        const start = (Number(page) - 1) * Number(limit)
        const end = Number(limit) * Number(page)
        return ({ start, end })
    },
    processError(error, history) {
        if (error.response.status === 401) history.push('/login')
    },
}

module.exports = lib
