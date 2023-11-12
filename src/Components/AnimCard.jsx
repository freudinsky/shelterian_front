import {
	Button,
	Card,
	CardFooter,
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	ModalContent,
	useDisclosure,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthProv";
import DeleteIcon from "./AdminDashboard/DeleteIcon";
import EditIcon from "./AdminDashboard/EditIcon";
import { toast } from "react-toastify";
import axios from "axios";

function AnimCard({ animal, type }) {
	const [admin, setAdmin] = useState(false);
	const [image, setImage] = useState("")
	const [lowQualImg, setLowQualImg] = useState("")
	const nav = useNavigate();
	const { loggedIn, shelterData, refresh, setRefresh } = useAuth();
	const { isOpen, onOpen, onOpenChange } = useDisclosure();

	const handlePress = () => nav(`detail/${type}/${animal._id}`);

	const handleDelete = async () => {
		try {
			const res = await axios.delete(
				`${import.meta.env.VITE_API_URL}admin/delete/${type}/${animal._id}`,{withCredentials:true}
			);
			if (res.status === 201) {
				toast.success("Löschen erfolgreich!");
				setRefresh(!refresh)
			} else {
				console.log(res.error, res)
				toast.error(res.error);
			}
		} catch (err) {
			toast.error(err);
		}
	};

	useEffect(() => {

		const img = animal.images[0].replace("/upload/","/upload/q_auto/f_auto/")
		setImage(img)
		const lowImg = animal.images[0].replace(
			"/upload/",
			"/upload/w_10/e_blur:50/q_auto:low/f_auto/"
		);
		setLowQualImg(lowImg)

		if (loggedIn && animal.shelter._id === shelterData._id) {
			setAdmin(true);
		}
	
	}, []);
	
	const imgStyle = {backgroundImage: `url(${lowQualImg})`, backgroundSize: "cover", backgroundPosition: "center"}

	return (
		<Card
			onPress={handlePress}
			radius="lg"
			className="cardi border-none w-52 h-72 my-2 bg-amber-800 shadow-lg"
		>
			<Link to={`/detail/${type}/${animal._id}`} className="w-full h-2/3">
				<div
					className="object-cover object-center w-full h-full"
					style={imgStyle}
				>
					<img
						className="object-cover object-center w-full h-full"
						src={image}
						loading="lazy"
					/>
				</div>
			</Link>
			<CardFooter className="pt-0 pb-2 px-6 flex h-1/3 flex-nowrap justify-center items-around">
				<Link to={`/detail/${type}/${animal._id}`} className="w-3/5">
					<div className="flex-col w-full">
						<p className="text-lg text-white/80 text-left font-bold">{`${animal.name}, ${animal.age}`}</p>
						<p className="text-tiny w-full text-left text-white/80">{`${animal.breed}`}</p>
					</div>
				</Link>
				{admin ? (
					<div className="flex gap-1 my-1 justify-end items-center h-8 w-2/5">
						<Button size="sm" isIconOnly color="warning">
							<EditIcon />
						</Button>
						<Button size="sm" isIconOnly color="danger" onPress={onOpen}>
							<DeleteIcon />
						</Button>
						<Modal size="xs" isOpen={isOpen} onOpenChange={onOpenChange}>
							<ModalContent>
								{(onClose) => (
									<>
										<ModalHeader className="text-lg font-bold text-white bg-red-700">
											Eintrag löschen?
										</ModalHeader>
										<ModalBody className="p-4 mt-2 mb-4">
											<p className="">
												Soll der Eintrag wirklich endgültig gelöscht werden?
											</p>
										</ModalBody>
										<ModalFooter>
											<Button radius="full" onPress={onClose}>
												Abbrechen
											</Button>
											<Button
												radius="full"
												color="danger"
												onPress={async () => {
													await handleDelete();
													onClose();
												}}
											>
												Löschen
											</Button>
										</ModalFooter>
									</>
								)}
							</ModalContent>
						</Modal>
					</div>
				) : (
					<div className="w-2/5"></div>
				)}
			</CardFooter>
		</Card>
	);
}

export default AnimCard;
