'use client'

import {Box, Container, Typography} from "@mui/material";
import grayMatter from "gray-matter";
import {useEffect, useState} from "react";
import {useSearchParams} from "next/navigation";
import Article from "@/app/components/Article";
import { motion } from "motion/react"
import articleTemplate from "../template/articleTemplate"
import Divider from '@mui/material/Divider';



export default function MarkdownPage() {
    const searchParams = useSearchParams();
    const [frontmatter, setFrontmatter] = useState<any | null>({title: "", author: "", banner_src: "", banner_alt: ""});
    const [content, setContent] = useState<string>("");
    const [rawMarkdown, setRawMarkdown] = useState<string | null>(articleTemplate);
    
    useEffect(()=>{
        const fetchMarkdown = async () => {
            const markdownUrl = searchParams.get("url");

            if(!markdownUrl) {
                return (
                    <Container>
                        <h1 style={{position:"absolute", top: '50%', left: '50%' }}>No Url Provided</h1>
                    </Container>
                )
            }

            const response = await fetch(markdownUrl);
            console.log(response);
            if(!response.ok) {
                throw Error ("Failed to fetch markdown");
            }
            const markdown = await response.text()
            setRawMarkdown(markdown);
            console.log(markdown);

            const {data: frontmatter, content} = grayMatter(markdown);
            setFrontmatter(frontmatter);
            setContent(content);
            console.log(frontmatter);
            console.log(content);
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
                if (typeof value === "object") {
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
                    <Typography variant='h3'>
                        Parsed Frontmatter
                    </Typography>
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
                </Box>
                <Divider sx={{my: '20px'}}/>
                <Box>
                    <Typography variant='h3'> {frontmatter.title}</Typography>
                    <Typography variant='h4'> {frontmatter.author}</Typography>
                </Box>

                {frontmatter.banner_src && (
                    <Box>
                        <motion.img
                            src={frontmatter.banner_src}
                            alt={frontmatter.banner_alt || "Banner"}
                            style={{width: "100%", aspectRatio: "2/1"}}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        />
                    </Box>
                )}

                <Box>
                    <Article content={content}/>
                </Box>

        </Container>
    )
}