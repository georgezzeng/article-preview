'use client'

import {Box, Chip, Container, Typography} from "@mui/material";
import grayMatter from "gray-matter";
import React, {useEffect, useState} from "react";
import {useSearchParams} from "next/navigation";
import {Article} from "@/app/components/Article";
import {motion} from "motion/react"
import Divider from '@mui/material/Divider';
import {ArticleCard} from "@/app/components/ArticleCard";

export interface Frontmatter {
    title: string;
    author: string;
    publish_on: string[];
    type: string;
    canonical_url: string;
    image: string | null;
    path: string;
    alt: string;
    description: string;
    excerpt: string;
    card_src: string;
    card_alt: string;
    banner_src: string;
    banner_alt: string;
}


export default function MarkdownPage() {
    const searchParams = useSearchParams();
    const [frontmatter, setFrontmatter] = useState<Frontmatter>({
        title: "", author: "", publish_on: [], type: "", canonical_url: "", image: null, path: "", alt: "", description: "", excerpt: "", card_src: "", card_alt: "", banner_src: "", banner_alt: ""});
    const [content, setContent] = useState<string>("");

    useEffect(() => {
        const fetchMarkdown = async () => {
            const markdownUrl = searchParams.get("url");

            if (!markdownUrl) {
                return (
                    <Container>
                        <h1 style={{position: "absolute", top: '50%', left: '50%'}}>No Url Provided</h1>
                    </Container>
                )
            }

            const response = await fetch(markdownUrl);
            // console.log(response);
            if (!response.ok) {
                throw Error("Failed to fetch markdown");
            }
            const markdown = await response.text()
            // console.log(markdown);

            const { data, content } = grayMatter(markdown);
            setFrontmatter(data as Frontmatter);
            setContent(content);
            // console.log(frontmatter);
            // console.log(content);
        }
        fetchMarkdown();
    }, [searchParams]);

    const formatFrontmatter = (data: any) => {
        if (!data) return "";
        return Object.entries(data)
            .map(([key, value]) => {
                if (Array.isArray(value)) {
                    return `${key}:\n  - ${value.join("\n  - ")}`;
                }
                if (typeof value === "object" && value !== null) {
                    return `${key}:\n${Object.entries(value)
                        .map(([subKey, subValue]) => `  ${subKey}: ${subValue}`)
                        .join("\n")}`;
                }
                return `${key}: ${value}`;
            })
            .join("\n");
    }


    return (
        <Container>

            <Box>
                <Divider variant="middle"
                         sx={{backgroundColor: "black", width: "100%", height: "3px", my: '70px',marginLeft: "0",
                             marginRight: "0"}}>
                    <Chip label="Frontmatter Preview" size="medium" sx={{ fontSize: "1.2rem", padding: "8px 16px" }}/>
                </Divider>
                <Box
                    sx={{
                        backgroundColor: "white",
                        border: "1px solid #ddd",
                        borderRadius: "4px",
                        padding: "16px",
                        whiteSpace: "pre-wrap",
                        fontFamily: "monospace",
                        fontSize: "14px",
                    }}>
                    {formatFrontmatter(frontmatter)}
                </Box>


            <Divider variant="middle"
                     sx={{backgroundColor: "black", width: "100%", height: "3px", my: '70px',marginLeft: "0",
                         marginRight: "0"}}>
                <Chip label="Article Preview" size="medium" sx={{ fontSize: "1.2rem", padding: "8px 16px" }}/>
            </Divider>
            <Box>
                <Article frontmatter={frontmatter} content={content}/>
            </Box>

            <Divider variant="middle"
                     sx={{backgroundColor: "black", width: "100%", height: "3px", my: '70px',marginLeft: "0",
                         marginRight: "0"}}>
                <Chip label="Card Preview" size="medium" sx={{ fontSize: "1.2rem", padding: "8px 16px" }}/>
            </Divider>
            <Box>
                <ArticleCard frontmatter={frontmatter} content={content}/>
            </Box>

            <Divider variant="middle"
                     sx={{backgroundColor: "black", width: "100%", height: "3px", my: '70px',marginLeft: "0",
                         marginRight: "0"}}>
                <Chip label="Banner Preview" size="medium" sx={{ fontSize: "1.2rem", padding: "8px 16px" }}/>
            </Divider>
            {frontmatter.banner_src ? (
                <Box>
                    <motion.img
                        src={frontmatter.banner_src}
                        alt={frontmatter.banner_alt || "Banner"}
                        style={{width: "100%", aspectRatio: "2/1"}}
                        whileHover={{scale: 1.02}}
                        whileTap={{scale: 0.95}}
                    />
                </Box>
            ) : null}
        </Box>

        </Container>
    )
}