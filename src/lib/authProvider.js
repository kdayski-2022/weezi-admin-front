import Cookies from 'universal-cookie'

const cookies = new Cookies();

const authProvider = {
	login: ({ username, password }) => {
		const request = new Request(`${process.env.REACT_APP_APIURL}/login`, {
			method: 'POST',
			body: JSON.stringify({ username, password }),
			headers: new Headers({ 'Content-Type': 'application/json' }),
		});
		return fetch(request)
			.then(response => {
				if (response.status < 200 || response.status >= 300) {
					throw new Error(response.statusText);
				}
				return response.json();
			})
			.then(({ token, role }) => {
				cookies.set('token', token);
				cookies.set('role', role);
			});
	},
	checkError: (error) => { /* ... */ },
	checkAuth: () => {
		return cookies.get('token') ? Promise.resolve() : Promise.reject();
	},
	logout: () => {
		cookies.remove('token')
		cookies.remove('role')
		return Promise.resolve();
	},
	getIdentity: () => { /* ... */ },
	getPermissions: () => {
		const role = cookies.get('role')
		return role ? Promise.resolve(role) : Promise.reject();
	}
};
export default authProvider;