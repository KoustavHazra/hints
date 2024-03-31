import React from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { Controller } from 'react-hook-form';
import conf from "../conf/conf";

export default function RTE({name, control, label, defaultValue = ""}) {
    // control comes from react-hook-form and this is what responsible for transferring
    // all the states written here in any form whoever calls it. 
    // This will be used when we will be using the RET component.
    return (
        <div className='w-full'>
            {label && <label className='inline-block mb-1 pl-1'>{label}</label>}
            <Controller 
                name = {name || "content"}
                control = {control}
                render = {({field: {onChange}}) => (
                    // the field here is to track all events, here we put onChange.
                    // so if there any change happened, field will know about it and render it.

                    <Editor
                        apiKey={conf.tinyAPIKey}
                        initialValue={defaultValue}
                        init={{
                            initialValue: defaultValue,
                            height: 500,
                            menubar: true,
                            tinymceScriptSrc: "https://cdn.jsdelivr.net/npm/tinymce@5/tinymce.min.js",
                            plugins: [
                                "image",
                                "advlist",
                                "autolink",
                                "lists",
                                "link",
                                "image",
                                "charmap",
                                "preview",
                                "anchor",
                                "searchreplace",
                                "visualblocks",
                                "code",
                                "fullscreen",
                                "insertdatetime",
                                "media",
                                "table",
                                "code",
                                "help",
                                "wordcount",
                                "anchor",
                                
                            ], 
                            toolbar: "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
                            content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
                        }}
                        onEditorChange={onChange}
                        // this is what tracking all the changes happening in the editor.
                    />
                )}
            />
        </div>
    )
}
