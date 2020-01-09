import React, { useState, useEffect } from 'react'
import queryString from 'query-string'
import io from 'socket.io-client'
import { RouteComponentProps } from 'react-router-dom'
import {
  Container,
  Grid,
  Paper,
  TextareaAutosize,
  makeStyles,
  Theme,
  createStyles,
  IconButton,
  InputBase,
  Divider
} from '@material-ui/core'

import SendIcon from '@material-ui/icons/Send';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import DirectionsIcon from '@material-ui/icons/Directions';
import AttachmentIcon from '@material-ui/icons/Attachment';

import Messages from './Messages'

interface Message {
  user: string
  text: string
}

interface User {
  id: number,
  name: string,
  room: string
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: '2px 4px',
      display: 'flex',
      alignItems: 'center',
      width: 400,
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    iconButton: {
      padding: 10,
    },
    divider: {
      height: 28,
      margin: 4,
    },
  }),
);


let socket: any

const Chat: React.FC<RouteComponentProps> = ({ location }) => {
  const [name, setName] = useState<string>('')
  const [room, setRoom] = useState<string>('')
  const [user, setUser] = useState<string>('')
  const [message, setMessage] = useState<string>('')
  const [messages, setMessages] = useState<Array<Message>>([])
  const ENDPOINT = 'localhost:5000'

  const classes = useStyles();

  useEffect(() => {
    const {
      name,
      room
    } = queryString.parse(location.search)

    socket = io(ENDPOINT)

    setName(name as string)
    setRoom(room as string)

    socket.emit('join', { name, room }, (error: string) => {
      if (error) {
        alert(error)
      }
    })

  }, [ENDPOINT, location.search])

  useEffect(() => {
    socket.on('message', (message: Message) => {
      setMessages([...messages, message])
    })

    return () => {
      socket.emit('disconnect')
      socket.off()
    }
  }, [messages])

  const sendMessage = (event: any) => {
    event.preventDefault()
    if (message) {
      socket.emit('sendMessage', message, name, () => setMessage(''))
    }
  }

  const ChatInputArea = (
    <div style={{ width: "calc(100% - 20px)", position: "fixed", bottom: "10px", left: "10px", right: "10px" }}>
      <Paper className={classes.root} style={{ width: "100%", padding: "0" }}>
        <IconButton className={classes.iconButton} aria-label="menu">
          <AttachmentIcon />
        </IconButton>
        <InputBase
          className={classes.input}
          value={message}
          onChange={(event: any) => setMessage(event.target.value)}
          onKeyPress={(event: any) => event.key === 'Enter' ? sendMessage(event) : null}
          placeholder="Send a message"
          inputProps={{ 'aria-label': 'search google maps' }}
        />
        <IconButton type="submit" className={classes.iconButton} aria-label="search">
          <EmojiEmotionsIcon />
        </IconButton>
        <Divider className={classes.divider} orientation="vertical" />
        <IconButton color="primary"
          className={classes.iconButton}
          aria-label="directions"
          onClick={(event: any) => sendMessage(event)}
        >
          <SendIcon />
        </IconButton>
      </Paper>
    </div>
  )

  // console.log(state.messages, state.message)

  return (
    <>
      <Messages
          messages={messages}
          name={name}
        />
      {ChatInputArea}
    </>
  );
}

export default Chat;

{/* <input
  value={message}
  onChange={(event: any) => setMessage(event.target.value)}
  onKeyPress={(event: any) => event.key === 'Enter' ? sendMessage(event) : null
  }
/> */}