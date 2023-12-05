import { render, screen } from '@testing-library/react';
import LoginForm from '../src/app/(public)/login/loginForm.js';
import '@testing-library/jest-dom';

// Mock useRouter:
jest.mock("next/navigation", () => ({
	useRouter() {
		return {
			prefetch: () => null
		};
	}
}));

// Verifica se todos os campos do login foram renderizados na tela
describe('LoginForm', () => {
	it('renders a heading', () => {
		const { container } = render(<LoginForm />);

		const input_email = screen.getByPlaceholderText('Email');
		const input_password = screen.getByPlaceholderText('Password');
		const button = container.querySelector('button');

		expect(input_email).toBeInTheDocument();
		expect(input_password).toBeInTheDocument();
		expect(button).toBeInTheDocument();
	})
})