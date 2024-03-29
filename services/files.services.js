import axios from 'axios'

const fileService = axios.create({ baseURL: 'http://localhost:8080' })

export const getImages = async () => {
    const response = await fileService.get('ASSETS/files')
    return response.data
}

export const findImage = (name) => {
    const response = fileService.get(`ASSETS/file/${name}`)
    return response.data
}

export const uploadImage = (file) => {
    const fd = new FormData()
    fd.append('file', file)

    fileService
        .post(
            'ASSETS/upload',
                fd
            ,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        )
}

/*export const updateUser = async (id, username, firstname, lastname, email, password) => {
    let body = {}

    if (password === null) {
        body = { username: username, firstname: firstname, lastname: lastname, email: email }
    } else {
        body = {
            username: username,
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: password,
        }
    }

    await userService.patch(`API/user/${id}/update`, body, {
        headers: {
            'Content-Type': 'multipart/form-data',
            Accept: 'application/json',
        },
    })
}*/

export const deleteUser = (name) => {
    fileService.delete(`ASSETS/file/${name}`)
}
