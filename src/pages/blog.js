import * as React from "react"
import { graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import Layout from "../components/layout"
import {
  Container,
  FlexList,
  Box,
  Space,
  BlockLink,
  Heading,
  Subhead,
  Kicker,
  Text,
} from "../components/ui"
import SEOHead from "../components/head"

function PostCard({ slug, image, title, excerpt, author, category, ...props }) {
  return (
    <BlockLink {...props} to={`/blog/${slug}`}>
      {image && (
        <>
          <GatsbyImage alt={image.alt} image={image.gatsbyImageData} />
          <Space size={3} />
        </>
      )}
      <Subhead>
        <Kicker>{category}</Kicker>
        {title}
      </Subhead>
      <Text as="p">{excerpt}</Text>
      {author?.name && (
        <Text variant="bold">
          <div>By {author.name}</div>
        </Text>
      )}
    </BlockLink>
  )
}

function PostCardSmall({ slug, image, title, category, ...props }) {
  return (
    <BlockLink {...props} to={`/blog/${slug}`}>
      {image && (
        <>
          <GatsbyImage alt={image.alt} image={image.gatsbyImageData} />
          <Space size={3} />
        </>
      )}
      <Subhead>
        <Kicker>{category}</Kicker>
        {title}
      </Subhead>
    </BlockLink>
  )
}

export default function BlogIndex(props) {
  const queryParams = new URLSearchParams(props.location.search);
  const category = queryParams.get('category');

  let posts = props?.data?.allDatoCmsBlogpost?.nodes || [];
  if (category) {
    posts = posts.filter((p) => {
      const categoryList = p.category?.toLowerCase().split(',') || [];

      return categoryList.some(c => c.trim() === category?.toLowerCase());
    }) || [];
  }
  const hasPosts = posts && posts.length > 0;

  return (
    <Layout>
      <Container>
        {
          hasPosts && 
          <Box paddingY={4}>
            <Heading as="h1">{ category ? category : 'Blog'}</Heading>
            <FlexList variant="start" gap={0} gutter={3} responsive wrap>
              {posts.map((post) => (
                <Box as="li" key={post.id} padding={3} width="half">
                  <PostCard {...post} category={category ? '' : post.category} />
                </Box>
              ))}
            </FlexList>
          </Box>
        }
        {
          !hasPosts && 
          <Box padding={5} center>
            <Text variant="subheadSmall">
              Lo siento, actualmente no hay ningún artículo de blog disponible para la categoría "{category}".
            </Text>
            <Box paddingY={5}>
              <Heading color="primary">
                : (
              </Heading>
            </Box>
          </Box>
        }
      </Container>
    </Layout>
  )
}
export const Head = () => {
  return <SEOHead title="Blog" />
}

export const query = graphql`
  query {
    allDatoCmsBlogpost {
      nodes {
        id
        slug
        title
        excerpt
        category
        image {
          alt
          gatsbyImageData
        }
      }
    }
  }
`