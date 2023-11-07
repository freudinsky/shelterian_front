import React from 'react'
import { Divider, Button } from '@nextui-org/react'
import { Link } from 'react-router-dom';
import SettingsIcon from './SettingsIcon';

function AdminNav() {
  return (
		<>
			<Divider className="mb-2" />
			<div className="flex justify-between items-center w-full">
				<ul className="flex gap-3 justify-between items-center ">
					<li>
						<Link to="myentries">
							<Button
								className="font-semibold text-base"
								variant="light"
								radius="full"
							>
								Meine Einträge
							</Button>
						</Link>
					</li>
					<li>
						<Link to="new">
							<Button
								className="font-semibold text-base"
								variant="light"
								radius="full"
							>
								Neuer Eintrag
							</Button>
						</Link>
					</li>
				</ul>

				<Link to="account" className="justify-self-right">
					<Button
						className="font-semibold bg-neutral-500 text-white"
						variant="solid"
						radius="full"
                        startContent={<SettingsIcon/>}
					>
						Account
					</Button>
				</Link>
			</div>
			{/* <Divider className="mt-2 mb-4" /> */}
		</>
	);
}

export default AdminNav