import React from 'react'

import CustomButton from '../atoms/CustomButton'

const AIPicker = ({ prompt, setPrompt, generatingImg, handleSubmit }: any) => {
  return (
    <div className="aipicker-container">
      <textarea className="aipicker-textarea"
        placeholder='Ask AI...'
        rows={5}
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)} />
      <div className="picker__ai">
        {generatingImg ? (
          <CustomButton type="outline" title="Asking AI..." />
        ) :
          (
            <>
              <CustomButton type="outline" title="AI Logo" handleClick={() => handleSubmit('logo')} />
              <CustomButton type="filled" title="AI Full" handleClick={() => handleSubmit('full')} />
            </>
          )}
      </div>
    </div>
  )
}

export default AIPicker