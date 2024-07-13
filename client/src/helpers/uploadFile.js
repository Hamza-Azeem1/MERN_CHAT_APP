const url = import.meta.env.VITE_CLOUDINARY_API

const uploadFile = async (file) => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', 'chat_app')

    const response = await fetch(url, {
        body: formData
    })
    const responseData = await response.json()

    return responseData
}

export default uploadFile