const langButton = document.querySelector(".language-switch");
    let lang = document.querySelector("html").getAttribute("lang");
    const translatableElements = document.querySelectorAll("[data-ru], [data-en]");

    function updateTranslations() {
      translatableElements.forEach(el => {
        if (lang === "ru") {
          el.textContent = el.getAttribute("data-ru");
        } else {
          el.textContent = el.getAttribute("data-en");
        }
      });
    }

    langButton.addEventListener("click", () => {
      if (lang === "ru") {
        document.querySelector("html").setAttribute("lang", "en");
        langButton.textContent = "RU";
        lang = "en";
      } else {
        document.querySelector("html").setAttribute("lang", "ru");
        langButton.textContent = "EN";
        lang = "ru";
      }
      updateTranslations();
    });