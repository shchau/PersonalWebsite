export default class HTTPFetchUtil {
	static getRequest(urlPath, requireAuth, signal) {
		const payload = {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				"accept": "application/problem+json",
			}
		},
		getRequest = new Request(urlPath, payload);

		return fetch(getRequest);
	}
}