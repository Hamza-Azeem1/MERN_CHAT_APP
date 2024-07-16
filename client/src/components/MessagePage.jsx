import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import Avatar from "./Avatar"

const MessagePage = () => {
    const params = useParams()
    const socketConnection = useSelector(state => state?.user?.socketConnection)
    const [dataUser, setDataUser] = useState({
        name: "",
        email: "",
        profile_pic: "",
        onlie: false,
        _id: ""
    })


    useEffect(() => {
        if (socketConnection) {
            socketConnection.emit('message-page', params.userId)

            socketConnection.on('message-user', (data) => {
                setDataUser(data)
            })

        }
    }, [socketConnection, params?.userId])

    return (
        <div>
            <header className="sticky top-0 h-16 bg-white">
                <div>
                    <div>
                        <Avatar width={50} height={50} imageUrl={dataUser?.profile_pic} name={dataUser?.name} userId={dataUser?._id} />
                    </div>
                    <div>
                        <h3>{dataUser?.name}</h3>
                        <p>
                            {
                                dataUser.onlie ? 'online' : 'offline'
                            }
                        </p>
                    </div>
                </div>
            </header>
        </div>
    )
}
export default MessagePage