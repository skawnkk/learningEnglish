import React, {useState} from 'react'

const ModalContext = React.createContext<any>(null)

const ModalProvider = ({children}) => {
  const [modal, setModal] = useState<any>(null)
  const openModal = (modal: React.ReactNode) => {
    setModal(modal)
  }

  const closeModal = () => {
    setModal(null)
  }

  return (
    <ModalContext.Provider
      value={{
        modal,
        openModal,
        closeModal,
      }}
    >
      {children}
      {modal}
    </ModalContext.Provider>
  )
}

const useModal = () => {
  const context = React.useContext(ModalContext)
  if (context === undefined) {
    throw new Error('useModal must be used within a ModalProvider')
  }
  return context
}

export {useModal, ModalProvider}
