import { createRoot } from 'react-dom/client';
import App from './App';

import '@gravity-ui/uikit/styles/fonts.css';
import '@gravity-ui/uikit/styles/styles.css';

import './styles/index.scss';

const root = createRoot(document.getElementById('root')!);
root.render(<App />);
