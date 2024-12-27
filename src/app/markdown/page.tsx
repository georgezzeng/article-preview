'use client'

import {Box, Container} from "@mui/material";
import grayMatter from "gray-matter";
import {useEffect, useState} from "react";
import {useSearchParams} from "next/navigation";
import Article from "@/app/components/Article";

export default function MarkdownPage() {
    const searchParams = useSearchParams();
    const [frontmatter, setFrontmatter] = useState<any | null>({title: "", author: "", banner_src: "", banner_alt: ""});
    const [content, setContent] = useState("");
    
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
            console.log(markdown);

            const {data: frontmatter, content} = grayMatter(markdown);
            setFrontmatter(frontmatter);
            setContent(content);
            console.log(frontmatter);
            console.log(content);
        }
        fetchMarkdown();
    }, [searchParams]);

    return (
        <Container>
            <Box>
                <h1>{frontmatter.title}</h1>
                <h2>{frontmatter.author}</h2>
            </Box>

            {frontmatter.banner_src && (
                <Box>
                    <img src={frontmatter.banner_src} alt={frontmatter.banner_alt} style={{width:'100%', aspectRatio:'2/1'}}/>
                </Box>
            )}

            <Box>
                <Article content={content} />
            </Box>

        </Container>
    )
}