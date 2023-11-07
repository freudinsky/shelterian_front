import { Radio, RadioGroup, CheckboxGroup, Checkbox } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import {toast} from "react-toastify"
import { useNavigate } from "react-router-dom";

function NewAnimal() {
	const [type, setType] = useState("");
	const [name, setName] = useState("");
	const [age, setAge] = useState("");
	const [breed, setBreed] = useState("");
	const [description, setDescription] = useState("");
	const [images, setImages] = useState([]);
	const [characteristics, setCharacteristics] = useState([]);
  const nav = useNavigate()
	const { getRootProps, getInputProps } = useDropzone({
		onDrop: (acceptedFiles) =>
			setImages((prevImgs) => [...prevImgs, ...acceptedFiles]),
	});
console.log(images)
	const defaultCharacteristics = {
		childrenFriendly: false,
		largePlace: false,
		catFriendly: false,
		needsExperience: false,
		dogFriendly: false,
	};

	const characteristicObject = characteristics.reduce((obj, key) => {
		if (defaultCharacteristics.hasOwnProperty(key)) {
			obj[key] = true;
		}
		return obj;
	}, defaultCharacteristics);

	const apiUrl = `${import.meta.env.VITE_API_URL}admin/new/${
		type ? (type === "dog" ? "dog" : "cat") : ""
	}`;

  
	const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
        name,
        age,
        breed,
        description,
        images,
        characteristics: characteristicObject
      }
    const formData = new FormData()
    for( const key in data){if (key === 'characteristics') {
        for (const charKey in data.characteristics) {
          formData.append(`characteristics.${charKey}`, data.characteristics[charKey]);
        }
      } else if (key === 'images') {
        for (let i = 0; i < data.images.length; i++) {
          formData.append('images[]', data.images[i]);
        }
      } else {
        formData.append(key, data[key]);
      }}

		try {
			const res = await axios.post(apiUrl,formData,{withCredentials:true});
      if(res.status === 201){
        toast.success("Erfolgreich angelegt.")
        nav("/dashboard/myentries")
      }
		} catch (err) {
			console.log(err);
			toast.error(err);
		}
	};
	const handleDeleteClick = (imgname) => {
		const filteredList = images.filter((img) => img.name !== imgname);
		setImages(filteredList);
	};

	return (
		<div className="form">
			<div className="container bg-slate-100 px-12 w-full my-8 border-slate-200 border-solid border-1  rounded-xl shadow-md shadow-slate-300 py-8">
				<h1 className="font-bold text-2xl text-center">Neuer Eintrag</h1>
				<form className="flex mt-4 w-full flex-wrap" onSubmit={handleSubmit}>
					<RadioGroup
						className="mb-6 pl-2"
						orientation="horizontal"
						value={type}
						color="danger"
						onValueChange={setType}
						isRequired
					>
						<Radio value="dog">Hund</Radio>
						<Radio value="cat">Katze</Radio>
					</RadioGroup>
					<div className="w-full flex justify-between">
						<div className="w-1/2">
							<div className="flex flex-col w-full">
								<input
									className="my-1 w-11/12 border-solid border-1 border-slate-300 rounded-3xl h-10 indent-5"
									type="text"
									name="name"
									placeholder="Name"
									required
									value={name}
									onChange={(e) => setName(e.target.value)}
								/>
								<input
									className="my-1 w-11/12 border-solid border-1 border-slate-300 rounded-3xl h-10 indent-5"
									type="text"
									name="age"
									placeholder="Alter"
									required
									value={age}
									onChange={(e) => setAge(e.target.value)}
								/>
								<input
									className="my-1 w-11/12 border-solid border-1 border-slate-300 rounded-3xl h-10 indent-5"
									type="text"
									name="breed"
									placeholder="Rasse"
									required
									value={breed}
									onChange={(e) => setBreed(e.target.value)}
								/>
							</div>
						</div>

						<div className="flex w-1/2 justify-between gap-2">
							<div className="w-full h-full flex items-center justify-between">
								<div
									className="flex bg-slate-200 justify-center items-center flex-col z-10 border-solid border-1 border-slate-300 rounded-3xl w-full h-full"
									{...getRootProps()}
								>
									<div className="flex flex-col justify-center items-center">
										<img
											width="48"
											height="48"
											src="https://img.icons8.com/material-outlined/48/737373/upload-to-cloud.png"
											alt="upload"
											className="not-selectable"
										/>
										<p className="not-selectable font-semibold">
											Bilder hinzufügen
										</p>
									</div>
									<input
										{...getInputProps}
										className="w-1/4 h-1 bg-transparent not-selectable"
										tabIndex={-1}
									/>
								</div>
							</div>
						</div>
					</div>
					<div className="flex w-full flex-col">
						<textarea
							className="my-3 w-full h-64 border-solid border-1 border-slate-300 rounded-3xl px-5 py-3 mb-3 resize-none"
							rows="5"
							resize="none"
							placeholder="Steckbrief"
							value={description}
							name="description"
							onChange={(e) => setDescription(e.target.value)}
						/>
						<div className="flex justify-between">
							{type ? (
								<CheckboxGroup
									label="Eigenschaften"
									color="danger"
									value={characteristics}
									onChange={setCharacteristics}
									className="mb-4"
								>
									<Checkbox value="childrenFriendly">
										Verträgt sich mit Kindern
									</Checkbox>
									<Checkbox value="catFriendly">
										Verträgt sich mit {type === "cat" ? "anderen" : ""} Katzen
									</Checkbox>
									<Checkbox value="dogFriendly">
										Verträgt sich mit {type === "dog" ? "anderen" : ""} Hunden
									</Checkbox>
									{type === "dog" ? (
										<>
											<Checkbox value="largePlace">
												Braucht viel Platz (nicht als Wohnungshund)
											</Checkbox>
											<Checkbox value="needsExperience">
												Nur an erfahrene Hundehalter
											</Checkbox>
										</>
									) : (
										""
									)}
								</CheckboxGroup>
							) : (
								""
							)}
							{images.length > 0 ? (
								<div className="w-1/2 flex-wrap items-start justify-center overflow-x-hidden overflow-y-scroll no-scrollbar px-5 pt-1">
									<h2 className="justify-self-start mb-2 text-neutral-500">
										Bilder
									</h2>
									<ul className="text-sm break-all p-0 m-0">
										{images.map((img, index) => (
											<li
												key={index}
												className="flex items-center gap-3 bg-rose-100 mb-2 rounded-xl p-2"
											>
												{
													<img
														key={index}
														width={17}
														height={17}
														className="not-selectable cursor-pointer"
														src="https://img.icons8.com/material-rounded/96/f31260/filled-trash.png"
														alt="delete-sign--v1"
														onClick={() => handleDeleteClick(img.name)}
													/>
												}{" "}
												{img.name}
											</li>
										))}
									</ul>
								</div>
							) : (
								""
							)}
						</div>
						<input
							type="submit"
							value="Absenden"
							className="mt-3 w-1/3 self-center bg-rose-800 text-white font-semibold px-7 py-1 rounded-3xl h-10"
						/>
					</div>
				</form>
			</div>
		</div>
	);
}

export default NewAnimal;
