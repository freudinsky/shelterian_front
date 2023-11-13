import { Button, ModalBody, ModalFooter, ModalHeader } from "@nextui-org/react";
import React, { useState } from "react";
import { useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import DOMPurify from "dompurify";

const TermsEditor = ({ terms, setTerms, onClose }) => {
	const [editorContent, setEditorContent] = useState(terms);

	useEffect(() => {
		setEditorContent(terms);
	}, []);

	const handleSave = () => {
		const sanitizedHtml = DOMPurify.sanitize(editorContent);
		setTerms(sanitizedHtml);
		onClose();
	};
	const modules = {
		toolbar: [
			[{ header: "1" }, { header: "2" }, ],
			["bold", "italic", "underline", "strike", "blockquote"],
			[
				{ list: "ordered" },
				{ list: "bullet" },
				{ indent: "-1" },
				{ indent: "+1" },
			],
			["link"],
			["clean"],
		],
	};

	return (
		<>
			<ModalBody className="h-4/6">
				<ReactQuill
					value={editorContent}
					onChange={setEditorContent}
					modules={modules}
				/>
			</ModalBody>
			<ModalFooter className="h-1/6 pt-0">
				<Button
					radius="full"
					onPress={onClose}
					className="mt-1 bg-neutral-500 text-white font-semibold px-7 py-1 rounded-3xl h-10"
				>
					Abbrechen
				</Button>
				<Button
					onPress={handleSave}
					radius="full"
					className="mt-1 bg-rose-800 text-white font-semibold px-7 py-1 rounded-3xl h-10"
				>
					Speichern
				</Button>
			</ModalFooter>
		</>
	);
};

export default TermsEditor;
