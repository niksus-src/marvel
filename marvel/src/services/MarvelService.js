import {useHttp} from '../hooks/http.hook';

const useMarelService = () => {
    const {loading, request, error, clearError, process, setProcess} = useHttp();

    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    const _apiKey = 'apikey=ac5e6c8c0fccdfd5b92eab655672aa02'
    const _baseOffset = 410;

    const getAllCharacters = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);

        return res.data.results.map( _transformCharacter);
    }

    const getCharacter = async (id) => {
        console.log('Запрос отправлен');
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);

        return  _transformCharacter(res.data.results[0]);
    }

    const getCharacterByName = async (name) => {
        const res = await request(`${_apiBase}characters?name=${name}&${_apiKey}`);
        return res.data.results.map(_transformCharacter);
    }

    const getAllComics = async (offset = 0) => {
        const res = await request(`${_apiBase}comics?orderBy=issueNumber&limit=8&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformComics);
    }

    const getComics = async (id) => {
        const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
        return _transformComics(res.data.results[0]);
    }
    const _transformCharacter = (char) => {
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

    const _transformComics = (comics) => {
        return {
            id: comics.id,
            title: comics.title,
            description: comics.description || 'There is no description',
            pageCount: comics.pageCount ? `${comics.pageCount} p.` : 'No information about the number of pages',
            thumbnail: comics.thumbnail.path + '.' + comics.thumbnail.extension,
            language: comics.textObjects.language || 'en-us',
            price: comics.prices.price ? `${comics.prices.price}$` : 'not available'
        }
    }

    return {loading, error, process, setProcess,  getAllCharacters, getCharacter, getCharacterByName, clearError, getAllComics, getComics}
}

export default useMarelService;