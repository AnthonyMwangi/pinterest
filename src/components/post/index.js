import './_styles.scss'
import React from 'react'
import {
  RiPushpin2Fill as Pin,
  RiHeartFill as Heart
} from "react-icons/ri";




export default function Post({ data }) {

  if (!data) return null;

  const {
    likes = 0,
    downloads = 0,
    width = 310,
    height = 350,
    color = '#E7E9F6',
    alt_description = '',
    urls = {
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

  return (
    <div className='post' data-height={height} data-width={width}>

      <div className="post_wrapper">
        <img
          src={urls.regular}
          alt={title}
          style={styles}
          className="image noselect"
        />

        <div className="content">

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

              <div className="name">{user.first_name}</div>

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
