import { render, screen } from '@testing-library/react';
import Dashboard from '../src/app/(authenticated)/page.js';
import '@testing-library/jest-dom';

describe('Dashboard', () => {
	it('renders a heading', () => {
		const { container } = render(<Dashboard />);

		const Form = container.querySelector('Form');

		expect(Form).toBeInTheDocument();
	})
})