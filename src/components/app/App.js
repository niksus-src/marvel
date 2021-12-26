import {Component} from 'react'
import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBound from '../errorBound/ErrorBound';

import decoration from '../../resources/img/vision.png';

class App extends Component
 {
    state = {
        selectedChar: null
    }

    onCharSelected = (id) => {
        this.setState({
            selectedChar: id
        })
    }


     render() {

         return (
            <div className="app">
            <AppHeader/>
            <main>
                <ErrorBound>
                    <RandomChar/>
                </ErrorBound>
                <div className="char__content">
                    <ErrorBound>
                        <CharList onCharSelected={this.onCharSelected}/>
                    </ErrorBound>
                    <ErrorBound>
                        <CharInfo charId={this.state.selectedChar}/>
                    </ErrorBound>
                </div>
                <img className="bg-decoration" src={decoration} alt="vision"/>
            </main>
        </div>
         );
     }
}

export default App;