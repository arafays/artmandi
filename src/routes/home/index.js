import { h, Component } from 'preact';
import style from './style';
import { auth, googleAuthProvider } from '../../lib/firebase';

export default class Home extends Component {
	constructor() {
		super();

		this.state = {
			currentUser: null
		};
	}

	render() {
		const currentUser = this.state;
		return (
			<div class={style.home}>
				{!currentUser && <p> Not</p>}
				{currentUser && <p> Yaes</p>}
				<button onClick={() => auth.signOut()}> signOut</button>
			</div>
		);
	}
}
