import { Axios } from 'axios'

import { Question } from 'entities'
import { questionsStore } from 'store'

export class QuestionRepository implements questionsStore.QuestionRepository {
  constructor(private readonly _axios: Axios) {}

  async search(params: {
    sort: string
    q: string
    order: string
  }): Promise<Question[]> {
    const { data } = await this._axios.get('/search/advanced', {
      params: {
        ...params,
        filter: 'withbody',
        site: 'stackoverflow',
      },
    })

    return data.items
  }

  async get(id: number): Promise<Question> {
    const { data } = await this._axios.get(`/questions/${id}`, {
      params: { site: 'stackoverflow', filter: 'withbody' },
    })

    if (data.items.length === 0) {
      throw new Error('Вопрос не найден')
    }

    return data.items[0]
  }
}
