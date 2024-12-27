import {Typography, Box} from '@mui/material';
import Balancer from "react-wrap-balancer";
import { TopStyledBlock } from "./StyledBlock";
import React from "react";
import { Frontmatter } from "@/app/page";

export const ArticleCard: React.FC<{ frontmatter: Frontmatter; content: string }> = ({frontmatter, content}) => {

    const style = {
        transition: "box-shadow .2s",
        boxShadow: "grey 1px 1px 3px",
        "&:hover": {boxShadow: "grey 1px 1px 5px"},
    }

    return (
        <>
            <Box borderRadius={2} overflow={"hidden"} sx={style}>
                    <Box>
                        <img style={{objectFit: "cover", width: "100%", aspectRatio: 2}} src={frontmatter.banner_src} alt={frontmatter.banner_alt} />
                    </Box>
                    <Box>
                        <Box pl={2} p={2}>
                            <Box py={1} pt={1}>
                                <TopStyledBlock height={".25rem"} width={"5rem"} offset={"-.75rem"}>
                                    <Typography variant={"h6"} sx={{fontWeight: "bold"}}><Balancer>{frontmatter.title}</Balancer></Typography>
                                </TopStyledBlock>
                            </Box>
                            <Typography variant={"body1"}>{frontmatter.excerpt}</Typography>
                        </Box>
                    </Box>
            </Box>
        </>
    )
}

