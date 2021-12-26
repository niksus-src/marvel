import { Component } from 'react/cjs/react.production.min';
import MarelService from '../../services/MarvelService';
import ErrorMes from '../errorMes/ErrorMes';
import Spinner from '../spinner/Spinner';

import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';

class RandomChar extends Component {

    state = {
        char: {},
        loading: true,
        error: false
    }

    onCharLoaded = (char) => {
        this.setState({char, loading: false})
    }

    onClickLoad = () => {
        this.setState({
            loading: true,
            error: false
        });
        this.updateChar();
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true
        })
    }

    componentDidMount() {
        this.updateChar();
    }

    marvelService = new MarelService();

    updateChar = () => {
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        this.marvelService.getCharacter(id)
            .then(this.onCharLoaded)
            .catch(this.onError);
    }

    render () {
        const {char, loading, error} = this.state;
        const errormes = error ? <ErrorMes/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading |  error) ? <View char={char}/> : null;

        return (
        <div className="randomchar">
            {errormes}
            {spinner}
            {content}
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br/>
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button className="button button__main">
                    <div className="inner" onClick={this.onClickLoad}>try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
            </div>
        </div>
    )}
}

const View = ({char}) => {
    const {name, description, thumbnail, homepage, wiki} = char;

    const imgStyle = {
        'objectFit': (thumbnail.indexOf('image_not_available') > -1) ? 'contain' : 'cover'
    }

    return (
        <div className="randomchar__block">
        <img style={imgStyle} src={thumbnail} alt="Random character" className="randomchar__img"/>
        <div className="randomchar__info">
            <p className="randomchar__name">{name}</p>
            <p className="randomchar__descr">
                {description}
            </p>
            <div className="randomchar__btns">
                <a href={homepage} className="button button__main">
                    <div className="inner">homepage</div>
                </a>
                <a href={wiki} className="button button__secondary">
                    <div className="inner">Wiki</div>
                </a>
            </div>
        </div>
    </div>
    )
}

export default RandomChar;