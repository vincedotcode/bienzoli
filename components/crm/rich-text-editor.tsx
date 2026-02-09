"use client"

import { useEffect, useRef, useState } from "react"

interface RichTextEditorProps {
  name: string
  defaultValue?: string
  placeholder?: string
  className?: string
}

export function RichTextEditor({
  name,
  defaultValue = "",
  placeholder = "Start writing...",
  className = "",
}: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null)
  const quillRef = useRef<any>(null)
  const [value, setValue] = useState(defaultValue)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    if (!editorRef.current || quillRef.current) return

    const loadQuill = async () => {
      // Dynamically import Quill
      const link = document.createElement("link")
      link.rel = "stylesheet"
      link.href = "https://cdn.quilljs.com/1.3.7/quill.snow.css"
      document.head.appendChild(link)

      const script = document.createElement("script")
      script.src = "https://cdn.quilljs.com/1.3.7/quill.min.js"
      script.onload = () => {
        if (!editorRef.current) return
        const Quill = (window as any).Quill
        const quill = new Quill(editorRef.current, {
          theme: "snow",
          placeholder,
          modules: {
            toolbar: [
              [{ header: [2, 3, false] }],
              ["bold", "italic", "underline", "strike"],
              [{ list: "ordered" }, { list: "bullet" }],
              ["link", "blockquote", "code-block"],
              ["clean"],
            ],
          },
        })

        if (defaultValue) {
          quill.root.innerHTML = defaultValue
        }

        quill.on("text-change", () => {
          const html = quill.root.innerHTML
          setValue(html === "<p><br></p>" ? "" : html)
        })

        quillRef.current = quill
        setMounted(true)
      }
      document.body.appendChild(script)
    }

    loadQuill()
  }, [defaultValue, placeholder])

  return (
    <div className={className}>
      <input type="hidden" name={name} value={value} />
      <div ref={editorRef} />
      {!mounted && (
        <div className="flex min-h-[150px] items-center justify-center rounded-md border border-border bg-card">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-muted-foreground border-t-transparent" />
        </div>
      )}
    </div>
  )
}
