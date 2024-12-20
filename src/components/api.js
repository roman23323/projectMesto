//const group = 'frontend-st-cohort-201';
//const token = '75a08035-fad0-499b-9c71-b4f28d096f52';

/*
return fetch('https://nomoreparties.co/v1/cohort-42/cards', {
  headers: {
    authorization: 'c56e30dc-2883-4270-a59e-b2f7bae969c6'
  }
})
*/

const config = {
  baseUrl: 'https://nomoreparties.co/v1/frontend-st-cohort-201',
  headers: {
    authorization: '75a08035-fad0-499b-9c71-b4f28d096f52',
    'Content-Type': 'application/json'
  }
}
localStorage.setItem('config', config);

// const login = (token, groupLink) => {
// 	return fetch(`https://nomoreparties.co/v1/${groupLink}/users/me`, {
// 		method: "GET",
// 		headers: {
// 			authorization: token,
// 		},
// 	}).then((res) => {
// 		if (res.ok) {
// 			configInfo.headers.authorization = token;
// 			configInfo.baseUrl = groupLink;
// 			localStorage.setItem('configInfo', JSON.stringify(configInfo));
// 			return res.json();
// 		} else {
// 			return Promise.reject(`Ошибка ${res.status}`);
// 		}
// 	});
// };

const checkResponse = (res) => {
	if (res.ok) {
		return res.json();
	} else {
		return Promise.reject(`Ошибка ${res.status}`);
	}
};

const getUser = () => {
	return fetch(`${config.baseUrl}/users/me`, {
		method: "GET",
		headers: config.headers,
	}).then(checkResponse);
};

const getCards = () => {
	return fetch(`${config.baseUrl}/cards`, {
		method: "GET",
		headers: config.headers,
	}).then(checkResponse);
};

const updateProfile = (name, about) => {
	return fetch(`${config.baseUrl}/users/me`, {
		method: "PATCH",
		headers: config.headers,
		body: JSON.stringify({ name, about }),
	}).then(checkResponse);
};

const updateAvatar = (link) => {
	return fetch(`${config.baseUrl}/users/me/avatar`, {
		method: "PATCH",
		headers: config.headers,
		body: JSON.stringify({ avatar: link }),
	}).then(checkResponse);
};

const addCard = (name, link) => {
	return fetch(`${config.baseUrl}/cards`, {
		method: "POST",
		headers: config.headers,
		body: JSON.stringify({ name, link }),
	}).then(checkResponse);
};

const deleteCard = (cardId) => {
	return fetch(`${config.baseUrl}/cards/${cardId}`, {
		method: "DELETE",
		headers: config.headers,
	}).then(checkResponse);
};

const setLike = (cardId) => {
	return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
		method: "PUT",
		headers: config.headers,
	}).then(checkResponse);
};

const removeLike = (cardId) => {
	return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
		method: "DELETE",
		headers: config.headers,
	}).then(checkResponse);
};

export { getUser, getCards, updateProfile, addCard, deleteCard, setLike, removeLike, updateAvatar };