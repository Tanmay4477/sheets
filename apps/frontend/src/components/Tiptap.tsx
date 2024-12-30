import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { useState } from "react";
import {prismaClient} from "@repo/prisma/client";

const extensions = [
    StarterKit
]

export default function Tiptap() {
    const [content, setContent] = useState("");

    const editor = useEditor({
        extensions,
        content
    })

    const handleChange = async(e: any) => {
        setContent(e.target.value)
        const value = e.target.value;
        await prismaClient.event.create({
            data: {
                type: "ADD",
                content: value,
                sheetId: 1,
                userId: 1
            }
        });
    }

    if(!editor) {
         return null 
    }

    return (
        <div>
            <div onChange={handleChange}>
                <EditorContent editor={editor} />
            </div>
            <button
                onClick={() => editor.chain().focus().undo().run()}
                disabled={
                    !editor.can()
                    .chain()
                    .focus()
                    .undo()
                    .run()
                }
                >
                Undo
            </button>
        </div>
    )
}