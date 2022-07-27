import * as React from 'react';
import { Link } from 'react-router-dom';


export default class NavMenu extends React.PureComponent<{}, { isOpen: boolean }> {
    public state = {
        isOpen: false
    };

    public render() {
        return (
            <header>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
            </header>
        );
    }

    private toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
}
