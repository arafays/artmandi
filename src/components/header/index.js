import { h, Component } from 'preact';
import { Link } from 'preact-router/match';
import { auth, googleAuthProvider } from '../../lib/firebase';
import style from './style';

export default class Header extends Component {
	constructor() {
		super();

		this.state = {
			currentUser: null,
			exercises: null
		};
	}


	componentDidMount() {
		auth.onAuthStateChanged(currentUser => {
			this.setState({ currentUser });
		});
	}

	render() {
		const { currentUser } = this.state;
		return (
			<header class={style.header}>
				<h1>Preact App</h1>
				<nav>
					<Link activeClassName={style.active} href="/">Home</Link>
					<Link activeClassName={style.active} href="/profile">Me</Link>
					<Link activeClassName={style.active} href="/profile/john">John</Link>
					<button onClick={() => auth.signInWithPopup(googleAuthProvider)}>
						Sign In
					</button>
				</nav>
			</header>
		);
	}
}
