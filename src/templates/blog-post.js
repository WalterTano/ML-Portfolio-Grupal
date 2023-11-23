import * as React from "react"
import { graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import Layout from "../components/layout"
import {
  Container,
  Flex,
  Box,
  Space,
  Heading,
  Text,
  Avatar,
} from "../components/ui"
import { avatar as avatarStyle } from "../components/ui.css"
import * as styles from "./blog-post.css"
import SEOHead from "../components/head"
import Markdown from 'markdown-to-jsx'

export default function BlogPost(props) {
  const post = props.data.datoCmsBlogpost;

  return (
    <Layout>
      <Container>
        <Box paddingY={5}>
          <Heading as="h1" center>
            {post.title}
          </Heading>
          <Space size={4} />
          {post.author && (
            <Box center>
              <Flex>
                {post.author.avatar &&
                  (!!post.author.avatar.gatsbyImageData ? (
                    <Avatar
                      {...post.author.avatar}
                      image={post.author.avatar.gatsbyImageData}
                    />
                  ) : (
                    <img
                      src={post.author.avatar.url}
                      alt={post.author.name}
                      className={avatarStyle}
                    />
                  ))}
                <Text variant="bold">{post.author.name}</Text>
              </Flex>
            </Box>
          )}
          <Space size={4} />
          <Text center>{post.date}</Text>
          <Space size={4} />
          {post.image && (
            <Box center>
              <GatsbyImage
                alt={post.image.alt}
                image={post.image.gatsbyImageData}
              />
            </Box>
          )}
          <Space size={5} />
          {
            post.isMarkdown 
            ? <Markdown
              className={styles.markdownBlogPost}
              >
              {post.html}
              </Markdown>
            : <div
              className={styles.blogPost}
              dangerouslySetInnerHTML={{
                __html: post.html,
              }}
            />
          }
        </Box>
      </Container>
    </Layout>
  )
}
export const Head = (props) => {
  return <SEOHead {...props} description={props.data.datoCmsBlogpost.excerpt} />
}
export const query = graphql`
  query PageContent($id: String!) {
    datoCmsBlogpost(id: { eq: $id }) {
      id
      slug
      title
      excerpt
      date
      html
      isMarkdown
      image {
        url
        gatsbyImageData
        alt
      }
    }
  }
`