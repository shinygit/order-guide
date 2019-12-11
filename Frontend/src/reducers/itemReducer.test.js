import React from 'react'
import itemReducer from './itemReducer.js'

const testItems = [
  {
    id: 1,
    order: 0
  },
  {
    id: 2,
    order: 2
  }
]
describe('itemReducer', () => {
  it('should add 1 on order increment', () => {
    const state = testItems
    const newState = itemReducer(state, {
      type: 'INCREASE_ORDER_AMOUNT',
      id: 1
    })
    expect(newState).toEqual([
      {
        id: 1,
        order: 1
      },
      {
        id: 2,
        order: 2
      }
    ])
  })
  it('should subtract 1 on order decrement', () => {
    const state = testItems
    const newState = itemReducer(state, {
      type: 'DECREASE_ORDER_AMOUNT',
      id: 2
    })
    expect(newState).toEqual([
      {
        id: 1,
        order: 0
      },
      {
        id: 2,
        order: 1
      }
    ])
  })
})
