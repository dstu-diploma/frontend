import styles from './HackathonPageMyScores.module.scss'
import {
  Criterion,
  TeamJudgeScoreObject,
} from '@/features/hackathons/model/types'
import Toolbar from '@/shared/ui/custom/misc/Toolbar/Toolbar'
import { useQueryClient } from '@tanstack/react-query'
import clsx from 'clsx'
import HackathonPageScoreCard from '../../../cards/HackathonPageScoreCard'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/shared/ui/shadcn/accordion'
import ScoreCardContent from './ScoreCardContent'

interface HackathonPageMyScoresProps {
  hackathonId: number | undefined
  scores: Record<string, TeamJudgeScoreObject[]>
}

const HackathonPageMyScores = ({
  scores,
  hackathonId,
}: HackathonPageMyScoresProps) => {
  const queryClient = useQueryClient()
  const criteria = queryClient.getQueryData([
    'hackathonCriteria',
    hackathonId,
  ]) as Criterion[]

  return (
    <Toolbar className={styles.scores}>
      <div
        className={clsx(styles.scoresSectionContainer, styles.scoresContainer)}
      >
        <h4>Мои оценки</h4>
        <Accordion type='single' collapsible className={styles.scoresList}>
          {Object.entries(scores).length === 0 ? (
            <div>У Вас нет ранее установленных оценок</div>
          ) : (
            Object.entries(scores)
              .filter(([, teamScores]) => teamScores.length > 0)
              .map(([teamId, teamScores]) => (
                <AccordionItem key={teamId} value={`team-${teamId}`}>
                  <AccordionTrigger className={styles.teamScores}>
                    <h5>{teamScores[0].team_name}</h5>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className={styles.criteriaScores}>
                      <ScoreCardContent
                        hackathonId={hackathonId}
                        criteria={criteria}
                        teamScores={teamScores}
                      />
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))
          )}
        </Accordion>
      </div>
    </Toolbar>
  )
}

export default HackathonPageMyScores
