import { PubSub } from 'apollo-server-express'

import * as ITEM_EVENTS from './item'

export const EVENTS = {
  ITEM: ITEM_EVENTS
}

export default new PubSub()
