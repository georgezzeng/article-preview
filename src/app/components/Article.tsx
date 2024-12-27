import React from "react";
import Markdown from "react-markdown";
import { Box, Typography } from "@mui/material";
import rehypeRaw from "rehype-raw";

interface ArticleProps {
    content: string;
}

export default function Article({ content }: ArticleProps) {
    return (
        <Box>
            <Markdown
                rehypePlugins={[rehypeRaw]}
                components={{
                    h1: ({ children }) => (
                        <Typography variant="h4" gutterBottom>
                            {children}
                        </Typography>
                    ),
                    h2: ({ children }) => (
                        <Typography variant="h5" gutterBottom>
                            {children}
                        </Typography>
                    ),
                    h3: ({ children }) => (
                        <Typography variant="h6" gutterBottom>
                            {children}
                        </Typography>
                    ),
                    p: ({ children }) => (
                        <Typography variant="body1">
                            {children}
                        </Typography>
                    ),
                    blockquote: ({ children }) => (
                        <Box
                            sx={{
                                pl: 2,
                                borderLeft: "4px solid #ddd",
                                fontStyle: "italic",
                                my: 2,
                            }}
                        >
                            <Typography variant="body1">{children}</Typography>
                        </Box>
                    ),
                    img: ({ src, alt }) => (
                        <img
                            src={src || ""}
                            alt={alt || ""}
                            style={{ maxWidth: "100%", height: "auto", margin: "1rem 0" }}
                        />
                    ),
                    a: ({ href, children }) => (
                        <a
                            href={href || ""}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ color: "darkorange", textDecoration: "underline"}}
                        >
                            {children}
                        </a>
                    ),
                    ul: ({ children }) => (
                        <Box component="ul" sx={{ pl: 3 }}>
                            {children}
                        </Box>
                    ),
                    ol: ({ children }) => (
                        <Box component="ol" sx={{ pl: 3 }}>
                            {children}
                        </Box>
                    ),
                    li: ({ children }) => (
                        <li>
                            <Typography variant="body1">{children}</Typography>
                        </li>
                    ),
                }}
            >
                {content}
            </Markdown>
        </Box>
    );
}
