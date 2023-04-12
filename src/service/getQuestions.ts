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

async function getTestList() {
  try{
    const response = await fetch('https://qualson-test.vercel.app/api/test/list')
    const {data: testList} = await response.json()
    if (testList.length > 0) {
      testList?.sort((prev, next) => {
        return new Date(next.startDatetime).getTime() - new Date(prev.startDatetime).getTime()
      })
    }
    return testList
  }catch{
    return []
  }
}

export {getQuestions, getTestList}
