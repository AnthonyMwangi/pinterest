import './_styles.scss'
import React from 'react'

export default function Navigation() {
  return (
    <div id='navigation'>

      <form className="search-bar">
        <label className="search-label" htmlFor="search">Search</label>
        <input
          id='search'
          type="text"
          placeholder='Enter Search Keyword'
          className="search-input"
        />
      </form>

      <div className="action-bar">

        <div className="avatar noselect">
          <div className="image"/>
          <div className="name">Mackenzie Child</div>
        </div>

        <div className="settings noselect">Settings</div>

      </div>

    </div>
  )
}
