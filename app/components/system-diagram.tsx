import { getDictionary, type Locale } from "@/util/i18n";
export function SystemDiagram({
	locale,
	expanded = true,
	active = 0,
}: { locale: Locale; expanded?: boolean; active?: number }) {
	const { hero } = getDictionary(locale);
	return (
		<svg
			className="system-static"
			viewBox="80 10 500 560"
			role="img"
			aria-label={hero.diagram}
		>
			<title>{hero.diagram}</title>
			<g strokeWidth="1.7" strokeLinejoin="round">
				{[0, 1, 2].map((layer) => {
					const y = expanded ? 440 - layer * 112 : 390 - layer * 28;
					const stroke = active === layer ? "#8bd3df" : "#648398";
					return (
						<g key={layer} stroke={stroke} fill="none">
							<path
								d={`M120 ${y} 360 ${y - 122} 542 ${y - 31} 302 ${y + 94}Z`}
								fill="#14232f"
							/>
							<path
								d={`M120 ${y}v15l182 94 240-125v-15L302 ${y + 94}Z`}
								fill="#0e1922"
							/>
							<path
								d={`M302 ${y + 94}v15M141 ${y} 360 ${y - 111} 520 ${
									y - 30
								} 302 ${y + 81}Z`}
								stroke="#3c5668"
							/>
							{layer === 0 ? (
								<>
									{[0, 1, 2].map((rack) => (
										<g key={rack}>
											<path
												d={`m184 ${y - 15 - rack * 17} 63-32 53 27-63 33Z`}
												fill="#203744"
											/>
											<path
												d={`m184 ${
													y - 15 - rack * 17
												}v12l53 27 63-33v-12m-63 45v-12`}
												fill="#101f2a"
											/>
											<path
												d={`m197 ${y - 5 - rack * 17} 6 3m7 4 6 3`}
												stroke="#e7a77d"
											/>
										</g>
									))}
									<ellipse
										cx="398"
										cy={y - 12}
										rx="32"
										ry="14"
										fill="#1d3b49"
									/>
									<path
										d={`M366 ${
											y - 12
										}v57c0 18 64 18 64 0v-57m-64 19c0 18 64 18 64 0m-64 19c0 18 64 18 64 0`}
										fill="#102632"
									/>
									<ellipse cx="398" cy={y - 12} rx="32" ry="14" />
									<path
										d={`m300 ${y + 26} 30 15 24-12m-118 26 60-30 25 12 31-16`}
										stroke="#e7a77d"
									/>
									<path d={`m455 ${y - 13} 38 19v13l-38-19Z`} fill="#1c3040" />
								</>
							) : layer === 1 ? (
								<>
									<path
										d={`m178 ${y - 18} 147-74 130 64-147 76Z`}
										fill="#1c3443"
									/>
									<path
										d={`m190 ${y - 18} 36-18 113 56-36 18Z`}
										fill="#0e1b27"
									/>
									<path
										d={`m235 ${y - 40} 72-36 18 9-72 36Z`}
										fill="#8bd3df"
										stroke="none"
									/>
									{[0, 1, 2].map((row) => (
										<path
											key={row}
											d={`m${251 + row * 16} ${
												y - 23 + row * 8
											} 72-36m-55 45 54-27`}
											stroke="#6f93a6"
										/>
									))}
								</>
							) : (
								<>
									<path
										d={`m225 ${y - 48} 95-48 80 40-95 49Z`}
										fill="#1c3443"
									/>
									<path d={`m242 ${y - 43} 67-34m-49 44 48-24`} />
									<g transform={`translate(301 ${y - 17})`}>
										<path
											d="M0 0v-145q0-10 10-5l62 31q8 4 8 15V38q0 10-10 5L8 12Q0 8 0 0Z"
											fill="#0b1016"
										/>
										<path d="M9-5v-129l62 31V25Z" fill="#162b39" />
										<path d="m33-118 18 9" stroke="#8bd3df" />
										{[0, 1, 2].map((row) => (
											<path
												key={row}
												d={`m20 ${-84 + row * 28} 40 20v16l-40-20Z`}
												fill="#284455"
												stroke="#52768b"
											/>
										))}
										<path d="m22 0 36 18" stroke="#e7a77d" />
									</g>
								</>
							)}
						</g>
					);
				})}
				{expanded && (
					<g
						stroke="#789baa"
						strokeWidth="1.2"
						strokeDasharray="3 5"
						fill="none"
					>
						<path d="M150 212v214m151-69v163m209-225v112" />
					</g>
				)}
			</g>
		</svg>
	);
}
