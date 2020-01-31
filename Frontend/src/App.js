import React, {
  useState,
  useEffect,
  useCallback,
  useReducer,
  createContext
} from 'react'

import './App.css'
// import { initialItems } from './testData/initialItems'
import api from './api/items'
import ListItems from './components/ListItems'
import AddItemForm from './components/AddItemForm'
import itemReducer from './reducers/itemReducer'
import filterReducer from './reducers/filterReducer'
import FilterMenu from './components/FilterMenu'
import SearchForm from './components/SearchForm'
import SortMenu from './components/SortMenu'
import OrderMenu from './components/OrderMenu'
import NavBar from './components/NavBar/NavBar'
import Login from './components/User/Login'
import Register from './components/User/Register'

import Button from '@material-ui/core/Button'

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import userReducer from './reducers/userReducer'

const company = 'testCompany'
export const UserContext = createContext()

const App = () => {
  const [user, dispatchUser] = useReducer(userReducer, {
    isAuthenticated: false,
    id: null,
    name: null,
    token: null
  })
  useEffect(() => {
    if (localStorage.token) {
      dispatchUser({ type: 'RESUME', payload: localStorage.token })
    }
  }, [])

  const GET_NEWEST_ORDER_DATE =
  const GET_ITEMS_BY_DATE=

  const [currentDate, setCurrentDate] = useState('')
  /* useEffect(() => {
    async function getInitialItems () {
      setIsLoading(true)
      await api.getNewestOrderDate().then(date => {
        setCurrentDate(date.data)
        api.getItemsByDate(date.data).then(items => {
          dispatchItems({ type: 'LOAD_ITEMS', items: items.data.data })
          setIsLoading(false)
        })
      })
    }
    getInitialItems()
  }, [currentDate]) */
  const [isLoading, setIsLoading] = useState(false)
  const [itemsCurrentlyFiltered, setItemsCurrentlyFiltered] = useState(false)
  const [items, dispatchItems] = useReducer(itemReducer, [])
  const [searchTerm, setSearchTerm] = useState('')
  const getCurrentSuppliers = useCallback(() => {
    const currentSuppliers = []
    items.forEach(item => {
      if (currentSuppliers.includes(item.supplier)) {
      } else {
        currentSuppliers.push(item.supplier)
      }
    })
    return currentSuppliers.sort()
  }, [items])

  const [suppliers, setSuppliers] = useState(getCurrentSuppliers)

  useEffect(() => {
    setSuppliers(getCurrentSuppliers())
  }, [getCurrentSuppliers])

  const getCurrentLocations = useCallback(() => {
    const currentLocations = []
    items.forEach(item => {
      if (currentLocations.includes(item.location)) {
      } else {
        currentLocations.push(item.location)
      }
    })
    return currentLocations.sort()
  }, [items])

  const [locations, setLocations] = useState(getCurrentLocations)

  useEffect(() => {
    setLocations(getCurrentLocations())
  }, [getCurrentLocations])

  const handleDelete = editItemForm => {
    api.deleteItemById(editItemForm.id).then(res => {
      dispatchItems({ type: 'DELETE_ITEM', id: editItemForm.id })
    })
  }
  const [newItemToggle, setNewItemToggle] = useState(false)
  const toggleNewItem = () => {
    setNewItemToggle(!newItemToggle)
  }
  const [filter, dispatchFilter] = useReducer(filterReducer, 'ALL')

  return (
    <UserContext.Provider value={{ user, dispatchUser }}>
      <Router>
        <NavBar />
        <Switch>
          <Route path='/login'>
            <Login />
          </Route>
          <Route path='/register'>
            <Register />
          </Route>
          <Route exact path='/'>
            <div>
              <OrderMenu
                setCurrentDate={setCurrentDate}
                currentDate={currentDate}
              />
              <SearchForm
                items={items}
                dispatchFilter={dispatchFilter}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                itemsCurrentlyFiltered={itemsCurrentlyFiltered}
                setItemsCurrentlyFiltered={setItemsCurrentlyFiltered}
              />
              <SortMenu dispatchItems={dispatchItems} items={items} />
              <Button onClick={() => toggleNewItem()}>New Item</Button>
              <br />
              <FilterMenu
                filter={filter}
                dispatchFilter={dispatchFilter}
                suppliers={suppliers}
                locations={locations}
                itemsCurrentlyFiltered={itemsCurrentlyFiltered}
                setItemsCurrentlyFiltered={setItemsCurrentlyFiltered}
              />
              {newItemToggle && (
                <AddItemForm
                  items={items}
                  dispatchItems={dispatchItems}
                  suppliers={suppliers}
                  locations={locations}
                  user={user}
                  company={company}
                  currentDate={currentDate}
                />
              )}
              {isLoading ? (
                <h1>Loading...</h1>
              ) : (
                <ListItems
                  filter={filter}
                  searchTerm={searchTerm}
                  items={items}
                  dispatchItems={dispatchItems}
                  suppliers={suppliers}
                  locations={locations}
                  handleDelete={handleDelete}
                />
              )}
            </div>
          </Route>
        </Switch>
      </Router>
    </UserContext.Provider>
  )
}
export default App
