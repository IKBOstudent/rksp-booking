import { createRoot } from 'react-dom/client';
import App from './App';

import './styles/index.scss';

import '@gravity-ui/uikit/styles/fonts.css';
import '@gravity-ui/uikit/styles/styles.css';

const root = createRoot(document.getElementById('root')!);
root.render(<App />);
