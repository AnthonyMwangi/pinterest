import './_styles.scss'
import React from 'react'
import { ImSpinner7 as Icon } from 'react-icons/im'

export default function Loader({ context='home' }) {
  return (
    <div className='loader'>

      <div className="icon-wrapper">
        <Icon className='icon' />
      </div>

      <div className="caption">
        {`We're adding new items to your ${context} feed`}
      </div>

    </div>
  )
}
