import React from 'react'
import {Editor} from '@tinymce/tinymce-react'
import { Controller } from 'react-hook-form'

function RTE({label,name,control,defaultValue=""}) {
  return (
    <>
    {label && <label>{label}</label>}
    <Controller
    name={name || 'content'}
    control={control}
    render={({field:{onChange}})=>(<Editor initialValue={defaultValue}
      apiKey='2jv3yogglmcehkqk0yy9oq8fufc4dsani31yrmytbkhi4xq4'
    init={{
      height: 500,
      menubar: true,
      plugins: [
        'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
        'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
        'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
      ],
      toolbar: 'undo redo | blocks | ' +
        'bold italic forecolor | alignleft aligncenter ' +
        'alignright alignjustify | bullist numlist outdent indent | ' +
        'removeformat | help',
      content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
    }}
    onEditorChange={onChange}
    />)}
    />
</>
  )
}

export default RTE