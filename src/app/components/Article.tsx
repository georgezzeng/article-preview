import React from "react";
import Markdown from "react-markdown";
import {Box, Container, Typography} from "@mui/material";
import rehypeRaw from "rehype-raw";
import Balancer from "react-wrap-balancer";
import {Frontmatter} from "@/app/page";

export const Article: React.FC<{ frontmatter: Frontmatter; content: string }> = ({frontmatter, content}) => {
    return (
        <Container maxWidth={"md"}>
            <Box>
                <Box textAlign={"center"} pb={2}>
                    <Box pb={6}>
                        <Typography variant={"h3"} ><Balancer>{frontmatter.title}</Balancer></Typography>
                    </Box>
                    <Box height={"1rem"} borderRadius={"10px"} bgcolor={"primary.main"}></Box>
                    <Box pt={1} display={"flex"} justifyContent={"space-between"}>
                        <Typography variant={"h5"}>{frontmatter.author}</Typography>
                        {/*<Typography variant={"h5"}>{frontmatter.date ? frontmatter.date.toLocaleDateString() : "Unknown Date"}</Typography>*/}
                    </Box>
                </Box>
                <Markdown
                    rehypePlugins={[rehypeRaw]}
                    components={{
                        h1: ({node, children}) => <Typography variant={"h1"}>{children}</Typography>,
                        h2: ({node, children}) => <Typography variant={"h1"}>{children}</Typography>,
                        h3: ({node, children}) => <Typography variant={"h1"}>{children}</Typography>,
                        h4: ({node, children}) => <Typography variant={"h1"}>{children}</Typography>,
                        h5: ({node, children}) => <Typography variant={"h1"}>{children}</Typography>,
                        h6: ({node, children}) => <Typography variant={"h1"}>{children}</Typography>,
                        p: ({node, children}) => <Typography variant={"body1"}>{children}</Typography>,
                        a: ({children, href}) => <a style={{color: "#0885ff"}} href={href}>{children}</a>,
                        img: ({node, src, alt}) => <img style={{maxWidth: "100%", height: "auto"}} src={src} alt={alt} />,
                    }}
                >
                    {content}
                </Markdown>
            </Box>
        </Container>
    )
}
