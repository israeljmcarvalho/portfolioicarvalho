import { render, screen } from '@testing-library/react';
import Form from '../src/app/(authenticated)/components/Form';
import '@testing-library/jest-dom';


describe('Form', () => {
	it('renders a heading', () => {
		const { container } = render(<Form />);

		const CSV_file = screen.getByAltText('CSV file');
		const Distances_Method = screen.getByTestId('Distances-Method');
		const Cluster_Method = screen.getByTestId('Cluster-Method');
		const Groups = screen.getByAltText('Groups');

		expect(CSV_file).toBeInTheDocument();
		expect(Distances_Method).toBeInTheDocument();
		expect(Cluster_Method).toBeInTheDocument();
		expect(Groups).toBeInTheDocument();
	})
})