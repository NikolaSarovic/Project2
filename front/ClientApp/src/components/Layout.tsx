import * as React from 'react';
import '../style/pageContainerStyle.css'


export default class Layout extends React.PureComponent<{}, { children?: React.ReactNode }> {
    public render() {
        return (
            <React.Fragment>
                <div className='cont'>
                    {this.props.children}
                </div>
            </React.Fragment>
        );
    }
}