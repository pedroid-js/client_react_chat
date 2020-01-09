import React from 'react'
import Message from './Message'

interface Props {
    messages: Msg[],
    name: string
}

interface Msg {
    user: string
    text: string
}

const Messages: React.FC<Props> = ({messages, name}) => {
    console.log(messages)
  return (
    <>
        {messages.map((message, i) => (
            <div key={i}>
                <Message message={message} name={name} />
            </div>
        ))}
    </>
  );
}

export default Messages;
