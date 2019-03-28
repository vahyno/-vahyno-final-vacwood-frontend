// helper function for formatting incomming data
export function formatServerData (input) {
    const output = {};
    for (let i = 0; i < input.data.length; i++) {
        output[input.data[i]._id] = input.data[i]
    }
    return output
}
