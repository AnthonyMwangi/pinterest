import './_styles.scss'
import React from 'react'
import ProgressiveImage from '../Image'
import { RiCloseLine } from 'react-icons/ri'

export default function ModalPost({ data, close=()=>{} }) {

  if (!data) return null;

  console.log('data :>> ', data);

  const {
    id = '',
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

      <div className="modal-wrapper">

        <div className="close-button" onClick={close}>
          <RiCloseLine className='icon' />
        </div>

        <div className="title">{title}</div>

        <div className="caption">{post_caption()}</div>

        <div className="image-wrapper" style={{ backgroundColor: color }}>

          <ProgressiveImage id={id} data={urls} title={title} full={true}/>

        </div>

        <div className="user-details">

          <div className="user">

            <img src={user.profile_image.medium} alt={user.name} className="avatar" />

            <div className="name">{user.name}</div>

            <a href={user.links.html} className="follow-btn" target='_blank' rel='noopener noreferrer'>
              Follow
            </a>

          </div>

          <a href={links.html} className="external-link" target='_blank' rel='noopener noreferrer'>
            Found on Unsplash.com
          </a>

        </div>

      </div>

    </div>
  )
}
