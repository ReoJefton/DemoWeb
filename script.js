$(document).ready(function () {
  $('[data-toggle="tooltip"]').tooltip()
  $('body')
    .attr({
      'data-spy': 'scroll',
      'data-target': '.navbar',
    })
    .scrollspy({
      offset: 50,
    })

  var offset = 50

  $('.navbar li a').click(function (event) {
    event.preventDefault()
    $($(this).attr('href'))[0].scrollIntoView()
    scrollBy(0, -offset)
  })

  $('#myInput').on('keyup', function () {
    var value = $(this).val().toLowerCase()
    $('#myTable tr').filter(function () {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    })
  })
  $('p').click(function () {
    $(this).hide()
  })

  // Add smooth scrolling to all links in navbar + footer link
  $(".navbar a, footer a[href='#myPage']").on('click', function (event) {
    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== '') {
      // Prevent default anchor click behavior
      event.preventDefault()

      // Store hash
      var hash = this.hash

      // Using jQuery's animate() method to add smooth page scroll
      // The optional number (900) specifies the number of milliseconds it takes to scroll to the specified area
      $('html, body').animate(
        {
          scrollTop: $(hash).offset(50).top,
        },
        400,
        function () {
          // Add hash (#) to URL when done scrolling (default click behavior)
          window.location.hash = hash
        }
      )
    } // End if
  })
})
const getAPIData = async () => {
  const response = await fetch(
    'https://api.coindesk.com/v1/bpi/currentprice.json'
  )
  if (!response) response = await fetch('/bitcoin.json')
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

  //const div2 = document.createElement('div')
  Object.keys(bpiObj).forEach((bp) => {
    const div = document.createElement('div')
    div.classList.add('col-xs-12', 'col-sm-6', 'col-md-4', 'col-lg-4', 'well')
    const bpObj = bpiObj[bp]
    console.log(bp, bpObj)
    Object.keys(bpObj).forEach((key) => {
      div.innerHTML += key + ':' + bpObj[key] + '<br>'
    })
    div.innerHTML += '<br>'
    mainContainer.appendChild(div)
    // const bpArray = Object.keys(bpObj).map((key) => [key, bpObj[key]])
    // bpArray.forEach((arr) => {
    //   div2.innerHTML += arr[0] + ':' + arr[1] + '<br>'
    // })
    // div2.innerHTML += '<br>'
  })

  //mainContainer.appendChild(div2)
}

getAPIData()
