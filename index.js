(function () {
  /**
   * Steps:
   * - 1: (Select) Cantidad de colaboradores
   * - 2: (Checkbox) Presupuesto
   * - 3: (Select - Lib) Países
   * - 4: (Checkboxes) Beneficios
   * - 5: (Input) Email
   */
  console.log("calc loaded");
  const runLibMultistepForm = () => {
    if (
      document.documentElement.dataset["wfDomain"] ===
      "multistepforms.webflow.io"
    ) {
      const form = document.forms[0];

      form.addEventListener("submit", (ev) => {
        ev.preventDefault();
        ev.stopImmediatePropagation();
        form.style.display = "none";
        document.querySelector(".w-form-done").style.display = "block";
      });
    }
  };

  /**
   * stepNum: número del 1 al 5
   */

  const disableButtonIfIncomplete = ({ stepNum }) => {
    if (stepNum < 0 || stepNum > 5) {
      return console.info("Step number should be between 1 and 5.");
    }

    const formClassName = ".step-" + stepNum + "-form-field";
    const $form = document.querySelector(formClassName);

    switch (stepNum) {
      case 1: {
        const $options = $form.querySelectorAll("option");
        const $selected = Array.from($options)
          .filter((elem) => elem.selected)
          .filter((elem) => elem.value !== "placeholder");

        console.log({ $selected });

        return $selected.length === 0;
      }
      case 2: {
        const $options = $form.querySelectorAll("input[type='checkbox']");
        const $selected = Array.from($options).filter((elem) => elem.checked);

        console.log({ $selected });

        if ($selected.length === 0) return true;

        const $selectedIsBudged = $selected.some(
          ($e) => $e.id === "presupuesto-fijo"
        );
        if ($selectedIsBudged) {
          const $value = document.querySelector("#budget").value;
          console.log({ $value });
          return $value.length === 0;
        }

        return false;
      }
      case 3: {
        const $selectCountry = $("#select-country"); // jQuery because of the select2 lib
        $selectCountry.select2();

        const $selected = $($selectCountry.select2("data"));
        console.log({ $selected });

        return $selected.length === 0;
      }
      case 4: {
        const $options = $form.querySelectorAll("input[type='checkbox']");
        const $selected = Array.from($options).filter((elem) => elem.checked);
        console.log({ $selected });

        if ($selected.length === 0) return true;

        const $selectedIsHealth = $selected.some(
          ($e) => $e.id === "benefit-checkbox-salud"
        );

        if ($selectedIsHealth) {
          const $containerHealth = document.querySelector(
            ".benefit-item__health__content"
          );
          const $optionsHealth = $containerHealth.querySelectorAll(
            "input[type='checkbox']"
          );

          const $selectedHealth = Array.from($optionsHealth).filter(
            (elem) => elem.checked
          );

          console.log({ $selectedHealth });

          return $selectedHealth.length === 0;
        }

        return false;
      }
      case 5: {
        return $form.value.length === 0;
      }

      default:
        return false;
    }
  };

  const handleSubmitStatus = () => {
    const $mainForm = document.querySelector(
      "#wf-form-Calculadora-de-beneficios"
    );
    const activeStep = Number($mainForm.dataset.activeStep);
    const disableSubmit = disableButtonIfIncomplete({ stepNum: activeStep });

    const submitClassName = ".step-" + activeStep + "-submit";
    const $submit = document.querySelector(submitClassName);

    if (activeStep > 5) return;

    if (disableSubmit) {
      $submit.setAttribute("disabled", "");
      $submit.classList.add("button--is-disabled");
    } else {
      $submit.removeAttribute("disabled");
      $submit.classList.remove("button--is-disabled");
    }
  };

  // START HANDLE LAST STEP. RESULTS
  const handleLastStep = () => {
    const COUNTRY_FLAGS = {
      Afganistán: "🇦🇫",
      Albania: "🇦🇱",
      Alemania: "🇩🇪",
      Andorra: "🇦🇩",
      Angola: "🇦🇴",
      "Antigua y Barbuda": "🇦🇬",
      "Arabia Saudita": "🇸🇦",
      Argelia: "🇩🇿",
      Argentina: "🇦🇷",
      Armenia: "🇦🇲",
      Australia: "🇦🇺",
      Austria: "🇦🇹",
      Azerbaiyán: "🇦🇿",
      Bahamas: "🇧🇸",
      Bangladés: "🇧🇩",
      Barbados: "🇧🇧",
      Baréin: "🇧🇭",
      Bélgica: "🇧🇪",
      Belice: "🇧🇿",
      Benín: "🇧🇯",
      Bielorrusia: "🇧🇾",
      Birmania: "🇲🇲",
      Bolivia: "🇧🇴",
      "Bosnia y Herzegovina": "🇧🇦",
      Botsuana: "🇧🇼",
      Brasil: "🇧🇷",
      Brunéi: "🇧🇳",
      Bulgaria: "🇧🇬",
      "Burkina Faso": "🇧🇫",
      Burundi: "🇧🇮",
      Bután: "🇧🇹",
      "Cabo Verde": "🇨🇻",
      Camboya: "🇰🇭",
      Camerún: "🇨🇲",
      Canadá: "🇨🇦",
      Catar: "🇶🇦",
      Chad: "🇹🇩",
      Chile: "🇨🇱",
      China: "🇨🇳",
      Chipre: "🇨🇾",
      "Ciudad del Vaticano": "🇻🇦",
      Colombia: "🇨🇴",
      Comoras: "🇰🇲",
      "Corea del Norte": "🇰🇵",
      "Corea del Sur": "🇰🇷",
      "Costa de Marfil": "🇨🇮",
      "Costa Rica": "🇨🇷",
      Croacia: "🇭🇷",
      Cuba: "🇨🇺",
      Dinamarca: "🇩🇰",
      Dominica: "🇩🇲",
      Ecuador: "🇪🇨",
      Egipto: "🇪🇬",
      "El Salvador": "🇸🇻",
      "Emiratos Árabes Unidos": "🇦🇪",
      Eritrea: "🇪🇷",
      Eslovaquia: "🇸🇰",
      Eslovenia: "🇸🇮",
      España: "🇪🇸",
      "Estados Unidos": "🇺🇸",
      Estonia: "🇪🇪",
      Esuatini: "🇸🇿",
      Etiopía: "🇪🇹",
      Filipinas: "🇵🇭",
      Finlandia: "🇫🇮",
      Fiyi: "🇫🇯",
      Francia: "🇫🇷",
      Gabón: "🇬🇦",
      Gambia: "🇬🇲",
      Georgia: "🇬🇪",
      Ghana: "🇬🇭",
      Granada: "🇬🇩",
      Grecia: "🇬🇷",
      Guatemala: "🇬🇹",
      Guyana: "🇬🇾",
      Guinea: "🇬🇳",
      "Guinea-Bisáu": "🇬🇼",
      "Guinea Ecuatorial": "🇬🇶",
      Haití: "🇭🇹",
      Honduras: "🇭🇳",
      Hungría: "🇭🇺",
      India: "🇮🇳",
      Indonesia: "🇮🇩",
      Irak: "🇮🇶",
      Irán: "🇮🇷",
      Irlanda: "🇮🇪",
      Islandia: "🇮🇸",
      "Islas Marshall": "🇲🇭",
      "Islas Salomón": "🇸🇧",
      Israel: "🇮🇱",
      Italia: "🇮🇹",
      Jamaica: "🇯🇲",
      Japón: "🇯🇵",
      Jordania: "🇯🇴",
      Kazajistán: "🇰🇿",
      Kenia: "🇰🇪",
      Kirguistán: "🇰🇬",
      Kiribati: "🇰🇮",
      Kuwait: "🇰🇼",
      Laos: "🇱🇦",
      Lesoto: "🇱🇸",
      Letonia: "🇱🇻",
      Líbano: "🇱🇧",
      Liberia: "🇱🇷",
      Libia: "🇱🇾",
      Liechtenstein: "🇱🇮",
      Lituania: "🇱🇹",
      Luxemburgo: "🇱🇺",
      "Macedonia del Norte": "🇲🇰",
      Madagascar: "🇲🇬",
      Malasia: "🇲🇾",
      Malaui: "🇲🇼",
      Maldivas: "🇲🇻",
      Malí: "🇲🇱",
      Malta: "🇲🇹",
      Marruecos: "🇲🇦",
      Mauricio: "🇲🇺",
      Mauritania: "🇲🇷",
      México: "🇲🇽",
      Micronesia: "🇫🇲",
      Moldavia: "🇲🇩",
      Mónaco: "🇲🇨",
      Mongolia: "🇲🇳",
      Montenegro: "🇲🇪",
      Mozambique: "🇲🇿",
      Namibia: "🇳🇦",
      Nauru: "🇳🇷",
      Nepal: "🇳🇵",
      Nicaragua: "🇳🇮",
      Níger: "🇳🇪",
      Nigeria: "🇳🇬",
      Noruega: "🇳🇴",
      "Nueva Zelanda": "🇳🇿",
      Omán: "🇴🇲",
      "Países Bajos": "🇳🇱",
      Pakistán: "🇵🇰",
      Palaos: "🇵🇼",
      Panamá: "🇵🇦",
      "Papúa Nueva Guinea": "🇵🇬",
      Paraguay: "🇵🇾",
      Perú: "🇵🇪",
      Polonia: "🇵🇱",
      Portugal: "🇵🇹",
      "Reino Unido": "🇬🇧",
      "República Centroafricana": "🇨🇫",
      "República Checa": "🇨🇿",
      "República del Congo": "🇨🇬",
      "República Democrática del Congo": "🇨🇩",
      "República Dominicana": "🇩🇴",
      Ruanda: "🇷🇼",
      Rumania: "🇷🇴",
      Rusia: "🇷🇺",
      Samoa: "🇼🇸",
      "San Cristóbal y Nieves": "🇰🇳",
      "San Marino": "🇸🇲",
      "San Vicente y las Granadinas": "🇻🇨",
      "Santa Lucía": "🇱🇨",
      "Santo Tomé y Príncipe": "🇸🇹",
      Senegal: "🇸🇳",
      Serbia: "🇷🇸",
      Seychelles: "🇸🇨",
      "Sierra Leona": "🇸🇱",
      Singapur: "🇸🇬",
      Siria: "🇸🇾",
      Somalia: "🇸🇴",
      "Sri Lanka": "🇱🇰",
      Sudáfrica: "🇿🇦",
      Sudán: "🇸🇩",
      "Sudán del Sur": "🇸🇸",
      Suecia: "🇸🇪",
      Suiza: "🇨🇭",
      Surinam: "🇸🇷",
      Tailandia: "🇹🇭",
      Tanzania: "🇹🇿",
      Tayikistán: "🇹🇯",
      "Timor Oriental": "🇹🇱",
      Togo: "🇹🇬",
      Tonga: "🇹🇴",
      "Trinidad y Tobago": "🇹🇹",
      Túnez: "🇹🇳",
      Turkmenistán: "🇹🇲",
      Turquía: "🇹🇷",
      Tuvalu: "🇹🇻",
      Ucrania: "🇺🇦",
      Uganda: "🇺🇬",
      Uruguay: "🇺🇾",
      Uzbekistán: "🇺🇿",
      Vanuatu: "🇻🇺",
      Venezuela: "🇻🇪",
      Vietnam: "🇻🇳",
      Yemen: "🇾🇪",
      Yibuti: "🇩🇯",
      Zambia: "🇿🇲",
      Zimbabue: "🇿🇼"
    };

    const BENEFIT_PRICE = {
      "benefits-entret": 15,
      "benefits-meals": 10,
      "benefit-gym": 10,
      "benefit-language": 35,
      "benefit-health": 80,
      "benefit-education": 15,
      "benefit-productivity": 15
    };

    // Get nodes for fields that will be replaced.
    const $budgetQtyPeople = document.querySelector(".budget__qty-collabs");
    const $budgetBenefits = document.querySelector(".budget__benefits")
      .childNodes;
    const $budgetQtyCountries = document.querySelector(
      ".budget__qty_countries"
    );
    const $budgetFlags = document.querySelector(".budget__flags");

    const $budgetAmountPerson = document.querySelector(".budget__amount");
    const $budgetAmountTotal = document.querySelector(".budget__total");
    const $budgetQtyProviders = document.querySelector(
      ".budget__qty_providers"
    );
    const $budgetMoHours = document.querySelector(".budget__mo-hours");

    const getQtyPeople = () => {
      const formClassName = ".step-1-form-field";
      const $form = document.querySelector(formClassName);

      const $options = $form.querySelectorAll("option");
      const $selected = Array.from($options)
        .filter((elem) => elem.selected)
        .filter((elem) => elem.value !== "placeholder");

      return $selected[0].value;
    };

    const getBenefits = () => {
      const formClassName = ".step-4-form-field";
      const $form = document.querySelector(formClassName);

      const $options = $form.querySelectorAll("input[type='checkbox']");
      const $selected = Array.from($options).filter((elem) => elem.checked);

      return $selected
        .map(($s) => $s.id)
        .map((name) => name.substring(0, name.lastIndexOf("-")));
    };

    const getQtyCountries = () => {
      const $selectCountry = $("#select-country"); // jQuery because of the select2 lib
      $selectCountry.select2();

      const $selected = $($selectCountry.select2("data"));
      return $selected.length;
    };

    const getFlags = () => {
      const $selectCountry = $("#select-country"); // jQuery because of the select2 lib
      $selectCountry.select2();

      const $selected = $($selectCountry.select2("data"));
      return Array.from($selected)
        .map(($s) => $s.text)
        .map((value) => COUNTRY_FLAGS[value])
        .join(" ");
    };

    const getAmountPerson = () => {
      const benefits = getBenefits();
      const costBenefits = benefits
        .map((ben) => BENEFIT_PRICE[ben])
        .reduce((res, each) => res + each, 0);

      return costBenefits;
    };

    const getAmountTotal = () => {
      const qtyPeople = getQtyPeople();
      const benefits = getBenefits();
      const costBenefits = benefits
        .map((ben) => BENEFIT_PRICE[ben])
        .reduce((res, each) => res + each, 0);

      return costBenefits * qtyPeople;
    };

    const getQtyProviders = () => {
      const benefits = getBenefits();
      const qtyCountries = getQtyCountries();

      return benefits.length * qtyCountries;
    };

    const getMoHours = () => {
      const benefits = getBenefits();
      const qtyCountries = getQtyCountries();

      return benefits.length * qtyCountries * 2;
    };

    const replaceResultsAll = () => {
      const qtyPeople = getQtyPeople();
      const benefits = getBenefits();
      const qtyCountries = getQtyCountries();
      const flags = getFlags();
      const amountPerson = getAmountPerson();
      const amountTotal = getAmountTotal();
      const qtyProviders = getQtyProviders();
      const moHours = getMoHours();

      $budgetQtyPeople.innerText = qtyPeople;
      $budgetQtyCountries.innerText = qtyCountries;
      $budgetFlags.innerText = flags;
      Array.from($budgetBenefits).forEach(($benefit) => {
        if (!benefits.includes($benefit.id)) {
          $benefit.setAttribute("style", "display: none;");
        }
      });

      console.log(amountPerson)
      console.log(amountTotal)
      console.log(qtyProviders)
      console.log(moHours)
      //$budgetAmountPerson.innerText = amountPerson;
      //$budgetAmountTotal.innerText = amountTotal;
      //$budgetQtyProviders.innerText = qtyProviders;
      //$budgetMoHours.innerText = moHours;
    };

    return {
      replaceResultsAll
    };
  };

  // END HANDLE LAST STEP

  const handleStepChange = () => {
    const $submitNext = document.querySelectorAll("[if-element=button-next]");
    const $submitPrevious = document.querySelectorAll(
      "[if-element=button-back]"
    );

    $submitNext.forEach(($submit) => {
      $submit.addEventListener("click", () => {
        const $mainForm = document.querySelector(
          "#wf-form-Calculadora-de-beneficios"
        );

        const currentStep = Number($mainForm.dataset.activeStep);
        const nextStep = currentStep + 1;
        $mainForm.setAttribute("data-active-step", nextStep);
        handleSubmitStatus();

        if (nextStep === 5) {
          const { replaceResultsAll } = handleLastStep();
          replaceResultsAll();
        }
      });
    });

    $submitPrevious.forEach(($submit) => {
      $submit.addEventListener("click", () => {
        const $mainForm = document.querySelector(
          "#wf-form-Calculadora-de-beneficios"
        );

        const currentStep = Number($mainForm.dataset.activeStep);
        $mainForm.setAttribute("data-active-step", currentStep - 1);
        handleSubmitStatus();
      });
    });
  };

  document.addEventListener("DOMContentLoaded", function () {
    runLibMultistepForm();

    // GENERAL SETTINGS
    handleStepChange();

    // END GENERAL SETTINGS

    // START STEP 1: QUANTITY
    const $dropdownQty = document.getElementById("Cantidad-Colaboradores-2");

    // Agregar un evento de cambio al menú desplegable
    $dropdownQty.addEventListener("change", function (event) {
      handleSubmitStatus();

      Array.from($dropdownQty.options).forEach((option) => {
        if (option.hasAttribute("selected")) {
          option.removeAttribute("selected");
        }
      });
    });

    // END STEP 1

    // START STEP 2: BUDGET
    // Display budget input
    const $budgetCheckbox = document.getElementById("presupuesto-fijo");
    const $budgetInput = document.getElementById("presupuesto-fijo-input");
    $budgetCheckbox.addEventListener("change", function () {
      handleSubmitStatus();

      if (this.checked) {
        // If checked, show the div
        $budgetInput.setAttribute("style", "display: flex;");
      } else {
        // If unchecked, hide the div
        $budgetInput.setAttribute("style", "display: none;");
      }
    });

    // Listen to form changes to disable button
    const $formStep2 = document.querySelector(".step-2-form-field");
    const $selectorsStep2 = $formStep2.querySelectorAll(
      "input[type='checkbox']"
    );
    Array.from($selectorsStep2).forEach(($selector) => {
      $selector.addEventListener("change", () => {
        handleSubmitStatus();
      });
    });

    // Listen to input changes to disable button
    const $inputStep2 = document.querySelector("#budget");
    $inputStep2.addEventListener("input", (e) => {
      handleSubmitStatus();
    });

    // END STEP 2

    // START STEP 3: COUNTRY
    // Listen to list changes to disable button
    const $selectCountry = $("#select-country"); // jQuery because of the select2 lib
    $selectCountry.select2();

    $selectCountry.on("change", function (e) {
      handleSubmitStatus();
    });

    // END STEP 3

    // START STEP 4: BENEFITS
    const $items = document.querySelectorAll(".benefit-item");
    const $containerHealth = document.querySelector(
      ".benefit-item__health__content"
    );

    // Add check image to the selected benefit and style box
    const styleBox = ($item, $checkbox, $checkboxImg) => {
      $checkbox.checked = !$checkbox.checked;

      if (!$checkbox.checked) {
        $checkbox.setAttribute("checked", "");
      } else {
        $checkbox.removeAttribute("checked");
      }

      if ($checkbox.checked) {
        $checkboxImg.setAttribute("style", "display: block;");

        if ($item.classList.contains("benefit-item__health-item")) {
          const $itemHealthCheckbox = document.querySelector(
            ".benefit-item__health"
          );
          const $itemHealthContainer = document.querySelector(
            ".benefit-item__health-container"
          );

          $itemHealthCheckbox.setAttribute("style", "display: flex;");
          $itemHealthContainer.setAttribute(
            "style",
            "border: 2px solid #3D25D9;"
          );
        } else {
          $item.setAttribute("style", "border: 2px solid #3D25D9;");
        }
      } else {
        $checkboxImg.setAttribute("style", "display: none;");

        if ($item.classList.contains("benefit-item__health-item")) {
          const $itemHealthCheckbox = document.querySelector(
            ".benefit-item__health"
          );
          const $itemHealthContainer = document.querySelector(
            ".benefit-item__health-container"
          );

          $itemHealthCheckbox.setAttribute("style", "display: none;");
          $itemHealthContainer.setAttribute(
            "style",
            "border: 1px solid #B1A8F0;"
          );
        } else {
          $item.setAttribute("style", "border: 1px solid #B1A8F0;");
        }
      }
    };

    // Apply style to selected benefit
    $items.forEach(($item) => {
      $item.addEventListener("click", (e) => {
        e.preventDefault();

        const $checkbox = $item.querySelector('input[type="checkbox"]');
        const $checkboxImg = $item.querySelector(".benefit-checkbox");

        styleBox($item, $checkbox, $checkboxImg);
        handleSubmitStatus();
      });
    });

    $containerHealth.addEventListener("click", () => {
      handleSubmitStatus();
    });
    // END STEP 4

    // START STEP 5 EMAIL
    const $step5Input = document.querySelector(".step-5-form-field");
    $step5Input.addEventListener("input", () => {
      handleSubmitStatus();
    });
    // END STEP 5
  });
})();

