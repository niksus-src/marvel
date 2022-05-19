import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';

import './singleComic.scss';
import Spinner from '../spinner/Spinner';
import ErrorMes from '../errorMes/ErrorMes';
import useMarelService from '../../services/MarvelService';

const SingleComicPage = () => {
    const {comicId} = useParams();
    const [comic, setComic] = useState(null)

    const {loading, error, getComics, clearError} = useMarelService();

    useEffect(() => {updateComic()}, [comicId]);

    const updateComic = () => {
        clearError();
        getComics(comicId)
            .then(onComicLoaded)
    }

    const onComicLoaded = (comic) => {
        setComic(comic);
    }

    const errormes = error ? <ErrorMes/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading ||  error || !comic) ? <View comic={comic}/> : null;

    return (
        <>
            {errormes}
            {spinner}
            {content}
        </>
    )
}

const View = ({comic}) => {
    const {title, description, pageCount, thumbnail, language, price} = comic;

    return (
        <div className="single-comic">
            <Helmet>
                <meta
                    name="description"
                    content={title}
                />
                <title>{title}</title>
            </Helmet>
            <img src={thumbnail} alt="title" className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">{pageCount}</p>
                <p className="single-comic__descr">Language: {language}</p>
                <div className="single-comic__price">{price}</div>
            </div>
            <Link to="/comics" className="single-comic__back">Back to all</Link>
        </div>
    )
}

export default SingleComicPage;