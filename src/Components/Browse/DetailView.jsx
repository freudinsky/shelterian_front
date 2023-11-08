import {
	Divider,
	Spinner,
	Table,
	TableHeader,
	TableBody,
	TableColumn,
	TableRow,
	TableCell,
	Chip,
} from "@nextui-org/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ReactImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { format } from "date-fns";

function DetailView() {
	const [animal, setAnimal] = useState();
	const [currentImageIndex, setCurrentImageIndex] = useState(0);
	const { type, id } = useParams();

	function forceUpdate() {
		const cardComponent = ref.current.querySelector(".card-wrap");
		cardComponent.forceUpdate();
	}
	const renderChips = () => {
		const chips = [];

		const nameMap = {
			largePlace: "🏡 Haus&Garten",
			needsExperience: "🎓 Nur erfahrene Halter",
			catFriendly: "🐈 Katzenfreundlich",
			dogFriendly: "🐕 Hundefreundlich",
			childrenFriendly: "🍼 Kinderfreundlich",
		};

		for (const [characteristic, value] of Object.entries(
			animal.characteristics
		)) {
			if (characteristic !== "_id" && value) {
				// Rename the property using the name map
				const newCharacteristic = nameMap[characteristic];

				chips.push(
					<Chip
						key={newCharacteristic}
						className="semibold bg-rose-900 text-white h-10"
					>
						{newCharacteristic}
					</Chip>
				);
			}
		}

		return chips;
	};

	useEffect(() => {
		const animalFetch = async () => {
			try {
				const res = await axios.get(
					`${import.meta.env.VITE_API_URL}data/${type}/${id}`
				);
				if (res.status === 200 && res.data) {
					setAnimal(res.data);
					forceUpdate();
				}
			} catch (error) {}
		};
		animalFetch();
	}, []);

	const images = animal?.images.map((url) => ({
		original: url.replace("/upload/", "/upload/w_650,h_450,c_fill/"),
		thumbnail: url.replace("/upload/", "/upload/w_150/"),
	}));

	return (
		<>
			<div className="max-w-screen-lg mx-auto">
				<div className="w-full flex-col justify-center">
					{animal ? (
						<>
							<div className="w-full flex justify-center">
								<div className="card-wrap">
									<ReactImageGallery
										items={images}
										showPlayButton="false"
										showThumbnails={true}
										thumbnailPosition="right"
										onThumbnailClick={(index) => setCurrentImageIndex(index)}
										startIndex={currentImageIndex}
										additionalClass="gallery"
									/>
								</div>
							</div>

							<Divider className="my-4 max-w-screen-md mx-auto" />
							<div className="max-w-screen-md mx-auto">
								<h1 className="text-2xl font-bold text-left mb-4">
									{animal?.name}
								</h1>
								<p>{animal?.description}</p>
								<Divider className="my-4 max-w-screen-md mx-auto" />
								<div className="flex justify-between gap-2 w-full">
									<div className="w-1/2">
										<Table className="tablea text-white" hideHeader aria-label="table">
											<TableHeader>
												<TableColumn>Key</TableColumn>
												<TableColumn>Value</TableColumn>
											</TableHeader>
											<TableBody>
												<TableRow key="1">
													<TableCell className="font-bold w-1/3">
														Tierheim:
													</TableCell>
													<TableCell className="text-left">
														{animal.shelter.name}
													</TableCell>
												</TableRow>
												<TableRow key="2">
													<TableCell className="font-bold w-1/3">
														Anschrift:
													</TableCell>
													<TableCell className="text-left">{`${animal.shelter.address}, ${animal.shelter.postcode} ${animal.shelter.city}`}</TableCell>
												</TableRow>
												{animal.shelter.phone ? (
													<TableRow key="3">
														<TableCell className="font-bold w-1/3">
															Telefon:
														</TableCell>
														<TableCell className="text-left">
															{animal.shelter.phone}
														</TableCell>
													</TableRow>
												) : (
													""
												)}
												<TableRow key="4">
													<TableCell className="font-bold w-1/3">
														E-Mail:
													</TableCell>
													<TableCell className="text-left">
														<Link to={`mailto:${animal.shelter.email}`}>
															{animal.shelter.email}
														</Link>
													</TableCell>
												</TableRow>
												<TableRow key="5">
													<TableCell className="font-bold w-1/3">
														Online seit:
													</TableCell>
													<TableCell className="text-left">
														{format(new Date(animal.timestamp), "dd.MM.yyyy")}
													</TableCell>
												</TableRow>
											</TableBody>
										</Table>
									</div>
									<div className="flex gap-1 flex-wrap w-1/2 justify-around">
										{renderChips()}
									</div>
								</div>
							</div>
						</>
					) : (
						<Spinner
							color="warning"
							className="justify-self-center self-center mx-auto"
						/>
					)}
				</div>
			</div>
		</>
	);
}

export default DetailView;
