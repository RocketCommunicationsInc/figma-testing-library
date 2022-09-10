export class Client {
	fileId = ''
	headers: Headers 
 
	constructor(token: string, fileId: string) {
		this.fileId = fileId
		this.headers = new Headers({
			'X-Figma-Token': `${token}`
		})
	}

	
	async getRequest(url: string) {
		const req = new Request(url, {
			headers: this.headers
		})
		const response = await fetch(req)
		return response.json()
	}

	async getNode(id: any) {
		const response = await this.getRequest(`https://api.figma.com/v1/images/${this.fileId}?ids=${id}`)
		if (response) {
			if (response.status === 403) {
				throw new Error('Invalid token')
			} else {
				return Object.values(response.images)[0]
			}
		} else {
			return null
		}
	}
	
}