import { render, screen } from '@testing-library/react';
import Dashboard from '../src/app/(authenticated)/page.js';
import '@testing-library/jest-dom';

// Teste tela do Dashboard
describe('Dashboard', () => {
	it('renders a heading', () => {
		
		// Teste renderização da tela (componente)
		const { container } = render(<Dashboard />);

		// Busca um componente com a tag 'Form' dentro do container
		const Form = container.querySelector('Form');

		// Testa se o form existe, ou seja, se está dentro do doc
		expect(Form).toBeInTheDocument();
	})
})