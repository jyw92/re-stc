export default class Dialog{

  constructor(){
    this.dialog = document.getElementById('referenceDialog');
  }

  open({
    name,
    date,
    link,
    description,
    closeIcon,
    arrow,
    category,
    dialogThumbnail,
  }){

    if(!this.dialog){
      return;
    }

    console.log("category", category);
    const template =/* html */ `
      <form method="dialog" class="dialog--content">
        <div class="dialog--content--left">
          <img src="/src/images/projects/dialog/${dialogThumbnail}" alt="${name} thumbnail" />
        </div>
        <div class="dialog--content--right">
          <button class="dialog--close" type="submit">${closeIcon}</button>
          <h2 class="dialog--title">${name}</h2>
          <div class="dialog--content--body">
            <p class="th--name">카테고리</p>
            <p class="td--name category--list">${category.split(',').map(item => `<span class="badge">#${item}</span>`).join('')}</p>
            <p class="th--name">사업개요</p>
            <p class="td--name">${description}</p>
            <p class="th--name">사업기간</p>
            <p class="td--name">${date}</p>
            <p class="th--name">주소</p>
            <a class="td--name link" href="${link}">${link}</a>
          </div>
          <button class="button contact--button" type="button">Content Us ${arrow}</button>
        </div>
      </form>
    `

    this.dialog.innerHTML = template;
    this.dialog.showModal();
  }

}