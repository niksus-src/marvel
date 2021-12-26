

class MarelService {
    _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    _apiKey = 'apikey=ac5e6c8c0fccdfd5b92eab655672aa02'
    _baseOffset = 410;
    
    getResource = async (url) => {
        let res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could nor fetch ${url}, status: ${res.status}`);
        }

        return await res.json();
    }

    getAllCharacters = async (offset = this._baseOffset) => {
        const res = await this.getResource(`${this._apiBase}characters?limit=9&offset=${offset}&${this._apiKey}`);
        console.log(res);
        return res.data.results.map(this._transformCharacter);
    }

    getCharacter = async (id) => {
        const res = await this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`);
        return this._transformCharacter(res.data.results[0]);
    }

    _transformCharacter = (char) => {
        let desc;

        if (char.description) {
            desc = char.description.slice(0,210) + '...';
        } 
        else {
            desc = 'There is no information on this character';
        }
        return {
            id: char.id,
            name: char.name,
            description: desc,
            thumbnail: char.thumbnail.path + '.' +char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items
        }
    }
}

export default MarelService;