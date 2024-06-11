'use client'

import React from 'react'
import Shareable from 'components/shareable/Shareable'
import OsezChangerSimulator from './OsezChangerSimulator'

const OsezChanger = () => {
  return (
    <Shareable tracking='OsezChanger' small>
      <OsezChangerSimulator />
    </Shareable>
  )
}

export default OsezChanger
