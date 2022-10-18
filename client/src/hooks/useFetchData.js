import { useState, useEffect } from 'react'
import axios from 'axios'

export const useFetchData = (url) => {
  const [data, setData] = useState({})

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url)
        if (response.data) {
          setData(response.data)
        }
      } catch (e) {
        console.error(e)
      }
    }
    fetchData()
  }, [])

  return data
}
