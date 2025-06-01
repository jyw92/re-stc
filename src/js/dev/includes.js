

function includeLoaded(url, target){
  fetch(url).then(response => response.text())
  .then(data => {
    document.getElementById(target).innerHTML = data;
  }).catch(error => console.log('error loading:', error));
}

document.addEventListener('DOMContentLoaded', function(){
  //header loaded
  includeLoaded('/src/page/common/header.html', 'header')

  //footer loaded
  includeLoaded('/src/page/common/footer.html', 'footer')
})