import ReactDOM from 'react-dom';

it('renders without crashing with react', () => {
  const div = document.createElement('div');
  ReactDOM.unmountComponentAtNode(div);
});
