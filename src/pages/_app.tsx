import '@/styles/globals.css'
import type {AppProps} from 'next/app'
import {RecoilRoot} from 'recoil'
import {ModalProvider} from "../atomics/modal/useModal";

export default function App({Component, pageProps}: AppProps) {
  return (
    <RecoilRoot>
      <div className={'layout'}>
        <ModalProvider>
          <Component {...pageProps} />
        </ModalProvider>
      </div>
    </RecoilRoot>
  )
}
