import { useState } from 'react'
import './hero.scss'
import { FaCopy, FaCheck } from 'react-icons/fa'
import { SiTypescript } from 'react-icons/si'
import { APP_DATA } from '@/helpers/data'
import { useTranslation } from 'react-i18next'

const HeroRight = () => {
  const [copied, setCopied] = useState(false)
  const { t } = useTranslation()

  const codeString = `const developer = {
  name: '${APP_DATA.NAME}',
  role: 'Fullstack Engineer',
  skills: [
    'React', 'TypeScript', 'Next.js', 
    'NestJS', 'Node.js', 'MySQL', 
    'MongoDB', 'Docker', 'TailwindCSS'
  ],
  passion: 'Building high-impact web apps',
  hardWorker: true,
  quickLearner: true,
  problemSolver: true,
  hireable: function() {
    return (
      this.hardWorker &&
      this.problemSolver &&
      this.skills.length >= 8
    );
  }
};`

  const handleCopyCode = () => {
    navigator.clipboard.writeText(codeString)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  return (
    <div className='hero-code-editor-card'>
      {/* Editor Window Header */}
      <div className='editor-header'>
        <div className='window-controls'>
          <span className='control-dot close'></span>
          <span className='control-dot minimize'></span>
          <span className='control-dot expand'></span>
        </div>

        <div className='active-tab'>
          <SiTypescript className='text-primary' size={14} />
          <span>developer.ts</span>
        </div>

        <button onClick={handleCopyCode} className='copy-code-btn' title='Copy code snippet'>
          {copied ? (
            <>
              <FaCheck className='text-success' size={12} />
              <span className='copied-text'>{t('heroSection.copied')}</span>
            </>
          ) : (
            <>
              <FaCopy size={12} />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code Lines with Syntax Highlighting */}
      <div className='editor-body'>
        <pre className='code-block'>
          <code>
            <div className='code-line'>
              <span className='line-num'>01</span>
              <span className='syn-keyword'>const</span> <span className='syn-var'>developer</span> = {'{'}
            </div>
            <div className='code-line'>
              <span className='line-num'>02</span>
              &nbsp;&nbsp;<span className='syn-prop'>name</span>: <span className='syn-string'>'{APP_DATA.NAME}'</span>,
            </div>
            <div className='code-line'>
              <span className='line-num'>03</span>
              &nbsp;&nbsp;<span className='syn-prop'>role</span>: <span className='syn-string'>'{APP_DATA.ROLE}'</span>,
            </div>
            <div className='code-line'>
              <span className='line-num'>04</span>
              &nbsp;&nbsp;<span className='syn-prop'>skills</span>: [
            </div>
            <div className='code-line'>
              <span className='line-num'>05</span>
              &nbsp;&nbsp;&nbsp;&nbsp;<span className='syn-string'>'React'</span>,{' '}
              <span className='syn-string'>'Next.js'</span>, <span className='syn-string'>'TypeScript'</span>,
            </div>
            <div className='code-line'>
              <span className='line-num'>06</span>
              &nbsp;&nbsp;&nbsp;&nbsp;<span className='syn-string'>'NestJS'</span>,{' '}
              <span className='syn-string'>'Node.js'</span>, <span className='syn-string'>'Docker'</span>,
            </div>
            <div className='code-line'>
              <span className='line-num'>07</span>
              &nbsp;&nbsp;&nbsp;&nbsp;<span className='syn-string'>'MongoDB'</span>,{' '}
              <span className='syn-string'>'MySQL'</span>, <span className='syn-string'>'TailwindCSS'</span>
            </div>
            <div className='code-line'>
              <span className='line-num'>08</span>
              &nbsp;&nbsp;],
            </div>
            <div className='code-line'>
              <span className='line-num'>09</span>
              &nbsp;&nbsp;<span className='syn-prop'>hardWorker</span>: <span className='syn-bool'>true</span>,
            </div>
            <div className='code-line'>
              <span className='line-num'>10</span>
              &nbsp;&nbsp;<span className='syn-prop'>quickLearner</span>: <span className='syn-bool'>true</span>,
            </div>
            <div className='code-line'>
              <span className='line-num'>11</span>
              &nbsp;&nbsp;<span className='syn-prop'>problemSolver</span>: <span className='syn-bool'>true</span>,
            </div>
            <div className='code-line'>
              <span className='line-num'>12</span>
              &nbsp;&nbsp;<span className='syn-func'>hireable</span>: <span className='syn-keyword'>function</span>(){' '}
              {'{'}
            </div>
            <div className='code-line'>
              <span className='line-num'>13</span>
              &nbsp;&nbsp;&nbsp;&nbsp;<span className='syn-keyword'>return</span> (
            </div>
            <div className='code-line'>
              <span className='line-num'>14</span>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className='syn-this'>this</span>.
              <span className='syn-prop'>hardWorker</span> &amp;&amp;
            </div>
            <div className='code-line'>
              <span className='line-num'>15</span>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className='syn-this'>this</span>.
              <span className='syn-prop'>problemSolver</span> &amp;&amp;
            </div>
            <div className='code-line'>
              <span className='line-num'>16</span>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className='syn-this'>this</span>.
              <span className='syn-prop'>skills</span>.length &gt;= <span className='syn-num'>8</span>
            </div>
            <div className='code-line'>
              <span className='line-num'>17</span>
              &nbsp;&nbsp;&nbsp;&nbsp;);
            </div>
            <div className='code-line'>
              <span className='line-num'>18</span>
              &nbsp;&nbsp;{'}'}
            </div>
            <div className='code-line'>
              <span className='line-num'>19</span>
              {'}'};
            </div>
          </code>
        </pre>
      </div>
    </div>
  )
}

export default HeroRight
