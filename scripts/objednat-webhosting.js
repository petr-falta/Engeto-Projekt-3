document.addEventListener("DOMContentLoaded", () => {
  const serviceSelect = document.getElementById("service-select");
  const serviceParam = new URL(document.location).searchParams.get("service");
  let monthlyPrice = 0; // Defaultní hodnota
  const webhostingTitle = document.getElementById("webhosting-title");
  const freeMonthsRow = document.getElementById("freeMonthsRow");
  const freeMonths = document.getElementById("freeMonths");
  const webhostingDescription = document.getElementById(
    "webhosting-description"
  );
  const inputElement = document.getElementById("slevovy-kod");
  const vatPercentage = 21;

  const init = () => {
    if (serviceParam) {
      for (let i = 0; i < serviceSelect.options.length; i++) {
        if (serviceSelect.options[i].value === serviceParam) {
          serviceSelect.selectedIndex = i;
          break;
        }
      }
    }

    serviceSelect.addEventListener("change", () => updateWebhostingDetails());
    updateWebhostingDetails();
    updateTable(getSelectedMonths());
    initRadioButtons();
  };

  const updateWebhostingDetails = () => {
    const selectedValue = serviceSelect.value;

    const details = {
      Mini: {
        imgAlt: "Mini",
        title: "Webhosting<br />Mini",
        description: `
    <ul class="price-list">
      <li>
        <p>
          <span class="weight-600">5 GB</span>
          pro emaily, web a databázi
        </p>
        <span class="tooltip-icon">?
          <span class="tooltiptext">Tooltip text</span>
        </span>
      </li>
      <li>
        <p>
          <span class="weight-600">1</span>
          databáze
        </p>
        <span class="tooltip-icon">?
          <span class="tooltiptext">Tooltip text</span>
        </span>
      </li>
      <li>
        <p>
          <span class="weight-600">5</span>
          emailových schránek
        </p>
        <span class="tooltip-icon">?
          <span class="tooltiptext">Tooltip text</span>
        </span>
      </li>
    </ul>
  `,
        price: 45,
      },
      Klasik: {
        imgAlt: "Klasik",
        title: "Webhosting<br />Klasik",
        description: `
    <ul class="price-list">
      <li>
        <p>
          <span class="weight-600">10 GB</span>
          pro emaily, web a databázi
        </p>
        <span class="tooltip-icon">?
          <span class="tooltiptext">Tooltip text</span>
        </span>
      </li>
      <li>
        <p>
          <span class="weight-600">2</span>
          databáze
        </p>
        <span class="tooltip-icon">?
          <span class="tooltiptext">Tooltip text</span>
        </span>
      </li>
      <li>
        <p>
          <span class="weight-600">10</span>
          emailových schránek
        </p>
        <span class="tooltip-icon">?
          <span class="tooltiptext">Tooltip text</span>
        </span>
      </li>
    </ul>
  `,
        price: 59,
      },
      Profi: {
        imgAlt: "Profi",
        title: "Webhosting<br />Profi",
        description: `
    <ul class="price-list">
      <li>
        <p>
          <span class="weight-600">30 GB</span>
          pro emaily, web a databázi
        </p>
        <span class="tooltip-icon">?
          <span class="tooltiptext">Tooltip text</span>
        </span>
      </li>
      <li>
        <p>
          <span class="weight-600">5</span>
          databází
        </p>
        <span class="tooltip-icon">?
          <span class="tooltiptext">Tooltip text</span>
        </span>
      </li>
      <li>
        <p>
          <span class="weight-600">100</span>
          emailových schránek
        </p>
        <span class="tooltip-icon">?
          <span class="tooltiptext">Tooltip text</span>
        </span>
      </li>
    </ul>
  `,
        price: 79,
      },
    };

    const selectedDetails = details[selectedValue];
    if (selectedDetails) {
      webhostingTitle.innerHTML = selectedDetails.title;
      webhostingDescription.innerHTML = selectedDetails.description;
      monthlyPrice = selectedDetails.price;
    }

    updateTable(getSelectedMonths());
  };

  // Výpočet ceny, DPH a stanovení počtu měsíců
  const calculatePriceWithoutVat = (months) => {
    return monthlyPrice * months;
  };

  const calculateVat = (priceWithoutVat) => {
    return Math.ceil((priceWithoutVat * vatPercentage) / 100);
  };

  const calculateTotal = (priceWithoutVat, vat) => {
    return priceWithoutVat + vat;
  };

  const updateTable = (months) => {
    document.getElementById("duration").textContent = "1 měsíc";
    freeMonthsRow.style.display = "none";
    if (months === 12) {
      document.getElementById("duration").textContent = "1 rok";
      freeMonthsRow.style.display = "table-row";
    } else if (months === 24) {
      document.getElementById("duration").textContent = "2 roky";
      freeMonthsRow.style.display = "table-row";
    } else if (months === 36) {
      document.getElementById("duration").textContent = "3 roky";
      freeMonthsRow.style.display = "table-row";
    }

    const priceWithoutVat = calculatePriceWithoutVat(months);
    document.getElementById("priceWithoutVat").textContent =
      priceWithoutVat + " Kč";

    const vat = calculateVat(priceWithoutVat);
    document.getElementById("vat").textContent = vat + " Kč";

    const total = calculateTotal(priceWithoutVat, vat);
    document.getElementById("total").textContent = total + " Kč";
  };

  //

  const initRadioButtons = () => {
    const billingPeriodRadios = document.getElementsByName("billing-period");
    billingPeriodRadios.forEach((radio) => {
      radio.addEventListener("click", () => handleRadioButtonClick());
    });
  };

  const handleRadioButtonClick = () => {
    const months = getSelectedMonths();
    updateTable(months);
  };

  const getSelectedMonths = () => {
    const selectedRadio = document.querySelector(
      'input[name="billing-period"]:checked'
    );
    switch (selectedRadio.value) {
      case "1 měsíc":
        return 1;
      case "1 rok":
        return 12;
      case "2 roky":
        return 24;
      case "3 roky":
        return 36;
      default:
        return 12;
    }
  };
  // funkce pro kontrolu slevového kódu
  function checkDiscountCode() {
    const inputValue = inputElement.value.toUpperCase();
    if (inputValue === "WETRAXT") {
      freeMonths.textContent = "+ 1 rok";
    } else {
      freeMonths.textContent = "+ 3 měsíce";
    }
  }

  // přiřazení funkce k události input
  inputElement.addEventListener("input", checkDiscountCode);

  // inicializace stavu řádku
  checkDiscountCode();

  init();

  // Kontrola pole Email a Email znovu
  document.getElementById("email-again").addEventListener("input", function () {
    const email = document.getElementById("email").value;
    const emailAgain = document.getElementById("email-again").value;
    const errorMessage = document.getElementById("error-message");

    if (email !== emailAgain) {
      errorMessage.textContent = "Emaily se neshodují";
      errorMessage.style.display = "inline";
      document.getElementById("email-again").style.borderColor =
        "var(--color-error)";
    } else {
      errorMessage.style.display = "none";
      document.getElementById("email-again").style.borderColor = "";
    }
  });
});
