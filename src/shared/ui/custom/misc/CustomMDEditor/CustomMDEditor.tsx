import React from 'react'
import MDEditor, {
  PreviewType,
  commands as mdCommands,
} from '@uiw/react-md-editor'
import styles from './CustomMDEditor.module.scss'
import clsx from 'clsx'
import { useScreenSize } from '@/providers/ScreenSizeProvider'

interface CustomMDEditorProps {
  value: string
  onChange?: (value: string | undefined) => void
  height?: number | undefined
  preview?: PreviewType | undefined
  highlightEnable?: boolean | undefined
  enableScroll?: boolean | undefined
  minHeight?: number | undefined
  maxHeight?: number | undefined
  tabSize?: number | undefined
  hideToolbar?: boolean | undefined
  mdClassName?: string
  wrapperClassName?: string
  fullscreen?: boolean
  extraCommands?: any[]
}

const CustomMDEditor = ({
  value,
  onChange,
  height,
  preview,
  highlightEnable,
  enableScroll,
  minHeight,
  maxHeight,
  tabSize,
  hideToolbar,
  mdClassName,
  wrapperClassName,
  fullscreen,
  extraCommands,
}: CustomMDEditorProps) => {
  const { isMobile, isTablet, isDesktop, isMediumDesktop } = useScreenSize()
  const mdEditorStyles = clsx(styles.mdEditor, wrapperClassName, {
    [styles.mobile]: isMobile,
    [styles.tablet]: isTablet,
    [styles.desktop]: isDesktop,
    [styles.mediumDesktop]: isMediumDesktop,
  })

  const defaultExtraCommands = [
    mdCommands.codeEdit,
    mdCommands.codePreview,
    mdCommands.divider,
    mdCommands.fullscreen,
  ]

  return (
    <div className={mdEditorStyles}>
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
        fullscreen={fullscreen}
        extraCommands={extraCommands || defaultExtraCommands}
      />
    </div>
  )
}

export default CustomMDEditor
