
export function copyObjArr(arr) {
    // return a shallow copy of the array of objects
    return arr.concat().map((obj) => {
        return Object.assign({}, obj);
    })
}

export function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


