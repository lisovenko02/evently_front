import { io } from 'socket.io-client'
import Cookies from 'js-cookie'

const socket = io(process.env.NEXT_PUBLIC_API_BASE_URL!, {
  autoConnect: false,
})

socket.auth = {
  token: Cookies.get('refreshToken'),
}

socket.connect()

export default socket
