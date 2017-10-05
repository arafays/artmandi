import { h, Component } from "preact";
import style from "./style";
import firebase from '../../lib/firebase';

export default class Home extends Component {
	constructor() {
		super();
		// set initial time:
    	this.state = {
			currentItem: '',
			username: ''
		}
	}

	handleSubmit = (e) => {
		e.preventDefault();
		const itemsRef = firebase.database().ref('items');
		const item = {
		  title: this.state.currentItem,
		  user: this.state.username
		}
		itemsRef.push(item);
		this.setState({
		  currentItem: '',
		  username: ''
		});
	};

	handleChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		});
	};
	componentDidMount() {
		const itemsRef = firebase.database().ref('items');
		itemsRef.on('value', (snapshot) => {
		  let items = snapshot.val();
		  let newState = [];
		  for (let item in items) {
			newState.push({
			  id: item,
			  title: items[item].title,
			  user: items[item].user
			});
		  }
		  this.setState({
			items: newState
		  });
		});
	  }
  render() {
    return (
      <div class={style.home}>
        <div className="container">
          <section className="add-item">
			<form onSubmit={this.handleSubmit}>
				<input type="text" name="username" placeholder="What's your name?" onChange={this.handleChange} value={this.state.username} />
				<input type="text" name="currentItem" placeholder="What are you bringing ?" onChange={this.handleChange} value={this.state.currentItem} />
				<button>Add Item</button>
			</form>
          </section>
          <section className="display-item">
            <div className="wrapper">
              <ul />
            </div>
          </section>
        </div>
      </div>
    );
  }
}
