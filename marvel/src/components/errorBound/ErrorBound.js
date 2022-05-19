import { Component } from "react";
import ErrorMes from "../errorMes/ErrorMes";

class ErrorBound extends Component {
    state = {
        error: false 
    }

    componentDidCatch(error, errorInfo) {
        console.log(error, errorInfo);
        this.setState({error: true})
    }

    render() {
        if (this.state.error){
            return <ErrorMes/>
        }

        return this.props.children;
    }
}

export default ErrorBound;