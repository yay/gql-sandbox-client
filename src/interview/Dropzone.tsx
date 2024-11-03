import React, { FC, useRef, useState } from 'react';
import { Box, List, ListItem } from '@mui/material';
import { dropItemsToFilesAndFolders, FileWithPath } from './dropUtils';

export const Dropzone: FC = (props) => {
	const [backgroundColor, setBackgroundColor] = useState('none');
	const [elements, setElements] = useState<JSX.Element>();

	function handleDragEnter(event: React.DragEvent<HTMLDivElement>) {
		const items: DataTransferItem[] = Array.from(event.dataTransfer?.items || []);
		// Can give visual feedback when attempting to upload unsupported/unknown file types.
		// Can only do the check for top-level items. Recursing into folders might take a long time.
		setBackgroundColor(items.some((item) => item.type.match('^image/')) ? 'red' : 'green');
	}

	function handleDragOver(event: React.DragEvent<HTMLDivElement>) {
		event.stopPropagation();
		event.preventDefault();

		const { dataTransfer } = event;
		if (dataTransfer) {
			dataTransfer.dropEffect = 'copy';
		}
	}

	function handleDragLeave() {
		setBackgroundColor('none');
	}

	async function handleDrop(event: React.DragEvent<HTMLDivElement>) {
		event.stopPropagation();
		event.preventDefault();

		const items: DataTransferItem[] = Array.from(event.dataTransfer?.items || []);

		const filesAndFolders = await dropItemsToFilesAndFolders(items);
		setElements(await renderFiles(filesAndFolders.files));
	}

	return (
		<Box>
			<Box
				sx={{
					width: '300px',
					height: '200px',
					border: '1px solid black',
					borderRadius: '5px',
					backgroundColor,
				}}
				onDragEnter={handleDragEnter}
				onDragOver={handleDragOver}
				onDragLeave={handleDragLeave}
				onDrop={handleDrop}
			/>
			<Box component="output">{elements}</Box>
		</Box>
	);
};

// render all files as list items
async function renderFiles(files: FileWithPath[]): Promise<JSX.Element> {
	const listItems = await Promise.all(
		files.map(async (f) => {
			const { file } = f;
			const fileType = ` (${file.type || 'n/a'}) `;
			const lastModified = new Date(file.lastModified).toLocaleDateString();
			const src = file.type.match('image.*')
				? await new Promise<string>((resolve, reject) => {
						const reader = new FileReader();
						reader.onload = (event) => {
							if (typeof event.target?.result === 'string') {
								resolve(event.target.result);
							} else {
								reject('Bad result');
							}
						};
						reader.readAsDataURL(file);
					})
				: undefined;

			return (
				<ListItem
					key={file.name}
					sx={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'start',
						border: '1px solid black',
						borderRadius: '5px',
					}}
				>
					<div>File name: {file.name}</div>
					<div>File type: {fileType}</div>
					<div>Last modified: {lastModified}</div>
					{src ? <img src={src} style={{ maxWidth: '400px' }} /> : null}
				</ListItem>
			);
		}),
	);

	return <List sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>{listItems}</List>;
}
