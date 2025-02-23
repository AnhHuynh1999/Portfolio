import { Button, Card } from 'react-bootstrap'
import { FaGithub, FaWindows } from 'react-icons/fa'

interface IProjectCard {
  imgPath: string
  title: string
  description: string
  githubLink: string
  demoLink: string
}
const ProjectCard = (props: IProjectCard) => {
  return (
    <div className='project-card col-md-4'>
      <Card className='project-card-view'>
        <Card.Img variant='top' src={props.imgPath} style={{ maxHeight: '215px' }} />
        <Card.Body className='d-flex flex-column'>
          <Card.Title>{props.title}</Card.Title>
          <div className='d-flex flex-column justify-content-between h-100'>
            <Card.Text style={{ textAlign: 'justify' }}>{props.description}</Card.Text>
            <div>
              <Button variant='primary' href={props.githubLink} target='_blank'>
                <FaGithub /> &nbsp; Github
              </Button>
              <Button href={props.demoLink} target='_blank' style={{ marginLeft: '10px' }}>
                <FaWindows /> &nbsp; Demo
              </Button>
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>
  )
}
export default ProjectCard
