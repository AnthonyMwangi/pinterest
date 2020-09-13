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
      category: 'Popular',
      selected_post: null,
      loading: true
    }
  }

  componentDidMount = () => this.fetch_api_data();

  fetch_api_data = async (category = { name:'Popular', value:'popular' }) => {

    const { data } = await api.dummy_array(10);

    return this.setState({ posts: data, category: category.name, loading: false, selected_post: null });

  }

  on_select_category = async (category) => {

    if (this.state.category===category.name) return null;

    this.setState({ loading: true });

    return await this.fetch_api_data(category);

  }

  modal_status = () => {
    return !!this.state.selected_post ? 'modal-open' : 'modal-closed'
  }

  render() {

    return (
      <div className={`App ${this.modal_status()}`}>

        <Sidebar onSelect={this.on_select_category}/>

        <div className={`app-body`}>

          <Navigation
            selected={this.state.category}
            onSearch={this.on_select_category}
          />

          <Grid
            onClickPost={(selected_post) => this.setState({ selected_post })}
            category={this.state.category}
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
