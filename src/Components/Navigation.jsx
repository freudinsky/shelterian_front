import React from "react";
import {
	Dropdown,
	DropdownTrigger,
	DropdownMenu,
	DropdownItem,
	Button,
} from "@nextui-org/react";
import { Link, useNavigate } from "react-router-dom";


function Navigation() {
	const nav = useNavigate()
	return (
		<>
			<div className="flex justify-between">
				<div className="flex justify-start gap-8 items-center w-full">
					<Dropdown>
						<DropdownTrigger>
							<Button
								className="font-semibold text-amber-950 text-base"
								variant="light"
								radius="full"
							>
								Tiersuche
							</Button>
						</DropdownTrigger>
						<DropdownMenu
							aria-label="Static Actions"
							onAction={(key) => nav(`/browse/${key}`)}
						>
							<DropdownItem
								aria-label="Static Actions"
								className="font-semibold text-amber-950 text-base"
								key="dog"
							>
								Hunde
							</DropdownItem>
							<DropdownItem
								aria-label="Static Actions"
								className="font-semibold text-amber-950 text-base"
								key="cat"
							>
								Katzen
							</DropdownItem>
						</DropdownMenu>
					</Dropdown>

					<Button
						className="font-semibold text-amber-950 text-base"
						variant="light"
						radius="full"
					>
						Über Shelterian
					</Button>

					<Button
						className="font-semibold text-amber-950 text-base"
						variant="light"
						radius="full"
					>
						Für Tierheime
					</Button>
				</div>
			</div>
		</>
	);
}

export default Navigation;
