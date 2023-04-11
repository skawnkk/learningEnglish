interface ServiceParams {
  id: number
  onSuccess: (res) => void
  onFail: () => void
}

function getQuestions({id, onSuccess, onFail}: ServiceParams) {
  fetch(`https://qualson-test.vercel.app/api/test/${id}`)
    .then((res) => {
      if (res.status === 500) {
        throw Error()
      }
      return res.json()
    })
    .then((res) => {
      onSuccess(res)
    })
    .catch((err) => {
      onFail()
      console.log(err, typeof err)
    })
}

export {getQuestions}
