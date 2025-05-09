"use client";
import { useEffect, useState } from "react";
import type { Project } from "@/types/types";
import { SiGithub, SiRocket } from "@icons-pack/react-simple-icons";
import { Star } from "lucide-react";

type Props = {
	project: Project;
};

export const Article: React.FC<Props> = ({ project }) => {

	const [stars, setStars] = useState<number>(0);

	const fetchStars = async (): Promise<number> => {
		const response = await fetch(new URL(`https://api.github.com/repos/HERN1k/${project.githubUrl}`));

		const result = await response.json();
		
		var starCount = Number(result.stargazers_count);

		if (isNaN(starCount)) {
			starCount = 0;
		}

		return starCount;
	};

	useEffect(() => {
		if (project.githubUrl) {
			var data = window.sessionStorage.getItem(`stars-${project.githubUrl}`);

			if (data === null) {
				fetchStars()
					.then((data) => {
						window.sessionStorage.setItem(`stars-${project.githubUrl}`, data.toString(10));
						setStars(data);
					}).catch((error) => {
						console.error("Error fetching stars:", error);
					});
			}
			else {
				var number = Number(data);

				if (isNaN(number)) {
					number = 0;
				}

				setStars(number);
			}
		}
	});

	return (
		<article className="p-4 md:p-8">
			<div className="flex justify-between gap-2 items-center">
				<span className="text-xs duration-1000 text-zinc-200 group-hover:text-white group-hover:border-zinc-200 drop-shadow-orange">
					{project.date ? (
						<time dateTime={new Date(project.date).toISOString()}>
							{Intl.DateTimeFormat(new Intl.Locale("en-US"), { dateStyle: "medium" }).format(
								new Date(project.date),
							)}
						</time>
					) : (
						<span>SOON</span>
					)}
				</span>
				<span className="text-zinc-500 text-xs mt-2 flex items-center gap-1">
					<Star className="w-4 h-4" />{" "}
					{Intl.NumberFormat("en-US", { notation: "compact" }).format(stars)}
				</span>
			</div>
			<h2 className="z-20 text-xl font-medium duration-1000 lg:text-3xl text-zinc-200 group-hover:text-white font-display">
				{project.title}
			</h2>
			<p className="z-20 mt-4 text-sm  duration-1000 text-zinc-400 group-hover:text-zinc-200">
				{project.description}
			</p>
			<div className="mt-4 flex justify-center gap-8 items-center flex-row">
				{project.githubUrl
					? (
						<button>
							<a
								href={`https://github.com/HERN1k/${project.githubUrl}`}
								target="_blank"
								rel="noopener noreferrer"
								className="flex items-center rounded-md bg-stone-900 py-2 px-4 border border-transparent text-center 
								text-sm text-stone-200 transition-all shadow-sm hover:shadow-lg focus:bg-stone-800 focus:shadow-none 
								active:bg-stone-800 hover:bg-stone-800 active:shadow-none disabled:pointer-events-none 
								disabled:opacity-50 disabled:shadow-none ease-in-out duration-300 gap-3"
							>
								<SiGithub color="#f5f5f4" size={18} />
								GitHub
							</a>
						</button>
					) 
					: null} 
				{project.productionUrl 
					? (
						<button>
							<a
								href={project.productionUrl}
								target="_blank"
								rel="noopener noreferrer"
								className="flex items-center rounded-md bg-stone-900 py-2 px-4 border border-transparent text-center 
								text-sm text-stone-200 transition-all shadow-sm hover:shadow-lg focus:bg-stone-800 focus:shadow-none 
								active:bg-stone-800 hover:bg-stone-800 active:shadow-none disabled:pointer-events-none 
								disabled:opacity-50 disabled:shadow-none ease-in-out duration-300 gap-3"
							>
								<SiRocket color="#f5f5f4" size={17} />
								Explore
							</a>
						</button>
					) 
					: null} 
			</div>
		</article>
	);
};