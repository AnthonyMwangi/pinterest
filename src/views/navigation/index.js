import './_styles.scss'
import React from 'react'

export default function Navigation({ onSearch = () => ({}) }) {

  const [keyword, update_keyword] = React.useState('');

  const on_submit_keyword = (e) => {

    e.persist()

    e.preventDefault();

    return onSearch({
      value: keyword,
      name: `Search Results: <i>${keyword}</i>`
    })

  }

  const on_change_keyword = (e) => {

    e.persist();

    const { value } = e.target;

    return update_keyword(value);

  }

  return (
    <div id='navigation'>

      <form className="search-bar" autoComplete='off' onSubmit={on_submit_keyword}>

        <label className="search-label" htmlFor="search">Search</label>

        <input
          id='search'
          type="text"
          name='search'
          className="search-input"
          onChange={on_change_keyword}
          placeholder='Enter Search Keyword'
        />

      </form>

      <div className="action-bar">

        <div className="avatar noselect">
          <div className="image" />
          <div className="name">
            <a href="https://dribbble.com/shots/2372254" target="_blank" rel='noopener noreferrer' >
              Mackenzie Child
            </a>
          </div>
        </div>

        <div className="settings noselect">Settings</div>

      </div>

    </div>
  );

}
