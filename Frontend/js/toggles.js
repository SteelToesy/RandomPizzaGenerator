function initializeCategoryToggle() {
  const categories = document.querySelectorAll('.generator__filters-category');

  for (let i = 0; i < categories.length; i++) {
    setupToggle(categories[i]);
  }
}

function setupToggle(category) {
  const title = category.querySelector('h3');
  const itemList = category.querySelector('ul');
  let isOpen = false;

  itemList.style.height = '0';
  itemList.style.overflow = 'hidden';
  itemList.style.transition = 'height 0.3s ease';

  title.addEventListener('click', () => {
    if (isOpen) {
      itemList.style.height = itemList.scrollHeight + 'px';
      requestAnimationFrame(() => {
        itemList.style.height = '0';
      });
    } else {
      itemList.style.height = itemList.scrollHeight + 'px';
      itemList.addEventListener('transitionend', () => {
        itemList.style.height = 'auto';
      }, { once: true });
    }
    isOpen = !isOpen;
  });
}
