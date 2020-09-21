import './_styles.scss'
import React from 'react'
import moment from 'moment'
import ProgressiveImage from '../Image'
import { RiCloseLine } from 'react-icons/ri'

export default function ModalPost({ data, close = () => { } }) {

  if (!data) return null;

  const {
    id = '',
    updated_at = '',
    color = '#E7E9F6',
    description = '',
    alt_description = '',
    urls = {
      thumb: '',
      full: '',
      regular: ''
    },
    links = { html: '' },
    user = {
      name: 'Anonymous',
      first_name: 'Anonymous',
      profile_image: {
        medium: ''
      },
      links: {
        html: ''
      },
      portfolio_url: '',
      twitter_username: '',
      instagram_username: '',
    }
  } = data;

  const title = `Photo by ${user.name || 'Anonymous'}`;

  const post_caption = () => {

    let caption = '';

    if (!!alt_description && alt_description !== '') caption += `${alt_description}. `;

    if (!!description && description !== '' && description !== alt_description) caption += description;

    return caption;

  }

  return (
    <div className='modal-post'>

      <div className="close-button" onClick={close}>
        <RiCloseLine className='icon' />
      </div>

      <div className="modal-wrapper">

        <div className="modal-header">

          <div className="text-content">
            <div className="title">{title}</div>
            <div className="caption">{post_caption()}</div>
          </div>

          <a href={user.links.html} className="follow-btn" target='_blank' rel='noopener noreferrer'>
            Follow
          </a>

        </div>


        <div className="image-wrapper" style={{ backgroundColor: color }}>

          <div className="bg-image" style={{ backgroundImage: `url(${urls.thumb})` }} />

          <ProgressiveImage id={id} data={urls} title={title} full={true} />

        </div>

        <div className="user-details">

          <div className="user">

            <img src={user.profile_image.medium} alt={user.name} className="avatar" />

            <div className="name">{user.name}</div>

            <div className="timestamp">{moment(updated_at).fromNow()}</div>

          </div>

          <a href={links.html} className="external-link" target='_blank' rel='noopener noreferrer'>
            Found on Unsplash.com
          </a>

        </div>

        <div className="footer">

          <div className='bio'>{user.bio}</div>

          <div className="socials">
            <Link href={user.twitter_username} type='twitter'/>
            <Link href={user.instagram_username} type='instagram'/>
            <Link href={user.portfolio_url} type='portfolio'/>
          </div>

        </div>

      </div>

    </div>
  )
}

function Link({ href, type='twitter' }) {

  if (!href || href==='') return null;

  return (
    <a href={social_link_address(href,type)} className="social-link" target='_blank' rel='noopener noreferrer'>
      {type}
    </a>
  );

}

const social_link_address = (href='',type='') => {
  switch (type.toLowerCase()) {

    case 'twitter': return `https://twitter.com/${href}`;

    case 'instagram': return `https://www.instagram.com/${href}/`;

    case 'portfolio': return `${href}`;

    default: return `https://www.${href}.com`;

  }
}
