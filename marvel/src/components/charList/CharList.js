import {useState, useEffect, useRef} from 'react';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import PropTypes from 'prop-types';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMes from '../errorMes/ErrorMes';

import './charList.scss';

const setContent = (process, Component, newItemLoading) => {
    switch (process) {
        case 'waiting':
            return <Spinner/>;
        case 'loading':
            return newItemLoading ? <Component/> : <Spinner/>;
        case 'confirmed':
            return <Component/>;
        case 'error':
            return <ErrorMes/>;
        default:
            throw new Error('Unexpected process state');
    }
}

const CharList = (props) => {

    const [charList, setList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offsetChar, setOffset] = useState(410);
    const [charEnded, setCharEnded] = useState(false);

    const { getAllCharacters, process, setProcess} = useMarvelService();

    useEffect(()=> {
        onRequest(offsetChar, true)
    }, []);

    const onRequest = (offset, init) => {
        init ? setNewItemLoading(false) : setNewItemLoading(true);
        getAllCharacters(offset)
            .then(onCharListLoaded)
            .then(() => setProcess('confirmed'))
    }

    const onCharListLoaded = (newCharList) => {
        let ended = false;
        if (newCharList.length < 9) {
            ended = true;
        }

        setList(charList => [...charList, ...newCharList]);
        setNewItemLoading(newItemLoading => false);
        setOffset(offsetChar => offsetChar + 9);
        setCharEnded(charEnded => ended);
    }

    const refList = useRef([]);

    const focusRef = (id) => {
        refList.current.forEach(item => item.classList.remove('char__item_selected'));
        refList.current[id].classList.add('char__item_selected');
        refList.current[id].focus();
    }

    function renderList(arr) {
        const items = arr.map((item, i) => {
            let  imgStyle = {
                'objectFit': (item.thumbnail.indexOf('image_not_available') > -1) ? 'contain' : 'cover'
            }
            return (
                <CSSTransition key={item.id} timeout={500} classNames="char__item">
                    <li className="char__item" 
                        tabIndex={0}
                        key={item.id}
                        ref={el => refList.current[i] = el}
                        onClick={() => {props.onCharSelected(item.id); focusRef(i)}}
                        >
                            <img src={item.thumbnail} alt={item.name} style={imgStyle}/>
                            <div className="char__name">{item.name}</div>
                    </li>
                </CSSTransition>
            )
        })
        return (
            <ul className="char__grid">
                <TransitionGroup component={null}>
                    {items}
                </TransitionGroup>
            </ul>
        )
    }
    
    return (
        <div className="char__list">
            {setContent(process, () => renderList(charList), newItemLoading)}
            <button 
            className="button button__main button__long"
            disabled={newItemLoading}
            style={{'display': charEnded ? 'none' : 'block'}}
            onClick={() => onRequest(offsetChar)}
            >
                <div className="inner">load more</div>
            </button>
        </div>
    )}

CharList.propTypes = {
    onCharSelected: PropTypes.func.isRequired
}

export default CharList;