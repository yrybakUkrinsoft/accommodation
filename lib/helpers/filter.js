exports.filterBy = (data, filterName, filterValue) => {
    if(!(Array.isArray(data) && data.length > 0)) return [];

    return data.filter(e => {
        return e[filterName] === filterValue;
    })
}