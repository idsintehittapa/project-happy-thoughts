import React, { useState } from 'react'

import img from './media/pixel_heart.png'
import './HappyForm.css'

export const HappyForm = () => {
  const url = 'https://the-happy-thoughts.herokuapp.com/thoughts'
  const [message, setMessage] = useState('')
  const [name, setName] = useState('')

  // a submit function witch POSTs the text input
  const handleSubmit = event => {
    event.preventDefault()

    //send a POST request
    fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, name }),
    })
      .then(() => {
        setMessage('') // makes the text-area empy when reloaded
        setName('')
      })
  }

  return (
    <article className='form-wrapper'>
      <form onSubmit={handleSubmit}>
        <h1 tabIndex='0'>What's making you happy right now?</h1>
        <input
					className="post-message"
					type="text"
					placeholder="What do you call yourself?"
					value={name}
					onChange={event => setName(event.target.value)}
				/>
        <textarea
          className='post-message'
          rows='4'
          value={message}
          onChange={event => setMessage(event.target.value)}
          aria-label='Type a message no shorter than 5 nor longer than 140 characters'
        />
        <div className='post-message-wrapper'>
          <button
            className='submit-button'
            type='submit'
            disabled={message.length < 5 || message.length > 140 ? true : false}
          >
            <img
              className='heart-button-left'
              src={img}
              alt='Heart'
            />
            Send a happy thought!
          <img
              className='heart-button-right'
              src={img}
              alt='Heart'
            />
          </button>
          <p tabIndex='0' className='submit-length'>{message.length}/140 characters </p>
        </div>
      </form>
    </article>
  )
}