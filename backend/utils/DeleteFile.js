import fs from 'fs'

const deleteFile = (filePath) => {
    fs.unlink(filePath, (err) => {
        if(err)
        {
            console.log("Error Deleting file", err)
        }
        else
        {
            console.log("File Deleted Successfully")
        }
    })
}

export default deleteFile