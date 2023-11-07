import React from "react";
import {
	Dropdown,
	DropdownTrigger,
	DropdownMenu,
	DropdownItem,
	Button,
} from "@nextui-org/react";
import { Link } from "react-router-dom";


function Navigation() {
	return (
		<>
			<div className="flex justify-between">
				<div className="flex justify-start gap-8 items-center w-full">
					<Dropdown>
						<DropdownTrigger>
							<Button
								className="font-semibold text-base"
								variant="light"
								radius="full"
							>
								Tiersuche
							</Button>
						</DropdownTrigger>
						<DropdownMenu aria-label="Static Actions">
							<DropdownItem key="dogs">
								<Link className="font-semibold text-base" to="/browse/dogs">
									Hunde
								</Link>
							</DropdownItem>
							<DropdownItem key="cats">
								<Link className="font-semibold text-base" to="/browse/cats">
									Katzen
								</Link>
							</DropdownItem>
						</DropdownMenu>
					</Dropdown>

					<Button
						className="font-semibold text-base"
						variant="light"
						radius="full"
					>
						Über Shelterian
					</Button>

					<Button
						className="font-semibold text-base"
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
