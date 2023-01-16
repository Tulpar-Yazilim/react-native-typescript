/**
 * @format
 */

import React from 'react';
import 'react-native';
import App from '../app';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders correctly', () => renderer.create(<App />));
