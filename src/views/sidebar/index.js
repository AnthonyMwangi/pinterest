import './_styles.scss'
import React from 'react'
import Logo from '../../images/logo.svg'

export default function Sidebar({ selected='', onSelect = () => ({}) }) {

  return (
    <div id='sidebar'>

      <div className="sidebar-wrapper">

        <img src={Logo} alt="logo" className="app-logo" />

        <div className="menu-wrapper">
          {
            dataset.map((a,i) =>
              <div
                key={a.value}
                onClick={() => onSelect(a)}
                dangerouslySetInnerHTML={{ __html: a.name }}
                className={`menu-item ${(a.name===selected.toLowerCase() ? 'active' : '')}`}
              />
            )
          }
        </div>

      </div>

    </div>
  )
}


const dataset = [
  { name: 'popular', value: 'popular' },
  { name: 'gifts', value: 'gifts' },
  { name: 'architecture', value: 'architecture' },
  { name: 'art', value: 'art' },
  { name: 'cars & bikes', value: 'vehicles' },
  { name: 'celebrities', value: 'celebrities' },
  { name: 'design', value: 'design' },
  { name: 'diy & crafts', value: 'diy' },
  { name: 'education', value: 'education' },
  { name: 'entertainent', value: 'entertainent' },
  { name: 'food & drink', value: 'food' },
  { name: 'hair & beauty', value: 'hair' },
  { name: 'health & fitness', value: 'fitness' },
  { name: 'home decor', value: 'interior design' },
  { name: 'humor', value: 'humor' },
  { name: 'illustrations & posters', value: 'posters' },
  { name: 'mens fashion', value: 'fashion' },
  { name: 'photography', value: 'photography' },
]
