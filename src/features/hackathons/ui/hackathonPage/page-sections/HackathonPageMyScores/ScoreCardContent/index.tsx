import {
  Criterion,
  TeamJudgeScoreObject,
} from '@/features/hackathons/model/types'
import React from 'react'
import styles from './ScoreCardContent.module.scss'

interface ScoreCardContentProps {
  teamScores: TeamJudgeScoreObject[]
  criteria: Criterion[]
}

const ScoreCardContent = ({ teamScores, criteria }: ScoreCardContentProps) => {
  return (
    <div className={styles.criteriaScores}>
      {teamScores.map(score => (
        <div key={score.id} className={styles.scoreItem}>
          <span>
            {criteria && criteria.length > 0
              ? (criteria.find(criterion => criterion.id === score.criterion_id)
                  ?.name ?? score.criterion_id)
              : score.criterion_id}
          </span>
          <span>{score.score}</span>
        </div>
      ))}
    </div>
  )
}

export default ScoreCardContent
