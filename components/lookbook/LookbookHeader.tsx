'use client'

import { FC } from 'react'

interface LookbookHeaderProps {
  /** e.g. "186cm wears L top and 30 bottom" */
  subtitle: string
}

const LookbookHeader: FC<LookbookHeaderProps> = ({ subtitle }) => (
  <div className="lookbook-header">
    <h1 className="lookbook-title">LOOKBOOK</h1>
    <p className="lookbook-subtext">{subtitle}</p>
  </div>
)

export default LookbookHeader
