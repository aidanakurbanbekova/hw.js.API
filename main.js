document.addEventListener("DOMContentLoaded", function () {const loader = document.getElementById("loader");

const errorMessage = document.querySelector(".errorMessage");
const fetchButton = document.querySelector(".fetchButton");
const refetchButton = document.querySelector(".refetchButton");
const table = document.querySelector(".dataTable");
const nameInput = document.getElementById("nameInput");


fetchButton.addEventListener("click", fetchData);
refetchButton.addEventListener("click", fetchData);


async function fetchData() {
    const name = nameInput.value;
        refetchButton.disabled = true;
        try {
            const response = await fetch(`https://api.nationalize.io/?name=${name}`);
            if (!response.ok) {
                throw new Error('ERROR');
            }
            const data = await response.json();
            renderTable(data);
        } catch (error) {
            console.error('error', error);
        } finally {
            refetchButton.disabled = false;
        }
    }

    function renderTable(data) {

        table.innerHTML = ""; // Clear previous data

        const headerRow = table.insertRow(0);
        const headers = ["Country",  "Probability"];

        headers.forEach((header, index) => {
            const head = document.createElement("head");
            head.textContent = header;
            headerRow.appendChild(head);
        });

        //  table
        data.country.forEach((item, idx) => {
            const row = table.insertRow(idx + 1);
            const cell1 = row.insertCell();
            cell1.textContent = item.country_id;
            const cell2 = row.insertCell();
            cell2.textContent = item.probability;
        });
    }
});