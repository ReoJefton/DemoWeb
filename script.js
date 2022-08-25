const getAPIData = async () => {
  const response = await fetch(
    'https://api.coindesk.com/v1/bpi/currentprice.json'
  )
  const data = await response.json()
  displayData(data)
}

const displayData = (data) => {
  console.log(data)
  const chartName = data.chartName
  document.querySelector('#header').innerHTML = chartName
  var mainContainer = document.querySelector('#dataContainer')
  const bpiObj = data.bpi
  console.log(bpiObj)
  const div = document.createElement('div')
  const div2 = document.createElement('div')
  Object.keys(bpiObj).forEach((bp) => {
    const bpObj = bpiObj[bp]
    console.log(bp, bpObj)
    Object.keys(bpObj).forEach((key) => {
      div.innerHTML += key + ':' + bpObj[key] + '<br>'
    })
    div.innerHTML += '<br>'
    // const bpArray = Object.keys(bpObj).map((key) => [key, bpObj[key]])
    // bpArray.forEach((arr) => {
    //   div2.innerHTML += arr[0] + ':' + arr[1] + '<br>'
    // })
    // div2.innerHTML += '<br>'
  })
  mainContainer.appendChild(div)
  //mainContainer.appendChild(div2)
}

getAPIData()
