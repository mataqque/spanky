import axios from 'axios';

export class SperantService {
    _sperantAPI: any;
    client: {[k: string]: any} = {};

    constructor(){
        this.client = {}
        this._sperantAPI = axios.create({
            baseURL: 'https://api.sperant.com/v2/',
            headers: {
                "Cache-Control": "no-cache",
                'Content-Type': 'application/json',
                "Authorization": "Bearer TSTl3tDXrnk6Li_hDJn9dCIJyDvVRyMj5VjtNCwnciA"
            }
        })
    }

    setClient(client: Object) {
        this.client = {...this.client, ...client}
        return this
    }

    captationWays(target_url: string, captation_ways: any = {}) {
        for (const key in captation_ways) {
            if (new RegExp(key, 'i').test(target_url)) {
                this.client['source_id'] = captation_ways[key]
            }
        }
        new URLSearchParams(target_url).forEach((v, k) => {
            /utm_/.test(k) && (this.client[`${k.toLowerCase()}`] = v)
        })
        return this
    }

    async create(){
        return this._sperantAPI.post('/clients', {data: this.client})
    }

}