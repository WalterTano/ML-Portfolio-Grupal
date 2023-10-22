import * as React from "react"
import Layout from "../components/layout"
import { Container, Box, Heading, Text, Link, Flex } from "../components/ui"
import ChevronRight from "../components/chevron-right"
import * as styles from "../components/404.css"
import SEOHead from "../components/head"

export default function NotFound() {
  return (
    <Layout>
      <Box paddingY={4}>
        <Container>
          <Flex variant="column">
            <Heading color="primary" variant="mega" className={styles.heading}>
              404
            </Heading>
            <Heading as="h1">Página no encontrada</Heading>
            <Flex variant="column" gap={0}>
              <Text variant="lead" className={styles.text}>
                Lo siento! Parece que la página que estabas buscando no existe.
              </Text>
              <Link to="/" className={styles.link}>
                <span>Volver al inicio</span>
                <ChevronRight className={styles.linkChevron} />
              </Link>
            </Flex>
          </Flex>
        </Container>
      </Box>
    </Layout>
  )
}
export const Head = () => {
  return <SEOHead title="404: Page not found" />
}
