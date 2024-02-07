"use client";
import React from 'react';
import { Libro } from '../../models';
import { Skeleton } from 'primereact/skeleton';
import { Badge } from 'primereact/badge';
import { Button } from 'primereact/button';

export type LibroListItemProps = {
	libro: Libro
}

const LibroListItem: React.FC<LibroListItemProps> = ({ libro }) => {
	return (
		<div className="p-4 surface-border surface-card flex flex-col justify-between w-[12rem]">
			<div className="flex flex-col gap-2">
				<Skeleton shape="rectangle" size="10rem"></Skeleton>
				{/* <Badge value={`Nro de lote: ${libro.lote}`} severity={"info"} /> */}
				<h3
					className="
					text-sm
									font-bold
									text-gray-800
									mb-2
								"
				>
					{libro.titulo}
				</h3>
				{/* <p
							className="
										text-gray-600
									"
						>
							{libro.description}
						</p> */}
				{/* <div
									className="
									text-gray-600
								"
								>
									Nro de lote: {libro.lote}
								</div> */}
			</div>
			<div className="flex items-end">
				<Button
					className='w-full'
					label="Obtener"
					icon="pi pi-money-bill"
					size="small"
				/>
			</div>
		</div>
	);
};

export default LibroListItem;
