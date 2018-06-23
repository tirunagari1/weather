import 'react-native';
import React from 'react';
import App from '../../App';

import renderer from 'react-test-renderer';

it('renders Correctly', () => {
    const hello = renderer.create(
        <App />
    )

})
