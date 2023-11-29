import { NextResponse } from "next/server";
import R from "./r-integration";
import fs from 'fs';
import path from "path";
import csvToJson from 'convert-csv-to-json';

export async function POST(req) {
	const formData = await req.formData();

	let clustermethod = formData.get('clustermethod');
	let distancesmethod = formData.get('distancesmethod');
	let groups = formData.get('groups');
	let file = formData.get('files');

	let now = Date.now();
	let buffer = Buffer.from(await file.arrayBuffer());
	let filename = now + file.name.replaceAll(" ", "_");
	let filepath = path.join(process.cwd(), "./uploads/");
	let fullpath = `${filepath.replace(/\\/g, "/")}${filename.replace(/\\/g, "/")}`;

	try {
		if (!fs.existsSync(filepath)){
			fs.mkdirSync(filepath, { recursive: true });
		}
	} catch (err) {
		console.error(err);
		return NextResponse.json({ Message: "Failed", status: 500 });
	}

	try {
		fs.writeFileSync(filepath + filename, buffer);
	} catch (error) {
		return NextResponse.json({ Message: "Failed", status: 500 });
	}

	let result = R.callMethod("./src/RScripts/script.r", "x", {clustermethod: clustermethod, distancesmethod: distancesmethod, groups: parseInt(groups), csv_path: fullpath, result_path: filepath.replace(/\\/g, "/"), now});

	let output_all = csvToJson.getJsonFromCsv(filepath + now + 'output_all.csv');
	let output_media = csvToJson.getJsonFromCsv(filepath + now + 'output_media.csv');
	let output_sd = csvToJson.getJsonFromCsv(filepath + now + 'output_sd.csv');

	try {
		fs.unlinkSync(filepath + filename);
		fs.unlinkSync(filepath + now + 'output_all.csv');
		fs.unlinkSync(filepath + now + 'output_media.csv');
		fs.unlinkSync(filepath + now + 'output_sd.csv');
	} catch (error) {
		return NextResponse.json({ Message: "Failed", status: 500 });
	}

	return NextResponse.json({
		output_all,
		output_media,
		output_sd
	});
}