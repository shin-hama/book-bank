import { useState, useEffect } from 'react'

const SUPPORTED_URL = 'https://booklog.jp/users/'

export const useUserName = () => {
  const [userName, setUserName] = useState<string | null>(null)

  useEffect(() => {
    chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
      const url = tabs[0]?.url
      console.log(url)
      if (url?.startsWith(SUPPORTED_URL)) {
        setUserName(url.replace(SUPPORTED_URL, '').split('/')[0] || null)
      }
    })
  }, [])

  return userName
}
