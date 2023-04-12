interface ServiceParams {
  id: number
  onSuccess: (res) => void
  onFail: () => void
}

async function getQuestions({id, onSuccess, onFail}: ServiceParams) {
  try {
    const response = await fetch(`https://qualson-test.vercel.app/api/test/${id}`)
    const data = await response.json()
    onSuccess(data)
  } catch (err) {
    onFail()
    console.log(err, typeof err)
  }
}

export {getQuestions}
