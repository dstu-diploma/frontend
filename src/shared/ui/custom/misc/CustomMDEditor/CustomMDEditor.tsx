import React from 'react'
import MDEditor, { PreviewType } from '@uiw/react-md-editor'
import styles from './CustomMDEditor.module.scss'
import clsx from 'clsx'

interface CustomMDEditorProps {
  value: string
  onChange?: (value: string | undefined) => void
  height?: number | undefined
  preview?: PreviewType | undefined
  highlightEnable?: boolean | undefined
  enableScroll?: boolean | undefined
  visiableDragbar?: boolean | undefined
  minHeight?: number | undefined
  maxHeight?: number | undefined
  tabSize?: number | undefined
  hideToolbar?: boolean | undefined
  mdClassName?: string
  wrapperClassName?: string
}

const CustomMDEditor = ({
  value,
  onChange,
  height,
  preview,
  highlightEnable,
  enableScroll,
  visiableDragbar,
  minHeight,
  maxHeight,
  tabSize,
  hideToolbar,
  mdClassName,
  wrapperClassName,
}: CustomMDEditorProps) => {
  return (
    <div className={clsx(styles.mdEditor, wrapperClassName)}>
      <MDEditor
        value={value}
        onChange={onChange}
        height={height || 400}
        preview={preview || 'live'}
        highlightEnable={highlightEnable || true}
        enableScroll={enableScroll || true}
        minHeight={minHeight || 200}
        maxHeight={maxHeight || 800}
        tabSize={tabSize || 2}
        className={mdClassName}
        hideToolbar={hideToolbar || false}
      />
    </div>
  )
}

export default CustomMDEditor
