import {Component} from 'react';
import PropTypes from 'prop-types';
import Spinner from '../spinner/Spinner';
import ErrorMes from '../errorMes/ErrorMes';
import MarvelService from '../../services/MarvelService';
import './charList.scss';

class CharList extends Component {

    state = {
        charList: [],
        loading: true,
        error: false,
        newItemLoading: false,
        offsetChar: 410,
        charEnded: false
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.onRequest();
    }

    onRequest = (offset) => {
        this.onCharListLoading();
        this.marvelService.getAllCharacters(offset)
            .then(this.onCharListLoaded)
            .catch(this.onError)
    }

    onCharListLoading = () => {
        this.setState({newItemLoading: true})
    }

    onCharListLoaded = (newCharList) => {
        let ended = false;
        if (newCharList.length < 9) {
            ended = true;
        }

        this.setState(({offsetChar, charList}) => ({
            charList: [...charList, ...newCharList],
            loading: false,
            newItemLoading: false,
            offsetChar: offsetChar + 9,
            charEnded: ended
        }))
    }

    refList = [];

    setRef = ref => {
        this.refList.push(ref);
    }

    focusRef = (id) => {
        this.refList.forEach(item => item.classList.remove('char__item_selected'));
        this.refList[id].classList.add('char__item_selected');
        console.dir(this.refList[id]);
    }

    onError = () => {
        this.setState({
            error: true,
            loading: false
        })
    }

    renderList(arr) {
        const items = arr.map((item, i) => {
            let  imgStyle = {
                'objectFit': (item.thumbnail.indexOf('image_not_available') > -1) ? 'contain' : 'cover'
            }
            return (
                <li className="char__item" 
                tabIndex={0}
                key={item.id}
                ref={this.setRef}
                onClick={() => {this.props.onCharSelected(item.id); this.focusRef(i)}}
                >
                    <img src={item.thumbnail} alt={item.name} style={imgStyle}/>
                    <div className="char__name">{item.name}</div>
                </li>
            )
        })
        return (
            <ul className="char__grid">
                {items}
            </ul>
        )
    }

    render () {
        
    const {charList, error, loading, offsetChar, newItemLoading, charEnded} = this.state;
    const items = this.renderList(charList);
    const errorMessage = error ? <ErrorMes/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error) ? items : null;

    return (
        <div className="char__list">
                {errorMessage}
                {spinner}
                {content}
            <button 
            className="button button__main button__long"
            disabled={newItemLoading}
            style={{'display': charEnded ? 'none' : 'block'}}
            onClick={() => this.onRequest(offsetChar)}
            >
                <div className="inner">load more</div>
            </button>
        </div>
    )}
}

CharList.propTypes = {
    onCharSelected: PropTypes.func.isRequired
}

export default CharList;