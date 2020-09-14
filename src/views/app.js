import api from '../api'
import React from 'react'
import Sidebar from './sidebar'
import Navigation from './navigation'
import Grid from './grid'
import { Modal } from '../components'


export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      category: {
        name: 'Popular',
        value: 'popular',
        page: 1
      },
      selected_post: null,
      loading: true
    }
  }

  componentDidMount = () => this.fetch_api_data();

  fetch_api_data = async () => {

    const { dummy, photos } = api;

    const { hostname } = window.location;

    const fetch_data = hostname === 'localhost' ? dummy : photos;

    const category = { name: 'Popular', value: 'popular' };

    const { data } = await fetch_data(50);

    return this.load_api_data(data, category);

  }

  search_photos = async (category = { name: 'Popular', value: 'popular' }) => {

    this.setState({ loading: true });

    const { value, page=1 } = this.state.category;

    const curr_page = (value === category.value) ? page + 1 : 1;

    const { data } = await api.search(category.value, 30, curr_page);

    return this.load_api_data(data, { ...category, page: curr_page });

  }

  load_more_data = async () => {

    const { posts = [] } = this.state;

    const { name, value, page = 1 } = this.state.category;

    const { data } = await api.search(value, 30, page + 1);

    return this.load_api_data(posts.concat(data), { name, value, page: page + 1 });

  }

  load_api_data = (posts, category) => this.setState({ posts, category, loading: false, selected_post: null })

  on_select_category = async (category) => {

    if (this.state.category === category.name) return null;

    this.setState({ loading: true });

    return await this.fetch_api_data(category);

  }

  modal_status = () => {
    return !!this.state.selected_post ? 'modal-open' : 'modal-closed'
  }

  render() {

    return (
      <div className={`App ${this.modal_status()}`}>

        <Sidebar
          selected={this.state.category.name}
          onSelect={this.search_photos}
        />

        <div className={`app-body`}>

          <Navigation
            selected={this.state.category.name}
            onSearch={this.search_photos}
          />

          <Grid
            onClickPost={(selected_post) => this.setState({ selected_post })}
            onClickLoadMoreButton={this.load_more_data}
            category={this.state.category.name}
            loading={this.state.loading}
            data={this.state.posts}
          />

        </div>

        <Modal
          data={this.state.selected_post}
          close={() => this.setState({ selected_post: null })}
        />

      </div>
    );
  }
}
