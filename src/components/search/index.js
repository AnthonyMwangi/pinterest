import './_styles.scss'
import React from 'react'

import {
  AiOutlineSearch as SearchIcon,
  AiFillCloseCircle as ClearIcon
} from 'react-icons/ai'

export default function SearchBar({ onSearch = () => { }, onFocusChange = () => { }, state = 'hidden' }) {

  const [keyword, update_keyword] = React.useState('');

  const on_submit_keyword = (e,clear) => {

    e.persist()

    e.preventDefault();

    if (!!clear) update_keyword('');

    document.getElementById('search').blur();

    const default_name = `Search Results: <i>${keyword}</i>`;

    const value = (!!keyword && keyword!=='') ? keyword : 'popular';

    const name = (!!keyword && keyword!=='') ? default_name : 'Popular';

    return onSearch({ value, name });

  }

  const on_change_keyword = (e) => {

    e.persist();

    const { value } = e.target;

    return update_keyword(value);

  }

  return (
    <form className={`search-bar sb-${state}`} autoComplete='off' onSubmit={on_submit_keyword} onFocus={onFocusChange} onBlur={onFocusChange}>

      <div className={`search-wrapper`}>

        <label className="search-label" htmlFor="search">Search</label>

        <input
          id='search'
          type="text"
          name='search'
          value={keyword}
          className="search-input"
          onChange={on_change_keyword}
          placeholder='Enter Search Keyword'
        />

        <SearchIcon className='icon' onClick={on_submit_keyword}/>

        {
          state==='hidden' && keyword!=='' &&
          <ClearIcon className='close' onClick={(e) => on_submit_keyword(e,true)}/>
        }

      </div>

    </form>
  )
}
