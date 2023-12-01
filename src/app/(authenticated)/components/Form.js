"use client";

import { useState } from "react";
import React from 'react'
import Table from './table'

export default function Form() {
	const [csv, setCsv] = useState();
	const [clustermethod, setClusterMethod] = useState("");
	const [distancesmethod, setDistancesMethod] = useState("");
	const [groups, setGroups] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const [output_all, setOutputall] = useState([]);
	const [output_media, setOutputmedia] = useState([]);
	const [output_sd, setOutputsd] = useState([]);

	const output_media_pv_header = React.useMemo(() => [
		{
			accessor: "\"Grupo\"",
			Header: 'Grupo',
		},
		{
			accessor: "\"n\"",
			Header: 'n',
		},
		{
			accessor: "\"Age\"",
			Header: 'Age',
		},
		{
			accessor: "\"Weight\"",
			Header: 'Weight',
		},
		{
			accessor: "\"Glycemia\"",
			Header: 'Glycemia',
		},
		{
			accessor: "\"Prolactin\"",
			Header: 'Prolactin',
		},
		{
			accessor: "\"HDL\"",
			Header: 'HDL',
		},
		{
			accessor: "\"LDL\"",
			Header: 'LDL',
		},
		{
			accessor: "\"Triglycerides\"",
			Header: 'Triglycerides',
		},
		{
			accessor: "\"Risperidone\"",
			Header: 'Risperidone',
		},
		{
			accessor: "\"Valproate\"",
			Header: 'Valproate',
		},
	], [])

	const output_all_header = React.useMemo(() => [
		{
			accessor: "\"Patient\"",
			Header: 'Patient',
		},
		{
			accessor: "\"Sex\"",
			Header: 'Sex',
		},
		{
			accessor: "\"Classification\"",
			Header: 'Classification',
		},
		{
			accessor: "\"Age\"",
			Header: 'Age',
		},
		{
			accessor: "\"Weight\"",
			Header: 'Weight',
		},
		{
			accessor: "\"Glycemia\"",
			Header: 'Glycemia',
		},
		{
			accessor: "\"Prolactin\"",
			Header: 'Prolactin',
		},
		{
			accessor: "\"HDL\"",
			Header: 'HDL',
		},
		{
			accessor: "\"LDL\"",
			Header: 'LDL',
		},
		{
			accessor: "\"Triglycerides\"",
			Header: 'Triglycerides',
		},
		{
			accessor: "\"Risperidone\"",
			Header: 'Risperidone',
		},
		{
			accessor: "\"Valproate\"",
			Header: 'Valproate',
		},
		{
			accessor: "\"Grupo\"",
			Header: 'Grupo',
		},
	], [])


	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!csv) {
			setError("Missing csv file");
			return;
		}

		if (!distancesmethod) {
			setError("Missing distances method");
			return;
		}

		if (!clustermethod) {
			setError("Missing cluster method");
			return;
		}

		if (!groups) {
			setError("Missing groups");
			return;
		}

		let data = new FormData();
		data.append('files', csv, csv.name)
		data.append('clustermethod', clustermethod);
		data.append('distancesmethod', distancesmethod);
		data.append('groups', groups);

		setLoading(true);

		try {
			let { output_all, output_media, output_sd } = await (await fetch('/api/rrunner/', {
				method: "POST",
				body: data,
				'Content-Type': 'multipart/form-data;'
			})).json();

			setOutputall(output_all);
			setOutputmedia(output_media);
			setOutputsd(output_sd);
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="flex-1">
			{loading ? (
				<div>
					loading
				</div>
			) : (
				<div>
					<form onSubmit={handleSubmit} className="flex flex-col gap-3">
						<div className="flex flex-col gap-3">
							<label htmlFor="">CSV File</label>
							<input alt="CSV file" onChange={(e) => setCsv(e.target.files[0])} type="file" required className="rounded-md bg-white p-3 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300"/>
						</div>
						<div className="flex flex-col gap-3">
							<label htmlFor="">Distances Method</label>
							<select data-testid="Distances-Method" onChange={(e) => setDistancesMethod(e.target.value)} value={distancesmethod} required className="rounded-md bg-white p-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300">
								<option value=""></option>
								<option value="euclidean">Euclidean Distance</option>
								<option value="maximum">Maximum Distance</option>
								<option value="manhattan">Manhattan Distance</option>
								<option value="canberra">Canberra Distance</option>
								<option value="binary">Binary Distance</option>
								<option value="minkowski”">Minkowski Distance</option>
							</select>
						</div>
						<div className="flex flex-col gap-3">
							<label htmlFor="">Cluster Method</label>
							<select data-testid="Cluster-Method" onChange={(e) => setClusterMethod(e.target.value)} value={clustermethod} required className="rounded-md bg-white p-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300">
								<option value=""></option>
								<option value="complete">Complete Linkage</option>
								<option value="single">Single Linkage</option>
								<option value="average">Average Linkage</option>
								<option value="ward.D">Centroid Method</option>
							</select>
						</div>
						<div className="flex flex-col gap-3">
							<label htmlFor="">Groups</label>
							<input alt="Groups" onChange={(e) => setGroups(e.target.value)} value={groups} type="number" min="1" max="10" required className="rounded-md bg-white p-3 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300"/>
						</div>

						<button className="bg-gray-600 text-white font-bold cursor-pointer px-6 py-2 rounded-[12px]">
							RUN CLUSTERING ALGORITHM
						</button>
						{error && (
							<div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
								{error}
							</div>
						)}
					</form>

					{(output_media.length > 0) ? (
						<div className="py-10">
							<h3>Average</h3>
							<Table header={output_media_pv_header} data={output_media}/>
						</div>
					) : null}

					{(output_sd.length > 0) ? (
						<div className="py-10">
							<h3>Standard Deviation</h3>
							<Table header={output_media_pv_header} data={output_sd}/>
						</div>
					) : null}

					{(output_all.length > 0) ? (
						<div className="py-10">
							<h3>Full</h3>
							<Table header={output_all_header} data={output_all}/>
						</div>
					) : null}
				</div>
			)}
		</div>
	);
}
