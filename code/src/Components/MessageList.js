import React, { useEffect, useState } from 'react'

import moment from 'moment'

import { LikedMessage } from 'Components/LikedMessage'
import './MessageList.css'

export const MessageList = () => {
  const MessagesUrl = 'https://happy-thoughts-technigo.herokuapp.com/thoughts'
  const [messages, setMessages] = useState([])

  useEffect(() => {
    fetch(MessagesUrl)
      .then((res) => {
        return res.json()
      })
      .then((data) => {
        console.log(data)
        // filter out empty messages 
        const filteredMessages = data.filter((message) => message.message)
        // save data to state
        setMessages(filteredMessages)
      })
  }, [messages]) // this updates the content of the page without reloading it!
  return (
    <section className='message-wrapper'>
      {messages.map((message) => {
        return (
          <article className="message" key={message._id}>
            <h3>{message.message}</h3>
              <div className='heart-time'>
              < LikedMessage 
              hearts={message.hearts} 
              id={message._id} />
              <span className='span-time'>
              <p className="time">{moment(message.createdAt).fromNow()}</p>
              </span>
              </div>
          </article>

        )
      })}
    </section>
  )
}