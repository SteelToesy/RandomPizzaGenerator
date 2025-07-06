window.addEventListener('DOMContentLoaded', () => {
  loadFilters()
    .then(() => {
      setupCheckboxControls();
      setupPizzaGenerationButton();
      setupPizzaSavingButton();
      initializeCategoryToggle();
    })
    .catch(console.error);
});
