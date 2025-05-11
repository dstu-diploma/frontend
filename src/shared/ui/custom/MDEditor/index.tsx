import React, { useRef, useEffect } from 'react'
import SimpleMDE from 'react-simplemde-editor'
import 'easymde/dist/easymde.min.css'
import styles from './MDEditor.module.scss'

interface MDEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  height?: number
  className?: string
  readOnly?: boolean
  name?: string
}

export const CustomMDEditor: React.FC<MDEditorProps> = ({
  value,
  onChange,
  placeholder = 'Введите текст...',
  height = 200,
  className,
  readOnly = false,
  name = 'markdown-editor',
}) => {
  const editorRef = useRef<any>(null)

  const options = {
    spellChecker: false,
    placeholder,
    status: false,
    toolbar: readOnly
      ? []
      : [
          'bold',
          'italic',
          'heading',
          '|',
          'quote',
          'unordered-list',
          'ordered-list',
          '|',
          'link',
          'image',
          '|',
          'preview',
          'side-by-side',
          'fullscreen',
          '|',
          'guide',
        ],
    minHeight: `${height}px`,
    maxHeight: `${height}px`,
    readOnly,
    autofocus: false,
  }

  useEffect(() => {
    if (editorRef.current) {
      const editor = editorRef.current
      const textarea = editor.textarea
      if (textarea) {
        textarea.setAttribute('name', name)
        textarea.setAttribute('id', name)
      }
    }
  }, [name])

  return (
    <div className={styles.editorContainer}>
      <SimpleMDE
        ref={editorRef}
        value={value}
        onChange={onChange}
        options={options}
        className={className}
      />
    </div>
  )
}
