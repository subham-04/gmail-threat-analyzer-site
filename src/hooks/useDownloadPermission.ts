import { useState, useEffect } from 'react'
import { hasDownloadPermission, getStoredRegistrationInfo } from '../lib/dataCollection'

export interface UserData {
  name: string
  email: string
  occupation: string
  useCase?: string
  submittedAt: string
}

export function useDownloadPermission() {
  const [hasPermission, setHasPermission] = useState(false)
  const [userData, setUserData] = useState<UserData | null>(null)

  // Check if user has already submitted their details
  useEffect(() => {
    const checkPermissions = () => {
      // First check localStorage for direct permission
      const storedUserData = localStorage.getItem('gta-user-data')
      const storedPermission = localStorage.getItem('gta-download-permission')
      
      if (storedUserData && storedPermission === 'true') {
        try {
          const parsedData: UserData = JSON.parse(storedUserData)
          setUserData(parsedData)
          setHasPermission(true)
          return true;
        } catch (error) {
          console.error('Error parsing stored user data:', error)
          // Clear corrupted data
          localStorage.removeItem('gta-user-data')
          localStorage.removeItem('gta-download-permission')
        }
      }
      
      // Also check if user has download permission via the data collection system
      if (hasDownloadPermission()) {
        const regInfo = getStoredRegistrationInfo();
        if (regInfo.email) {
          // Create mock user data from stored email
          const mockUserData: UserData = {
            name: 'Registered User',
            email: regInfo.email,
            occupation: 'Previous Registrant',
            submittedAt: new Date().toISOString()
          };
          setUserData(mockUserData);
          setHasPermission(true);
          return true;
        }
      }
      
      return false;
    }
    
    checkPermissions();
  }, [])

  const grantPermission = (userData: UserData) => {
    localStorage.setItem('gta-user-data', JSON.stringify(userData))
    localStorage.setItem('gta-download-permission', 'true')
    setUserData(userData)
    setHasPermission(true)
  }

  const revokePermission = () => {
    localStorage.removeItem('gta-user-data')
    localStorage.removeItem('gta-download-permission')
    setUserData(null)
    setHasPermission(false)
  }

  const refreshPermissions = () => {
    // Re-check permissions (useful after form submission)
    const storedUserData = localStorage.getItem('gta-user-data')
    const storedPermission = localStorage.getItem('gta-download-permission')
    
    if (storedUserData && storedPermission === 'true') {
      try {
        const parsedData: UserData = JSON.parse(storedUserData)
        setUserData(parsedData)
        setHasPermission(true)
      } catch (error) {
        console.error('Error refreshing permissions:', error)
        setHasPermission(false)
      }
    } else if (hasDownloadPermission()) {
      const regInfo = getStoredRegistrationInfo();
      if (regInfo.email) {
        const mockUserData: UserData = {
          name: 'Registered User',
          email: regInfo.email,
          occupation: 'Previous Registrant',
          submittedAt: new Date().toISOString()
        };
        setUserData(mockUserData);
        setHasPermission(true);
      }
    }
  }

  return {
    hasPermission,
    userData,
    grantPermission,
    revokePermission,
    refreshPermissions
  }
}
