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
	Tooltip,
} from "@nextui-org/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ReactImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { format } from "date-fns";

function DetailView() {
	const [animal, setAnimal] = useState();
	const [images, setImages] = useState();
	// const [lowQualImg, setLowQualImg] = useState("");
	const { type, id } = useParams();

	function forceUpdate() {
		const cardComponent = ref.current.querySelector(".card-wrap");
		cardComponent.forceUpdate();
	}
	const renderChips = () => {
		const chips = [];

		const nameMap = {
			largePlace: (
				<img
					width="30"
					height="30"
					src="https://img.icons8.com/cute-clipart/64/deciduous-tree.png"
					alt="deciduous-tree"
				/>
			),
			needsExperience: (
				<img
					width="30"
					height="30"
					src="https://img.icons8.com/color/48/graduation-cap.png"
					alt="graduation-cap"
				/>
			),
			catFriendly: (
				<img
					width="30"
					height="30"
					src="https://img.icons8.com/cute-clipart/64/cat.png"
					alt="cat"
				/>
			),
			dogFriendly: (
				<img
					width="30"
					height="30"
					src="https://img.icons8.com/cute-clipart/64/dog.png"
					alt="dog"
				/>
			),
			childrenFriendly: (
				<img
					width="30"
					height="30"
					src="https://img.icons8.com/cute-clipart/64/baby.png"
					alt="baby"
				/>
			),
		};

		const tooltipMap = {
			largePlace: "Benötigt viel Platz - idealerweise Haus und Garten",
			needsExperience: "Nur an erfahrene Hundehalter abzugeben.",
			catFriendly: `Verträgt sich mit ${
				type === "cat" ? "anderen" : ""
			} Katzen`,
			dogFriendly: `Verträgt sich mit ${
				type === "dog" ? "anderen" : ""
			} Hunden`,
			childrenFriendly: "Verträgt sich mit Kindern.",
		};

		for (const [characteristic, value] of Object.entries(
			animal.characteristics
		)) {
			if (characteristic !== "_id" && value) {
				const newCharacteristic = nameMap[characteristic];
				const toolTip = tooltipMap[characteristic];

				chips.push(
					<Tooltip
					key={characteristic}
						showArrow="true"
						content={toolTip}
						placement="top"
						color="danger"
						size="lg"
					>
						<Chip
							key={newCharacteristic}
							className="semibold bg-rose-950/30 text-white h-12"
							radius="full"
						>
							{newCharacteristic}
						</Chip>
					</Tooltip>
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
					const images = res.data.images.map((url) => ({
						original: url.replace("/upload/", "/upload/q_auto/w_750/f_auto/"),
						thumbnail: url.replace("/upload/", "/upload/w_150/f_auto/"),
					}));
					setImages(images);

					/// For lazy load blur img later
					// const lowImg = animal.images[0].replace(
					// 	"/upload/",
					// 	"/upload/w_10/e_blur:50/q_auto:low/f_auto/"
					// );
					// setLowQualImg(lowImg);
					///

					forceUpdate();
				}
			} catch (error) {}
		};

		animalFetch();
	}, []);

	/// For lazy load blur bg later
	// const imgStyle = {
	// 	backgroundImage: `url(${lowQualImg})`,
	// 	backgroundSize: "cover",
	// 	backgroundPosition: "center",
	// };
	///

	return (
		<>
			<div className="w-full my-8">
				<div className="w-full flex-col md:flex-row flex gap-10 justify-around items-center">
					{animal ? (
						<>
							<div className="w-3/5 flex justify-center">
								<div className="card-wrap">
									{<ReactImageGallery
										items={images}
										showPlayButton={false}
										showThumbnails={false}
										showFullscreenButton={false}
										showBullets={true}
										// thumbnailPosition="right"
										// onThumbnailClick={(index) => setCurrentImageIndex(index)}
										// startIndex={currentImageIndex}
										additionalClass="gallery"
									/>}
								</div>
							</div>

							<Divider className="my-4mx-auto md:hidden" />
							<div className="w-fit max-w-2xl">
								<h1 className="text-2xl font-bold text-left mb-4">
									{animal?.name}
								</h1>
								<p>{animal?.description}</p>
								<Divider className="my-4 max-w-screen-md mx-auto" />
								<div className="flex justify-start gap-4 w-full">
									<div className="w-3/5">
										<Table
											className="tablea text-white"
											hideHeader
											aria-label="table"
										>
											<TableHeader>
												<TableColumn>Key</TableColumn>
												<TableColumn>Value</TableColumn>
											</TableHeader>
											<TableBody>
												<TableRow key="1">
													<TableCell className="font-bold w-28">
														Tierheim:
													</TableCell>
													<TableCell className="text-left">
														{animal.shelter.name}
													</TableCell>
												</TableRow>
												<TableRow key="2">
													<TableCell className="font-bold ">
														Anschrift:
													</TableCell>
													<TableCell className="text-left">{`${animal.shelter.address}, ${animal.shelter.postcode} ${animal.shelter.city}`}</TableCell>
												</TableRow>
												{animal.shelter.phone ? (
													<TableRow key="3">
														<TableCell className="font-bold">
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
													<TableCell className="font-bold ">E-Mail:</TableCell>
													<TableCell className="text-left">
														<Link to={`mailto:${animal.shelter.email}`}>
															{animal.shelter.email}
														</Link>
													</TableCell>
												</TableRow>
												<TableRow key="5">
													<TableCell className="font-bold ">
														Online seit:
													</TableCell>
													<TableCell className="text-left">
														{format(new Date(animal.timestamp), "dd.MM.yyyy")}
													</TableCell>
												</TableRow>
											</TableBody>
										</Table>
									</div>
									
										<div className="flex gap-2 flex-wrap w-2/5 justify-start h-full items-start ">
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
