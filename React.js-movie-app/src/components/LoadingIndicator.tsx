import Spinner from 'react-bootstrap/Spinner';

type Props = {
    size: 'small' | 'medium' | 'large',
    message: string
};

const sizeMap = {
    small: {
        width: '1.5rem',
        height: '1.5rem'
    },
    medium: {
        width: '2rem',
        height: '2rem'
    },
    large: {
        width: '4rem',
        height: '4rem'
    }
}

const LoadingIndicator = ({ size, message }: Props) => {
    return (
        <div className="d-flex flex-column align-items-center my-2">
            <Spinner animation="border" role="status" style={sizeMap[size]}>
                <span className="visually-hidden">{message}</span>
            </Spinner>
            <span className="my-2">{message}</span>
        </div>
    );
};

LoadingIndicator.defaultProps = {
    size: 'medium',
    message: 'Loading'
};

export default LoadingIndicator;