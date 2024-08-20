import { Link } from 'react-router-dom';

export const Logo = (props: any) => {
    return (
        <Link to="/" {...props}>
            <img
                src="/striker-base-icon.png"
                alt="Logo"
                width="70px"
            />
        </Link>
    );
};
