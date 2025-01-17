/** @jsx jsx */
import { jsx, Container, Styled } from "theme-ui"
import { useTrail } from "react-spring"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import { ChildImageSharp } from "../types"
import ProjectItem from "../components/project-item"

type Props = {
  data: {
    allProject: {
      nodes: {
        color: string
        slug: string
        title: string
        service: string
        client: string
        cover: ChildImageSharp
      }[]
    }
  }
}

const Projects = ({
  data: {
    allProject: { nodes },
  },
}: Props) => {
  const trail = useTrail(nodes.length, {
    from: { height: `0%` },
    to: { height: `100%` },
  })

  if (nodes.length === 0) {
    return (
      <Layout>
        <Container>
          <Styled.p>
            Hi!{` `}
            <span role="img" aria-label="Wave emoji">
              👋
            </span>
            {` `}
            <br />
            Thanks for using <b>@lekoarts/gatsby-theme-emma</b>. You currently don't have any content in your{` `}
            <i>projects</i> folder - that's why this page displays a placeholder text. Head over to the{` `}
            <Styled.a href="https://github.com/LekoArts/gatsby-themes/tree/master/themes/gatsby-theme-emma">
              README
            </Styled.a>
            {` `}
            to learn how to setup them.
          </Styled.p>
          <Styled.p>
            <b>TL;DR:</b> <br />
            The starter automatically created the folder <code>content/projects</code>. Go into this folder, create a
            new folder called <code>example</code> and create an <code>index.mdx</code> file there and place an image.
            Edit the frontmatter like described in the{` `}
            <Styled.a href="https://github.com/LekoArts/gatsby-themes/tree/master/themes/gatsby-theme-emma">
              README
            </Styled.a>
            .
          </Styled.p>
        </Container>
      </Layout>
    )
  }

  return (
    <Layout
      sx={{
        display: `grid`,
        gridTemplateColumns: `repeat(auto-fit, minmax(280px, 1fr))`,
        width: `100%`,
      }}
    >
      {trail.map((style, index) => (
        <ProjectItem style={style} node={nodes[index]} key={nodes[index].slug} />
      ))}
    </Layout>
  )
}

export default Projects

export const pageQuery = graphql`
  query {
    allProject(sort: { fields: date, order: DESC }) {
      nodes {
        color
        slug
        service
        client
        title
        cover {
          childImageSharp {
            fluid(maxWidth: 850, quality: 90, traceSVG: { color: "#e6e6e6" }) {
              ...GatsbyImageSharpFluid_withWebp_tracedSVG
            }
          }
        }
      }
    }
  }
`
