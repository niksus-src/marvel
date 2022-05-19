import {useState} from 'react'
import { Helmet } from 'react-helmet';
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBound from '../errorBound/ErrorBound';
import CharSearchForm from '../CharSearchForm/CharSearchForm';


import decoration from '../../resources/img/vision.png';

const MainPage = () => {

    const [selectedChar, setChar] = useState(null);

    const onCharSelected = (id) => {
        setChar(id);
    }

    return(
        <>
          <Helmet>
            <meta
                name="description"
                content="Marvel information portal"
            />
            <title>Marvel information portal</title>
          </Helmet>
          <ErrorBound>
            <RandomChar/>
        </ErrorBound>
        <div className="char__content">
            <ErrorBound>
                <CharList onCharSelected={onCharSelected}/>
            </ErrorBound>
            <ErrorBound>
                <CharInfo charId={selectedChar}/>
            </ErrorBound>
            <ErrorBound>
                <CharSearchForm/>
            </ErrorBound>
        </div>
        <img className="bg-decoration" src={decoration} alt="vision"/>
        </>
    )
}

export default MainPage;