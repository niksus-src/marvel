import Spinner from '../spinner/Spinner';
import ErrorMes from '../errorMes/ErrorMes';
import Skeleton from '../skeleton/Skeleton';

const setContent = (process, Component, data) => {
    switch (process) {
        case 'waiting':
            return <Skeleton/>;
        case 'loading':
            return <Spinner/>;
        case 'confirmed':
            return <Component data={data}/>;
        case 'error':
            return <ErrorMes/>;
        default:
            throw new Error('Unexpected process state');
    }
}

export default setContent;