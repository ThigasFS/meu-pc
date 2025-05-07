let id: number = 0

function ID(){
    return id += 1
}

function resetID(){
    return id = 0
}

export default ID
export {resetID}