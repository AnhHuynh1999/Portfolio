import bootstrapImg from 'assets/skill/bootstrap.logo.svg'
import htmlImg from 'assets/skill/html.logo.svg'
import cssImg from 'assets/skill/css.logo.svg'
import javaScriptImg from 'assets/skill/js.logo.svg'
import reactImg from 'assets/skill/react.logo.svg'
import gitImg from 'assets/skill/git.logo.svg'
import materialUiImg from 'assets/skill/materialui.logo.svg'
import mongodbImg from 'assets/skill/mongodb.logo.svg'
import mysqlImg from 'assets/skill/mysql.logo.svg'
import typeScriptImg from 'assets/skill/typescript.logo.svg'
import nextImage from 'assets/skill/next.logo.svg'
import tailwindImg from 'assets/skill/tailwind.logo.svg'
import sqlImg from 'assets/skill/sql.logo.svg'
import nestJSImg from 'assets/skill/nestjs.logo.svg'
const SkillImage = (skill: string) => {
  const Image_Skill = [
    { key: 'HTML', value: htmlImg },
    { key: 'CSS', value: cssImg },
    { key: 'JavaScript', value: javaScriptImg },
    { key: 'React', value: reactImg },
    { key: 'Git', value: gitImg },
    { key: 'MaterialUI', value: materialUiImg },
    { key: 'TypeScript', value: typeScriptImg },
    { key: 'MongoDB', value: mongodbImg },
    { key: 'Next', value: nextImage },
    { key: 'Tailwind', value: tailwindImg },
    { key: 'MySQL', value: mysqlImg },
    { key: 'Bootstrap', value: bootstrapImg },
    { key: 'NestJS', value: nestJSImg },
    { key: 'SQL', value: sqlImg }
  ]
  return Image_Skill.find((item) => item.key === skill)?.value
}

export default SkillImage
