export interface Question {
  tags: string[]
  owner: {
    display_name: string
  }
  answer_count: number
  question_id: number
  title: string
  body: string
}
