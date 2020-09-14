import './_styles.scss'
import React from 'react'
import ProgressiveImage from '../Image'

import {
  RiPushpin2Fill as Pin,
  RiHeartFill as Heart
} from "react-icons/ri";

export default function Post({ data, onSelect=()=>{} }) {

  if (!data) return null;

  const {
    id,
    likes = 0,
    downloads = 0,
    width = 310,
    height = 350,
    color = '#E7E9F6',
    alt_description = '',
    urls = {
      thumb: '',
      regular: ''
    },
    user = {
      name: 'Anonymous',
      first_name: 'Anonymous',
      profile_image: {
        small: ''
      }
    }
  } = data;

  const styles = { backgroundColor: color };

  const title = `Photo by ${user.name || 'Anonymous'}`;

  const first_name_only = user.first_name.replace(/ .*/,'');

  return (
    <div className='post' data-height={height} data-width={width} onClick={() => onSelect(data)}>

      <div className="post_wrapper">

        <ProgressiveImage
          id={id}
          data={urls}
          title={title}
          styles={styles}
        />

        <div className="content" style={{ boxShadow: `0px 1px 10px 0px ${color}50` }}>

          <div className="title">{title}</div>

          {(!!alt_description && alt_description !== '') && <div className="caption">{alt_description}</div>}

          <div className="metadata">

            <div className="user">

              <img
                style={styles}
                alt={user.name}
                src={user.profile_image.small}
                className="image noselect avatar"
              />

              <div className="name">{first_name_only}</div>

            </div>

            <div className="actions">

              <div className="action">
                <Pin className='icon' />
                <div className="value">{downloads}</div>
              </div>

              <div className="action">
                <Heart className='icon' />
                <div className="value">{likes}</div>
              </div>

            </div>

          </div>

        </div>

      </div>


    </div>
  )
}
