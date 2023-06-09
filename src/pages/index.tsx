import {Inter} from 'next/font/google'
import Header from '../components/common/header/Header'
import styles from '../styles/pages/TestList.module.css'
import QuizList from '../components/list/QuizList'
import {getTestList} from "../service/getQuestions";

const inter = Inter({subsets: ['latin']})

export default function TestListPage({testList}) {
  return (
    <div className={'flex flex-col flex-1'}>
      <Header title={'테스트목록'} />
      <div className={styles.topSection}>
        <div>
          <p className={styles.miniTitle}>SPEAKING | Basic High</p>
          <span className={styles.level}>LV4.</span>
          <span className={'h3'}>일상 영어 스킬업</span>
          <p>화,목 I PM 8:30 ~ 9:30</p>
        </div>

        <div className={styles.description}>
          <p>6단계 스피킹 단계 중 네 번째 레벨이에요.</p>
          <p>다양한 일상 상황에서 긴장 하지 않고 자연스럽게</p>
          <p>소통하도록 연습해요.</p>
        </div>
      </div>
      <QuizList testList={testList} />
    </div>
  )
}

export type TestList = testItem[]
type testItem = {
  id: number
  subtitle: string
  startDatetime: string
}

export const getServerSideProps = async () => {
  const testList = await getTestList()

  return {
    props: {
      testList,
    },
  }
}
