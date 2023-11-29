import React from 'react'
import { useTable, useFilters, useGlobalFilter, useSortBy, usePagination } from 'react-table'

function Table(props) {
	let { header, data } = props

	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		prepareRow,
		page,
		canPreviousPage,
		canNextPage,
		pageOptions,
		pageCount,
		gotoPage,
		nextPage,
		previousPage,
		setPageSize,
		state
	} = useTable({
		columns: header,
		data,
	},
		useFilters,
		useGlobalFilter,
		useSortBy,
		usePagination,
	)

	return (
		<>
			<div className="mt-4 flex flex-col">
				<div className="-my-2 overflow-x-auto -mx-4 sm:-mx-6 lg:-mx-8">
					<div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
						<div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
							<table {...getTableProps()} className="min-w-full divide-y divide-gray-200">
								<thead className="bg-gray-50">
									{headerGroups.map((headerGroup, j) => (
										<tr {...headerGroup.getHeaderGroupProps()} key={j}>
											{headerGroup.headers.map((column, index) => (
												<th
													key={index}
													scope="col"
													className="group px-2 py-3 text-left text-xs font-medium text-gray-500"
													{...column.getHeaderProps(column.getSortByToggleProps())}
												>
													<div className="flex items-center justify-between">
														{column.render('Header')}
														<span className="pl-1">
															{column.isSorted
																? column.isSortedDesc
																	? (
																		<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512" fill="rgb(107 114 128 / var(--tw-text-opacity))">
																			<path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"/>
																		</svg>
																	)
																	: (
																		<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512" fill="rgb(107 114 128 / var(--tw-text-opacity))">
																			<path d="M233.4 105.4c12.5-12.5 32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L256 173.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l192-192z"/>
																		</svg>
																	)
																: (
																	<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512" fill="rgb(107 114 128 / var(--tw-text-opacity))">
																		<path d="M233.4 105.4c12.5-12.5 32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L256 173.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l192-192z"/>
																	</svg>
																)}
														</span>
													</div>
												</th>
											))}
										</tr>
									))}
								</thead>
								<tbody
									{...getTableBodyProps()}
									className="bg-white divide-y divide-gray-200"
								>
									{page.map((row, i) => {
										prepareRow(row)
										return (
											<tr {...row.getRowProps()} key={i}>
												{row.cells.map((cell, index) => {
													return (
														<td
															{...cell.getCellProps()}
															className="px-2 py-4 whitespace-nowrap"
															role="cell"
															key={index}
														>
															{cell.column.Cell.name === "defaultRenderer"
																? <div className="text-sm text-gray-500">{cell.render('Cell')}</div>
																: cell.render('Cell')
															}
														</td>
													)
												})}
											</tr>
										)
									})}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>

			<div className="py-3 flex items-center justify-between">
				<div className="flex-1 flex justify-between sm:hidden">
					<button onClick={() => previousPage()} disabled={!canPreviousPage} className="bg-gray-600 text-white font-bold cursor-pointer px-6 py-2 rounded-[12px]">
						Previous
					</button>
					<button onClick={() => nextPage()} disabled={!canNextPage} className="bg-gray-600 text-white font-bold cursor-pointer px-6 py-2 rounded-[12px]">
						Next
					</button>
				</div>
				<div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
					<div className="flex gap-x-2 items-baseline">
						<span className="text-sm text-gray-700">
							Page <span className="font-medium">{state.pageIndex + 1}</span> of <span className="font-medium">{pageOptions.length}</span>
						</span>
						<label>
							<span className="sr-only">Items Per Page</span>
							<select
								className="rounded-md bg-white p-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300"
								value={state.pageSize}
								onChange={e => {
									setPageSize(Number(e.target.value))
								}}
							>
								{[10, 25, 50, 100].map(pageSize => (
									<option key={pageSize} value={pageSize}>
										Show {pageSize}
									</option>
								))}
							</select>
						</label>
					</div>
					{pageCount > 1 && (
						<div>
							<nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
								<button className="bg-gray-600 text-white font-bold cursor-pointer px-6 py-2 rounded-[12px]" onClick={() => gotoPage(0)} disabled={!canPreviousPage} >
									<span>First</span>
								</button>
								<button className="bg-gray-600 text-white font-bold cursor-pointer px-6 py-2 rounded-[12px]" onClick={() => previousPage()} disabled={!canPreviousPage}>
									<span>Previous</span>
								</button>
								<button className="bg-gray-600 text-white font-bold cursor-pointer px-6 py-2 rounded-[12px]" onClick={() => nextPage()} disabled={!canNextPage}>
									<span>Next</span>
								</button>
								<button className="bg-gray-600 text-white font-bold cursor-pointer px-6 py-2 rounded-[12px]" onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
									<span>Last</span>
								</button>
							</nav>
						</div>
					)}
				</div>
			</div>
		</>
	)
}

export default Table;