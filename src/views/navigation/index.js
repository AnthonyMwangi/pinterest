import './_styles.scss'
import React from 'react'
import Logo from '../../images/logo.svg'
import { SearchBar } from '../../components'
import { AiOutlineMenu } from 'react-icons/ai'

export default function Navigation({ onSearch = () => ({}) }) {

  const [search_state,update_search_state] = React.useState('hidden');

  const toggle_search_state = () => {

    const new_state = (search_state==='hidden') ? 'visible' : 'hidden';

    return update_search_state(new_state);

  }

  return (
    <div id='navigation'>

      <img src={Logo} alt="logo" className={`app-logo sb-${search_state}`} />

      <div className="nav-wrapper">

        <SearchBar
          onSearch={onSearch}
          state={search_state}
          onFocusChange={toggle_search_state}
        />

        <div className={`action-bar sb-${search_state}`}>

          <div className="avatar noselect">
            <div className="image" />
            <div className="name">
              <a href="https://dribbble.com/shots/2372254" target="_blank" rel='noopener noreferrer' >
                Mackenzie Child
            </a>
            </div>
          </div>

          <div className="settings noselect">
            <AiOutlineMenu className="icon" />
            <div className="label">Settings</div>
          </div>

        </div>

      </div>

    </div>
  );

}
